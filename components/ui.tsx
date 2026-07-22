import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/* Presentational vocabulary. No state and no directives, so these are usable
   from server components and from the client screens that switch on role.
   Every repeated pattern lives here once; pages compose them with layout
   utilities. */

/* ------------------------------------------------------------------ page */

export function Page({ children }: { children: ReactNode }) {
  return <section className="animate-page-in">{children}</section>;
}

export function PageHead({
  title,
  lede,
  actions,
}: {
  title: string;
  lede?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3 xl:gap-[18px]">
      <div>
        <h1 className="text-[21px] font-bold tracking-tight text-navy sm:text-2xl xl:text-[28px]">
          {title}
        </h1>
        {lede ? (
          <p className="mt-1.5 max-w-[64ch] text-[13.5px] leading-relaxed text-muted sm:text-sm">
            {lede}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">{actions}</div>
      ) : null}
    </div>
  );
}

export function DateChip({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-2 text-[13px] whitespace-nowrap text-muted shadow-flat tabular-nums">
      {children}
    </div>
  );
}

export function FooterNote({ children }: { children: ReactNode }) {
  return <div className="mt-3.5 text-right text-[11px] text-muted">{children}</div>;
}

export function Empty({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-line bg-card-2 p-[22px] text-center text-[13px] text-muted",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PhaseBanner({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 rounded-lg border border-info-line bg-info-soft px-3.5 py-2.5 text-xs leading-relaxed font-bold text-[#33518f]">
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- layout
   The page-level grids. Named because the same shapes recur across screens
   and the breakpoints are load-bearing, not incidental. */

export const STACK = "grid gap-3.5 xl:gap-[15px]";
export const STATS_GRID = "mb-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3.5 xl:grid-cols-4";
export const LAYOUT_2 =
  "grid grid-cols-1 gap-3.5 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.95fr)] xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)] xl:gap-[15px]";
export const SPLIT =
  "grid grid-cols-1 gap-3.5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.95fr)] xl:gap-[15px]";
export const INTAKE_GRID =
  "grid grid-cols-1 gap-3.5 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.9fr)] xl:gap-[15px]";
export const RX_GRID =
  "grid grid-cols-1 gap-3.5 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.95fr)] xl:gap-[15px]";
export const CONSULT_GRID =
  "grid grid-cols-1 gap-3.5 lg:grid-cols-[230px_minmax(0,1fr)] xl:gap-[15px] 2xl:grid-cols-[250px_minmax(0,1fr)_370px]";
/** Horizontally scrolling chip rail — next-due across the ward. */
export const RAIL = "scroll-slim mb-3.5 flex snap-x snap-proximity gap-2 overflow-x-auto pb-1.5";

/* ------------------------------------------------------------------ card */

export function Card({
  title,
  as: Heading = "h3",
  aside,
  children,
  className,
  bodyClassName,
  id,
}: {
  title?: string;
  as?: "h2" | "h3";
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-card shadow-card",
        className,
      )}
    >
      {title ? (
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-line-soft bg-linear-to-b from-white to-card-2 px-3.5 py-3.5 sm:px-[17px]">
          <Heading className="text-[15.5px] text-navy">{title}</Heading>
          {aside}
        </div>
      ) : null}
      <div className={cn("px-3.5 py-4 sm:px-[17px]", bodyClassName)}>{children}</div>
    </div>
  );
}

