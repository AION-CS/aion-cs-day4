"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { CorePill } from "@/components/ui/AnswerBlock";
import { tt } from "@/lib/lang";

/**
 * Collapses a material card or task block that is optional — not on the shortest path to the route's own
 * objective — behind one quiet line, so the route reads shorter without removing or gating anything (CLAUDE.md
 * #6: nothing is ever a hard lock). Renders a placeholder at the same `id` the page already anchors to
 * (PageNav, scrollToAndFlash), so a jump still lands somewhere even while collapsed. One click reveals the
 * real card/block in full, exactly as if this wrapper were never there; nothing is deleted, only folded.
 */
export function OptionalSection({
  id,
  title,
  minutes,
  reason,
  children,
}: {
  id: string;
  title: string;
  minutes?: number;
  /** One line saying what this deepens or repeats, so the choice to skip it is informed. */
  reason: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  if (open) return <>{children}</>;
  return (
    <div id={id} className="card flex flex-wrap items-center justify-between gap-3 border-dashed border-line bg-mist/40 p-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <CorePill core={false} />
          <span className="font-semibold text-ink">{title}</span>
          {minutes ? <span className="smallcaps text-ash">{minutes} {tt("min", "Min.")}</span> : null}
        </div>
        <p className="mt-1 text-caption text-ash">{reason}</p>
      </div>
      <button type="button" onClick={() => setOpen(true)} className="btn-ghost btn-sm shrink-0">
        {tt("Show this", "Diese anzeigen")}
      </button>
    </div>
  );
}
