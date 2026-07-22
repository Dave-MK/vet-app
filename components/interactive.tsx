"use client";

import { useState, type ReactNode } from "react";
import { useDialog, useRole } from "@/components/providers";
import { Button, Field, Pill, buttonStyles } from "@/components/ui";
import { cn } from "@/lib/cn";

/** Escalation is reachable from every card, row and record. */
export function EscalateButton({
  variant = "row",
  children = "▲ Escalate",
}: {
  variant?: "row" | "danger" | "icon";
  children?: ReactNode;
}) {
  const { openDialog } = useDialog();

  if (variant === "icon") {
    return (
      <Button variant="escalate" onClick={() => openDialog("escalation")}>
        ▲<span className="sr-only">Escalate</span>
      </Button>
    );
  }
  return (
    <Button
      variant={variant === "danger" ? "danger" : "escalate"}
      onClick={() => openDialog("escalation")}
    >
      {children}
    </Button>
  );
}

export function SignButton() {
  const { openDialog } = useDialog();
  return (
    <Button variant="primary" onClick={() => openDialog("sign")}>
      Review &amp; sign
    </Button>
  );
}

/** Acknowledging swaps the control for a stamp naming who acked and when. */
export function AckButton({ label = "Acknowledge" }: { label?: string }) {
  const [acked, setAcked] = useState(false);
  const { user } = useRole();

  if (acked) {
    const initials = user.name
      .split(" ")
      .map((word) => word[0])
      .join(". ");
    return <Pill tone="acked">✓ acked · {initials}. · 09:32</Pill>;
  }
  return (
    <Button variant="ack" onClick={() => setAcked(true)}>
      {label}
    </Button>
  );
}

/** Operational safety questions. Any red flag locks booking until a clinician triages. */
export function RedFlagList({ questions }: { questions: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(() => questions.map(() => false));
  const anyChecked = checked.some(Boolean);

  return (
    <>
      <Field
        label="Safety questions"
        hint="— operational, not diagnostic (source: practice emergency list)"
      >
        <div className="grid gap-[7px]">
          {questions.map((question, i) => (
            <label
              key={question}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-[11px] border px-3 py-2.5 text-[13px] transition",
                checked[i]
                  ? "border-alert-line bg-alert-soft font-bold"
                  : "border-line bg-white hover:border-[#cdd8e4]",
              )}
            >
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={(e) =>
                  setChecked((prev) => prev.map((value, j) => (j === i ? e.target.checked : value)))
                }
                className="size-[17px] shrink-0 accent-alert-solid"
              />
              <span>{question}</span>
            </label>
          ))}
        </div>
      </Field>

      <Field label="Outcome">
        <div className="mt-1 flex flex-wrap gap-2">
          <Button variant="primary" disabled={anyChecked} className="grow sm:grow-0">
            Book appointment
          </Button>
          <Button className="grow sm:grow-0">Nurse advice callback</Button>
          <EscalateButton variant="danger">▲ Clinical escalation</EscalateButton>
          <Button className="grow sm:grow-0">OOH signpost (logged)</Button>
        </div>
        {anyChecked ? (
          <p role="status" className="mt-2.5 text-[13px] font-bold text-alert">
            ⚠ Red flag selected — booking is locked until a vet or RVN has triaged. Escalation card is
            ready to send.
          </p>
        ) : null}
      </Field>
    </>
  );
}

export function Tabs({ tabs }: { tabs: { key: string; label: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.key);
  return (
    <div
      role="tablist"
      className="scroll-slim flex gap-1 overflow-x-auto border-b border-line px-2 [scrollbar-width:none] sm:px-3"
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          aria-selected={active === tab.key}
          onClick={() => setActive(tab.key)}
          className={cn(
            "-mb-px min-h-9 border-b-[3px] px-3 py-3 text-[13.5px] font-bold whitespace-nowrap transition",
            active === tab.key
              ? "border-b-teal text-navy"
              : "border-b-transparent text-muted hover:text-ink-2",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function FilterChips({ chips }: { chips: string[] }) {
  const [active, setActive] = useState(chips[0]);
  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <button
          key={chip}
          aria-pressed={active === chip}
          onClick={() => setActive(chip)}
          className={cn(
            "min-h-9 rounded-full border px-2.5 py-1 text-[11px] font-bold transition sm:min-h-0",
            active === chip
              ? "border-teal-line bg-teal-soft text-teal-600"
              : "border-line bg-white text-muted hover:border-[#cdd8e4]",
          )}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

/** Ward mode enlarges the board so it can be read from across the room. */
export function Board({ rail, children }: { rail?: ReactNode; children: ReactNode }) {
  const [ward, setWard] = useState(false);
  return (
    <>
      <div className="mb-3.5 flex flex-wrap items-start justify-between gap-3 xl:gap-[18px]">
        <div>
          <h1 className="text-[21px] font-bold tracking-tight text-navy sm:text-2xl xl:text-[28px]">
            Nursing &amp; hospital board
          </h1>
          <p className="mt-1.5 max-w-[64ch] text-[13.5px] leading-relaxed text-muted sm:text-sm">
            Every patient, both responsible professionals, next action and escalation — with overdue
            impossible to miss.
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <Button aria-pressed={ward} onClick={() => setWard((on) => !on)}>
            Ward mode
          </Button>
          <a href="/tasks" className={cn(buttonStyles.soft, "no-underline")}>
            Shift handover
          </a>
          <Button variant="primary">+ Admit</Button>
        </div>
      </div>

      {rail}

      <div
        className={cn(
          "scroll-slim grid snap-x snap-proximity grid-cols-[repeat(5,minmax(84vw,1fr))] gap-2.5 overflow-x-auto pb-2",
          "sm:grid-cols-[repeat(5,minmax(min(78vw,270px),1fr))] md:grid-cols-[repeat(5,minmax(224px,1fr))] xl:grid-cols-[repeat(5,minmax(232px,1fr))] xl:gap-3",
          ward && "text-[15px] [&_h4]:text-lg",
        )}
      >
        {children}
      </div>
    </>
  );
}

export function ConsultQueue({ items }: { items: { name: string; detail: string }[] }) {
  const [active, setActive] = useState(items[0]?.name);
  return (
    <>
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => setActive(item.name)}
          className={cn(
            "mb-[7px] block w-full rounded-lg border px-3 py-2.5 text-left transition",
            active === item.name
              ? "border-teal-line bg-teal-soft"
              : "border-transparent hover:bg-card-2",
          )}
        >
          <strong className="block text-[13.5px]">{item.name}</strong>
          <span className="text-xs text-muted">{item.detail}</span>
        </button>
      ))}
    </>
  );
}

export function ScrollToHandover() {
  return (
    <Button
      onClick={() => document.getElementById("handoverCard")?.scrollIntoView({ behavior: "smooth" })}
    >
      Shift handover
    </Button>
  );
}