/** Card head trailing slot — chips and a button sitting together. */
export function HeadSlot({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center justify-end gap-1.5">{children}</div>;
}

/* --------------------------------------------------------------- buttons */

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-1.5 font-bold whitespace-nowrap transition disabled:cursor-not-allowed disabled:opacity-50";

export const buttonStyles = {
  primary: cn(
    BUTTON_BASE,
    "min-h-[42px] rounded-lg bg-linear-to-b from-teal to-teal-600 px-[15px] py-2.5 text-white shadow-teal hover:brightness-105 active:translate-y-px md:min-h-[38px]",
  ),
  danger: cn(
    BUTTON_BASE,
    "min-h-[42px] rounded-lg border border-alert-line bg-alert-soft px-3.5 py-2.5 font-extrabold text-alert hover:bg-alert-line/40 active:translate-y-px md:min-h-[38px]",
  ),
  soft: cn(
    BUTTON_BASE,
    "min-h-9 rounded-md border border-line bg-white px-3 py-2 text-[13.5px] text-navy shadow-flat hover:border-[#cdd8e4] hover:bg-card-2 active:translate-y-px",
  ),
  icon: cn(
    "grid size-[42px] place-items-center rounded-lg border border-line bg-white shadow-flat transition hover:border-[#cdd8e4] hover:shadow-card active:translate-y-px md:size-[38px]",
  ),
  ack: cn(
    BUTTON_BASE,
    "min-h-9 rounded-[9px] border border-line bg-white px-2.5 py-1.5 text-[11px] font-extrabold text-navy shadow-flat hover:border-[#cdd8e4] hover:bg-card-2 sm:min-h-0",
  ),
  escalate: cn(
    BUTTON_BASE,
    "min-h-9 rounded-[9px] border border-alert-line bg-white px-2.5 py-1.5 text-[11px] font-extrabold text-alert hover:bg-alert-soft sm:min-h-0",
  ),
  ctrl: cn(
    BUTTON_BASE,
    "rounded-[9px] border border-white/25 bg-white/10 px-2.5 py-1.5 text-[11px] font-extrabold text-white hover:bg-white/20",
  ),
} as const;

type ButtonVariant = keyof typeof buttonStyles;

export function Button({
  variant = "soft",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return <button {...props} className={cn(buttonStyles[variant], className)} />;
}

/** Same skin as Button, but a real link — used where a control navigates. */
export function LinkButton({
  variant = "soft",
  className,
  ...props
}: ComponentProps<"a"> & { variant?: ButtonVariant }) {
  return <a {...props} className={cn(buttonStyles[variant], "no-underline", className)} />;
}

/* ----------------------------------------------------------------- pills */

const PILL_TONES = {
  ok: "bg-ok-soft text-ok border-ok-line",
  warn: "bg-warn-soft text-warn border-warn-line",
  alert: "bg-alert-soft text-alert border-alert-line",
  info: "bg-info-soft text-info border-info-line",
  brand: "bg-teal-soft text-teal-600 border-teal-line",
  plain: "bg-bg-2 text-muted border-line",
  /* time chips: due → outline · due-soon → amber fill · overdue → red fill */
  due: "bg-white text-ink border-line",
  "due-soon": "bg-warn-soft text-warn border-warn-line",
  overdue: "bg-alert-solid text-white border-transparent shadow-badge",
  acked: "bg-ok-soft text-ok border-ok-line",
} as const;

export type PillTone = keyof typeof PILL_TONES;

export function Pill({
  tone = "plain",
  num,
  small,
  children,
}: {
  tone?: PillTone;
  num?: boolean;
  small?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-bold whitespace-nowrap",
        small ? "px-[7px] py-0.5 text-[10px]" : "px-2.5 py-1 text-[11.5px]",
        num && "tabular-nums",
        PILL_TONES[tone],
      )}
    >
      {children}
    </span>
  );
}

/** Provenance chip — where a fact came from. Never decorative. */
export function Prov({
  source = "hub",
  children,
}: {
  source?: "hub" | "ai" | "pms";
  children: ReactNode;
}) {
  const tones = {
    hub: "bg-bg-2 text-muted border-line",
    ai: "bg-[#f1ecfd] text-[#6641c0] border-[#e0d5f7]",
    pms: "bg-info-soft text-info border-info-line",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-xs border px-1.5 py-0.5 align-middle text-[10px] font-bold tracking-wide whitespace-nowrap",
        tones[source],
      )}
    >
      {children}
    </span>
  );
}

const STATUS_TONES = {
  ok: "bg-ok-soft text-ok border border-ok-line",
  watch: "bg-warn-soft text-warn border border-warn-line",
  alert: "bg-alert-solid text-white",
} as const;

