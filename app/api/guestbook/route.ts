import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";

export const runtime = "edge";

// ── shape ──────────────────────────────────────────────────────────
export type Entry = {
  id: string;
  number: number;
  nickname: string;
  message: string;
  createdAt: string;
  /** SHA-256(ip + salt) truncated — never the raw IP */
  ip: string;
};

// ── policy ─────────────────────────────────────────────────────────
const NICKNAME_MAX = 20;
const MESSAGE_MAX = 100;
const RATE_LIMIT_TTL_SECONDS = 3600; // 1 hour
const LIST_LIMIT = 50; // server caps; client paginates 15 at a time

/**
 * Conservative profanity list — Korean and English. Kept short on
 * purpose to minimize false positives. The check is case-insensitive
 * and substring-based.
 */
const PROFANITY = [
  "시발",
  "씨발",
  "존나",
  "병신",
  "fuck",
  "shit",
  "porn",
  "casino",
  "viagra",
];

// ── helpers ────────────────────────────────────────────────────────
async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(`${text}::leeum-guestbook-v1`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Encode timestamps so newer keys sort first when KV lists alphabetically. */
function reverseTimestampKey(ms: number): string {
  return String(1e15 - ms).padStart(16, "0");
}

function hasProfanity(text: string): boolean {
  const t = text.toLowerCase();
  return PROFANITY.some((w) => t.includes(w.toLowerCase()));
}

type GuestKV = {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number }
  ): Promise<void>;
  list(options?: {
    prefix?: string;
    limit?: number;
    cursor?: string;
  }): Promise<{
    keys: Array<{ name: string }>;
    list_complete: boolean;
    cursor?: string;
  }>;
};

function getKV(): GuestKV | null {
  try {
    const ctx = getRequestContext();
    return ((ctx?.env as Record<string, unknown> | undefined)?.GUESTBOOK as
      | GuestKV
      | undefined) ?? null;
  } catch {
    return null;
  }
}

function err(message: string, code: string, status: number) {
  return NextResponse.json({ error: message, code }, { status });
}

// ── GET /api/guestbook ─────────────────────────────────────────────
export async function GET() {
  const kv = getKV();
  if (!kv) {
    // Local dev — KV bindings only exist on Cloudflare Pages.
    return NextResponse.json({ entries: [], devMode: true });
  }

  try {
    const list = await kv.list({ prefix: "entry:", limit: LIST_LIMIT });
    const entries = await Promise.all(
      list.keys.map(async (k) => {
        const value = await kv.get(k.name);
        if (!value) return null;
        try {
          return JSON.parse(value) as Entry;
        } catch {
          return null;
        }
      })
    );

    return NextResponse.json({
      entries: (entries.filter(Boolean) as Entry[]),
    });
  } catch {
    return err("방명록을 불러오지 못했습니다.", "READ_FAILED", 500);
  }
}

// ── POST /api/guestbook ────────────────────────────────────────────
export async function POST(request: Request) {
  const kv = getKV();
  if (!kv) {
    return err(
      "방명록은 배포된 사이트에서 동작합니다.",
      "KV_UNAVAILABLE",
      503
    );
  }

  let body: { nickname?: unknown; message?: unknown };
  try {
    body = await request.json();
  } catch {
    return err("입력 형식이 올바르지 않습니다.", "INVALID_JSON", 400);
  }

  const nickname =
    typeof body.nickname === "string" ? body.nickname.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!nickname || nickname.length > NICKNAME_MAX) {
    return err(
      `별명은 1~${NICKNAME_MAX}자로 입력해 주세요.`,
      "INVALID_NICKNAME",
      400
    );
  }
  if (!message || message.length > MESSAGE_MAX) {
    return err(
      `메시지는 1~${MESSAGE_MAX}자로 입력해 주세요.`,
      "INVALID_MESSAGE",
      400
    );
  }
  if (hasProfanity(`${nickname} ${message}`)) {
    return err(
      "부적절한 표현이 포함되어 있습니다.",
      "PROFANITY",
      400
    );
  }

  const rawIp =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    "0.0.0.0";
  const ipHashFull = await sha256Hex(rawIp.split(",")[0].trim());
  const ipHash = ipHashFull.slice(0, 16);

  // Rate limit — one entry per IP per hour.
  const rateKey = `ratelimit:${ipHash}`;
  const existing = await kv.get(rateKey);
  if (existing) {
    return err(
      "한 시간 뒤에 다시 와주세요.",
      "RATE_LIMITED",
      429
    );
  }

  const counterRaw = await kv.get("counter:total");
  const counter = counterRaw ? Number.parseInt(counterRaw, 10) : 0;
  const number = (Number.isFinite(counter) ? counter : 0) + 1;

  const now = Date.now();
  const random = Math.random().toString(36).slice(2, 6);
  const id = `${now}-${random}`;
  const entryKey = `entry:${reverseTimestampKey(now)}:${random}`;

  const entry: Entry = {
    id,
    number,
    nickname,
    message,
    createdAt: new Date(now).toISOString(),
    ip: ipHash,
  };

  try {
    await kv.put(entryKey, JSON.stringify(entry));
    await kv.put("counter:total", String(number));
    await kv.put(rateKey, String(now), {
      expirationTtl: RATE_LIMIT_TTL_SECONDS,
    });
  } catch {
    return err("저장에 실패했습니다. 잠시 후 다시 시도해 주세요.", "WRITE_FAILED", 500);
  }

  return NextResponse.json({ entry });
}
