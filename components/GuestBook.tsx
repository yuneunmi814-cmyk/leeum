"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Entry = {
  id: string;
  number: number;
  nickname: string;
  message: string;
  createdAt: string;
};

const NICKNAME_MAX = 20;
const MESSAGE_MAX = 100;
const VISIBLE_FULL = 15;
const VISIBLE_PREVIEW = 3;

type Variant = "full" | "preview";

/** "03:42 PM, 2026.04.30" — Korean catalogue style. */
function formatStamp(iso: string): string {
  const d = new Date(iso);
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = String(((h + 11) % 12) + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${h12}:${m} ${ampm}, ${yyyy}.${mm}.${dd}`;
}

/**
 * The guest book — same component on both pages.
 *
 *   variant="full"    /guest  — 15 visible, "이전 발자국 보기 ↓" toggle
 *   variant="preview" /       — 3 visible,  "전체 방명록 ↗" link to /guest
 *
 * Each mount fetches /api/guestbook on its own; cross-page sync happens
 * naturally on the next page load (KV is the source of truth).
 */
export default function GuestBook({
  variant = "full",
}: {
  variant?: Variant;
}) {
  const initialVisible =
    variant === "preview" ? VISIBLE_PREVIEW : VISIBLE_FULL;

  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/guestbook")
      .then((r) => r.json())
      .then((data: { entries?: Entry[] }) => {
        if (cancelled) return;
        setEntries(data.entries ?? []);
      })
      .catch(() => {
        if (cancelled) return;
        setEntries([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(
    () => () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    },
    []
  );

  const canSubmit =
    nickname.trim().length >= 1 &&
    nickname.trim().length <= NICKNAME_MAX &&
    message.trim().length >= 1 &&
    message.trim().length <= MESSAGE_MAX &&
    !submitting;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname.trim(),
          message: message.trim(),
        }),
      });
      const data: { entry?: Entry; error?: string; code?: string } =
        await res.json();

      if (!res.ok) {
        if (data.code === "RATE_LIMITED") {
          setError("한 시간 뒤에 다시 와주세요.");
        } else if (data.code === "KV_UNAVAILABLE") {
          setError("방명록은 배포된 사이트에서만 동작합니다.");
        } else if (data.error) {
          setError(data.error);
        } else {
          setError("잠시 후 다시 시도해 주세요.");
        }
        return;
      }

      if (data.entry) {
        setEntries((prev) => [data.entry as Entry, ...(prev ?? [])]);
      }
      setNickname("");
      setMessage("");
      setSuccess(true);
      if (successTimer.current) clearTimeout(successTimer.current);
      successTimer.current = setTimeout(() => setSuccess(false), 4500);
    } catch {
      setError("잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  const visible = entries ?? [];
  const displayed = showAll ? visible : visible.slice(0, initialVisible);
  const hasMore = visible.length > initialVisible;

  return (
    <div>
      {/* ─── Form ─── */}
      <form
        onSubmit={handleSubmit}
        className="mt-12 max-w-2xl"
        noValidate
      >
        <Field
          label="별명"
          counter={`${nickname.length}/${NICKNAME_MAX}`}
        >
          <input
            type="text"
            value={nickname}
            onChange={(e) =>
              setNickname(e.target.value.slice(0, NICKNAME_MAX))
            }
            maxLength={NICKNAME_MAX}
            disabled={submitting}
            placeholder="익명도 좋습니다"
            className="w-full border-b border-concrete-300 bg-transparent py-2 font-serif text-lg text-ink outline-none transition-colors duration-300 placeholder:text-concrete-400 focus:border-ink disabled:opacity-50 sm:text-xl"
          />
        </Field>

        <div className="mt-10">
          <Field
            label="한 마디"
            counter={`${message.length}/${MESSAGE_MAX}`}
          >
            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value.slice(0, MESSAGE_MAX))
              }
              maxLength={MESSAGE_MAX}
              disabled={submitting}
              rows={3}
              placeholder="이 자리에 머문 한 줄을 남겨 주세요."
              className="w-full resize-none border-b border-concrete-300 bg-transparent py-2 font-serif text-lg leading-[1.7] text-ink outline-none transition-colors duration-300 placeholder:text-concrete-400 focus:border-ink disabled:opacity-50 sm:text-xl"
            />
          </Field>
        </div>

        {/* Status — sits above the button */}
        <div className="mt-8 min-h-[1.5rem]">
          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                key="err"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-sans text-sm text-red-700"
              >
                {error}
              </motion.p>
            )}
            {success && !error && (
              <motion.p
                key="ok"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-sans text-sm text-concrete-700"
              >
                감사합니다. 발자국이 더해졌습니다.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          data-cursor="view"
          className="group mt-2 inline-flex min-h-12 items-center gap-5 bg-ink px-10 py-5 text-canvas transition-[background-color,gap,opacity] duration-300 hover:bg-accent hover:gap-6 disabled:cursor-not-allowed disabled:opacity-40 sm:px-12 sm:py-6"
        >
          <span className="font-serif text-xl font-light tracking-tight sm:text-2xl">
            {submitting ? "남기는 중…" : "Leave a Mark"}
          </span>
          <span
            aria-hidden
            className="font-sans text-sm tracking-gallery transition-transform duration-300 group-hover:translate-x-1"
          >
            ↗
          </span>
        </button>
      </form>

      {/* ─── List ─── */}
      <div className="mt-24 sm:mt-32">
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-gallery text-concrete-500">
          <span>Visitors</span>
          <span aria-hidden className="block h-px flex-1 bg-concrete-200" />
          {entries !== null && (
            <span>{visible.length} entries</span>
          )}
        </div>

        <div className="mt-8 sm:mt-10">
          {entries === null ? (
            <p className="py-10 text-center font-serif italic text-concrete-500">
              발자국을 가져오는 중…
            </p>
          ) : visible.length === 0 ? (
            <p className="py-12 text-center font-serif italic text-concrete-500">
              아직 발자국이 없습니다. 첫 번째 방문자가 되어주세요.
            </p>
          ) : (
            <ul className="divide-y divide-concrete-200">
              <AnimatePresence initial={false}>
                {displayed.map((entry) => (
                  <EntryRow key={entry.id} entry={entry} />
                ))}
              </AnimatePresence>
            </ul>
          )}

          {/* "More" affordance differs by variant:
                preview → link to /guest (deep-view), always visible
                          once entries have loaded;
                full    → in-place toggle to expand, only when there
                          are entries past the initial visible window. */}
          {variant === "preview" && entries !== null && (
            <Link
              href="/guest"
              data-cursor="view"
              className="group mx-auto mt-12 flex w-fit items-center gap-3 font-sans text-[10px] uppercase tracking-gallery text-concrete-500 transition-colors hover:text-ink"
            >
              <span aria-hidden className="block h-px w-8 bg-concrete-300 transition-colors group-hover:bg-ink" />
              <span>전체 방명록 보기</span>
              <span aria-hidden>↗</span>
              <span aria-hidden className="block h-px w-8 bg-concrete-300 transition-colors group-hover:bg-ink" />
            </Link>
          )}
          {variant === "full" && hasMore && !showAll && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              data-cursor="view"
              className="group mx-auto mt-12 flex items-center gap-3 font-sans text-[10px] uppercase tracking-gallery text-concrete-500 transition-colors hover:text-ink"
            >
              <span aria-hidden className="block h-px w-8 bg-concrete-300 transition-colors group-hover:bg-ink" />
              <span>이전 발자국 보기</span>
              <span aria-hidden>↓</span>
              <span aria-hidden className="block h-px w-8 bg-concrete-300 transition-colors group-hover:bg-ink" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  counter,
  children,
}: {
  label: string;
  counter: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
          {label}
        </span>
        <span className="font-sans text-[10px] tracking-gallery text-concrete-400">
          {counter}
        </span>
      </div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function EntryRow({ entry }: { entry: Entry }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -8, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="overflow-hidden py-8 sm:py-10"
    >
      <div className="font-sans text-[10px] uppercase tracking-gallery text-concrete-500">
        Visitor № {String(entry.number).padStart(3, "0")}
      </div>
      <blockquote className="mt-4 max-w-2xl font-serif text-xl leading-[1.65] text-ink text-balance sm:text-2xl">
        <span aria-hidden className="mr-1 text-concrete-400">
          “
        </span>
        {entry.message}
        <span aria-hidden className="ml-1 text-concrete-400">
          ”
        </span>
      </blockquote>
      <div className="mt-4 flex flex-col gap-1 font-sans text-[11px] uppercase tracking-gallery text-concrete-500 sm:flex-row sm:items-baseline sm:justify-end sm:gap-3">
        <span aria-hidden className="hidden sm:inline">—</span>
        <span className="font-serif italic text-sm normal-case tracking-normal text-concrete-700">
          {entry.nickname}
        </span>
        <span aria-hidden className="hidden text-concrete-300 sm:inline">/</span>
        <span>{formatStamp(entry.createdAt)}</span>
      </div>
    </motion.li>
  );
}