export function Status({
  tone,
  children,
}: {
  tone: keyof typeof STATUS_TONES;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[11px] font-extrabold whitespace-nowrap",
        STATUS_TONES[tone],
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------ rows/lists */

const MINI_TONES = {
  brand: "bg-teal-soft",
  alert: "bg-alert-soft",
  warn: "bg-warn-soft",
  info: "bg-info-soft",
} as const;

export function MiniIcon({
  tone = "brand",
  children,
}: {
  tone?: keyof typeof MINI_TONES;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-lg text-base shadow-[inset_0_0_0_1px_rgb(28_136_128_/_0.10)]",
        MINI_TONES[tone],
      )}
    >
      {children}
    </div>
  );
}

export function ItemTitle({ children }: { children: ReactNode }) {
  return <div className="text-[13.5px] leading-snug font-extrabold">{children}</div>;
}

export function ItemMeta({ children }: { children: ReactNode }) {
  return <div className="mt-0.5 text-xs leading-relaxed text-muted">{children}</div>;
}

/** Trailing chips/controls. Below 600px they drop under the row content. */
export function RowRight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center justify-start gap-1.5 pl-[47px] sm:ml-auto sm:w-auto sm:shrink-0 sm:justify-end sm:pl-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function RowLine({
  icon,
  title,
  meta,
  right,
  className,
}: {
  icon?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-start gap-2.5 border-b border-line-soft py-2.5 last:border-b-0 sm:flex-nowrap",
        className,
      )}
    >
      {icon}
      <div className="min-w-0 basis-[60%] sm:basis-auto">
        <ItemTitle>{title}</ItemTitle>
        {meta ? <ItemMeta>{meta}</ItemMeta> : null}
      </div>
      {right ? <RowRight>{right}</RowRight> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  subTone,
  valueTone,
}: {
  label: string;
  value: string | number;
  sub?: ReactNode;
  subTone?: "ok" | "warn" | "alert";
  valueTone?: "alert";
}) {
  const subTones = { ok: "text-ok", warn: "text-warn", alert: "text-alert font-bold" };
  return (
    <button className="block w-full rounded-2xl border border-line bg-card px-4 py-[15px] text-left shadow-flat transition hover:border-teal-line hover:shadow-card md:hover:-translate-y-px">
      <div className="text-[12.5px] font-semibold text-muted">{label}</div>
      <div
        className={cn(
          "my-1 text-2xl font-extrabold tracking-tight tabular-nums xl:text-[28px]",
          valueTone === "alert" ? "text-alert" : "text-navy",
        )}
      >
        {value}
      </div>
      {sub ? (
        <div className={cn("text-xs leading-snug text-muted", subTone && subTones[subTone])}>
          {sub}
        </div>
      ) : null}
    </button>
  );
}

export function ScheduleRow({
  time,
  emoji,
  patient,
  client,
  right,
  now,
}: {
  time: string;
  emoji: string;
  patient: ReactNode;
  client: ReactNode;
  right?: ReactNode;
  now?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[44px_minmax(0,1fr)] items-start gap-x-2.5 gap-y-[7px] border-b border-line-soft py-3 last:border-b-0",
        "sm:grid-cols-[56px_44px_minmax(0,1fr)_auto] sm:items-center sm:gap-3 sm:py-2.5",
        now &&
          "-ml-2 rounded-lg border-l-[3px] border-l-teal bg-linear-to-r from-teal-soft to-transparent pl-2 sm:-ml-3 sm:pl-2.5",
      )}
    >
      <div className="col-span-full row-start-1 text-xs font-extrabold text-teal-600 tabular-nums sm:col-span-1 sm:row-start-auto sm:text-[13.5px] sm:text-navy">
        {time}
      </div>
      <div
        aria-hidden="true"
        className="col-start-1 row-start-2 grid size-[42px] place-items-center rounded-xl bg-linear-to-br from-teal-soft to-[#dcefec] text-xl shadow-[inset_0_0_0_1px_rgb(28_136_128_/_0.10)] sm:col-start-auto sm:row-start-auto"
      >
        {emoji}
      </div>
      <div className="col-start-2 row-start-2 min-w-0 sm:col-start-auto sm:row-start-auto">
        <div className="text-[13.5px] font-extrabold">{patient}</div>
        <div className="mt-0.5 text-xs text-muted">{client}</div>
      </div>
      {right ? (
        <div className="col-start-2 row-start-3 flex flex-wrap items-center gap-1.5 sm:col-start-auto sm:row-start-auto sm:ml-auto sm:justify-end">
          {right}
        </div>
      ) : null}
    </div>
  );
}

export function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid items-baseline gap-0.5 text-[13px] leading-relaxed sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-2.5 lg:grid-cols-[112px_minmax(0,1fr)]">
      <span className="text-[11px] font-semibold tracking-wide text-muted uppercase sm:text-[13px] sm:tracking-normal sm:normal-case">
        {label}
      </span>
      <b className="min-w-0 [overflow-wrap:anywhere]">{children}</b>
    </div>
  );
}

export function Avatar({ initials, small }: { initials: string; small?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-linear-to-br from-[#dff0ed] to-[#c2e2dc] font-extrabold text-navy",
        small ? "size-[22px] text-[9px]" : "size-[34px] text-[12.5px]",
      )}
    >
      {initials}
    </span>
  );
}

export function Owner({ initials, name }: { initials: string; name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] whitespace-nowrap text-muted">
      <Avatar initials={initials} small />
      {name}
    </span>
  );
}

/* ------------------------------------------------------- content blocks */

export function ZoneLabel({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return (
    <div
      className={cn(
        "mt-4 mb-2 text-[9.5px] font-extrabold tracking-[0.9px] uppercase first:mt-0",
        muted ? "text-muted" : "text-[#8fa3b8]",
      )}
    >
      {children}
    </div>
  );
}

export function RoutePreview({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 rounded-lg border border-line bg-card-2 px-3.5 py-2.5 text-xs leading-loose text-muted">
      {children}
    </div>
  );
}

export function Concern({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 rounded-lg border border-alert-line bg-alert-soft px-3.5 py-2.5 text-[13px] leading-relaxed">
      {children}
    </div>
  );
}

export function Comfort({ tone, children }: { tone?: "warn"; children: ReactNode }) {
  return (
    <div
      className={cn(
        "mb-2 rounded-lg border px-3 py-2.5 text-[13px]",
        tone === "warn" ? "border-warn-line bg-warn-soft" : "border-line bg-card-2",
      )}
    >
      {children}
    </div>
  );
}

export function Meta({ children }: { children: ReactNode }) {
  return <div className="mt-1 text-[11px] text-muted">{children}</div>;
}

export function HandoverItem({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2.5 rounded-lg border border-line bg-card-2 p-3 text-[13px] leading-relaxed">
      {children}
    </div>
  );
}

export function HandoverWho({ children }: { children: ReactNode }) {
  return (
    <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
      {children}
    </div>
  );
}

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: ReactNode;
  hint?: ReactNode;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-3.5">
      <label htmlFor={htmlFor} className="mb-1.5 block text-[12.5px] font-extrabold text-ink-2">
        {label}
        {hint ? <span className="text-[13px] font-normal text-muted"> {hint}</span> : null}
      </label>
      {children}
    </div>
  );
}

export const inputStyles =
  "w-full max-w-full rounded-[11px] border border-line bg-card-2 px-3 py-2.5 text-sm text-ink transition focus:border-teal-line focus:bg-white focus:ring-3 focus:ring-teal/10 focus:outline-none";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea {...props} className={cn(inputStyles, "min-h-[78px] resize-y", className)} />;
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input {...props} className={cn(inputStyles, className)} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select {...props} className={cn(inputStyles, className)} />;
}

export function Subtle({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[13px] text-muted", className)}>{children}</p>;
}
