import { Board, EscalateButton } from "@/components/interactive";
import { Empty, FooterNote, Page, Pill, Prov, RAIL, Status } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export const metadata = { title: "Hospital board · Andale Care Hub" };

function Column({ title, count, children }: { title: string; count: number; children: ReactNode }) {
  return (
    <div className="snap-start rounded-xl border border-line-soft bg-bg-2 p-2.5">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <h3 className="text-[13.5px] text-navy">{title}</h3>
        <span className="rounded-full border border-line bg-white px-2 py-0.5 text-[11px] font-bold text-muted tabular-nums">
          {count}
        </span>
      </div>
      {children}
    </div>
  );
}

function PatientCard({
  name,
  meta,
  status,
  checks,
  lines,
  foot,
}: {
  name: string;
  meta: string;
  status: { tone: "ok" | "watch" | "alert"; label: string };
  /** a fraction beats a meaningless progress bar */
  checks?: { label: string; done: number; total: number };
  lines: { label: string; value: ReactNode }[];
  foot?: ReactNode;
}) {
  return (
    <div className="mb-2.5 rounded-xl border border-line bg-white p-3 shadow-flat transition hover:shadow-card md:hover:-translate-y-px">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h4 className="text-sm">{name}</h4>
          <div className="mt-0.5 text-[11px] leading-snug text-muted">{meta}</div>
        </div>
        <Status tone={status.tone}>{status.label}</Status>
      </div>

      {checks ? (
        <div className="mt-2.5 mb-1.5 text-[11px] leading-snug font-bold text-navy">
          {checks.label}
          <div className="mt-1.5 flex gap-[3px]" aria-hidden="true">
            {Array.from({ length: checks.total }, (_, i) => (
              <span
                key={i}
                className={cn("h-1.5 flex-1 rounded-sm", i < checks.done ? "bg-teal" : "bg-[#e4eaf0]")}
              />
            ))}
          </div>
        </div>
      ) : null}

      {lines.map((line) => (
        <div
          key={line.label}
          className="flex items-center justify-between gap-2 border-t border-line-soft py-1.5 text-[11px]"
        >
          <span>{line.label}</span>
          <b className="text-right text-navy">{line.value}</b>
        </div>
      ))}

      {foot ? <div className="mt-2.5 flex flex-wrap items-center justify-between gap-1.5">{foot}</div> : null}
    </div>
  );
}

export default function HospitalPage() {
  return (
    <Page>
      <Board
        rail={
          <div className={RAIL} aria-label="Next due across the ward">
            {[
              { tone: "overdue", text: "Archie · fluids 09:25 · +7m" },
              { tone: "overdue", text: "Nala · obs 09:28 · +4m" },
              { tone: "due-soon", text: "Cooper · obs 09:35" },
              { tone: "due-soon", text: "Tilly · meds 09:45" },
              { tone: "due", text: "Bella · pre-med 10:05" },
              { tone: "due", text: "Simba · recovery obs on exit" },
            ].map((item) => (
              <span key={item.text} className="shrink-0 snap-start">
                <Pill tone={item.tone as "overdue" | "due-soon" | "due"} num>
                  {item.text}
                </Pill>
              </span>
            ))}
          </div>
        }
      >
        <Column title="Pre-op" count={2}>
          <PatientCard
            name="Bella"
            meta="Spaniel · dental · Kennel 2"
            status={{ tone: "ok", label: "● OK" }}
            checks={{
              label: "Pre-op 3/5 — consent ✓ · fasted ✓ · IV ✓ · bloods pending · pre-med 10:05",
              done: 3,
              total: 5,
            }}
            lines={[
              { label: "Vet", value: "Dr Crook" },
              { label: "Nurse", value: "RVN Trimmer" },
            ]}
            foot={
              <>
                <Pill tone="due" num>
                  pre-med 10:05
                </Pill>
                <EscalateButton />
              </>
            }
          />
          <PatientCard
            name="Max"
            meta="Labrador · castrate · Kennel 5"
            status={{ tone: "watch", label: "▲ Watch" }}
            checks={{ label: "Pre-op 2/5 — admission running late, arrived 09:10", done: 2, total: 5 }}
            lines={[
              { label: "Vet", value: "Dr Houghton" },
              { label: "Nurse", value: "RVN Sharrock" },
            ]}
            foot={
              <>
                <Pill tone="due-soon">admission in progress</Pill>
                <EscalateButton />
              </>
            }
          />
        </Column>

        <Column title="In theatre" count={1}>
          <PatientCard
            name="Simba"
            meta="DSH cat · dental · Theatre 1"
            status={{ tone: "ok", label: "● In theatre" }}
            lines={[
              { label: "Started", value: <span className="tabular-nums">09:12</span> },
              { label: "Vet", value: "Dr Crook" },
              { label: "Nurse", value: "RVN Trimmer" },
              { label: "Contact", value: "via theatre only" },
            ]}
          />
          <Empty className="mt-2">
            Board shows facts only — anaesthetic monitoring stays on the anaesthetic record.
          </Empty>
        </Column>

        <Column title="Recovery" count={2}>
          <PatientCard
            name="Cooper"
            meta="Cockapoo · lump removal · Kennel 1"
            status={{ tone: "ok", label: "● OK" }}
            lines={[
              {
                label: "Pain score",
                value: (
                  <span className="tabular-nums">
                    1/10 · 09:05 <Prov source="ai">SVN draft — countersign due</Prov>
                  </span>
                ),
              },
              { label: "Vet", value: "Dr Houghton" },
              { label: "Nurse", value: "RVN Dixon" },
            ]}
            foot={
              <>
                <Pill tone="due-soon" num>
                  obs 09:35
                </Pill>
                <EscalateButton />
              </>
            }
          />
          <PatientCard
            name="Nala"
            meta="Maine Coon · post-imaging · Kennel 3"
            status={{ tone: "alert", label: "⬤ ALERT" }}
            lines={[
              { label: "Temp", value: <span className="tabular-nums">37.6 °C ↓ trend</span> },
              { label: "Vet", value: "Dr Houghton" },
              { label: "Nurse", value: "RVN Chadwick" },
            ]}
            foot={
              <>
                <Pill tone="overdue" num>
                  obs 09:28 · +4m
                </Pill>
                <Pill tone="acked">▲ acked · Dr Houghton</Pill>
              </>
            }
          />
        </Column>

        <Column title="Inpatient" count={2}>
          <PatientCard
            name="Archie"
            meta="Labrador · gastroenteritis · Kennel 4"
            status={{ tone: "alert", label: "⬤ ALERT" }}
            lines={[
              { label: "Fluids", value: <span className="tabular-nums">due 09:25 · overdue</span> },
              { label: "Client update", value: <span className="tabular-nums">promised 10:00</span> },
              { label: "Vet", value: "Dr Crook" },
              { label: "Nurse", value: "RVN Dixon" },
            ]}
            foot={
              <>
                <Pill tone="overdue" num>
                  +7m
                </Pill>
                <EscalateButton />
              </>
            }
          />
          <PatientCard
            name="Tilly"
            meta="Terrier · pancreatitis · Kennel 6"
            status={{ tone: "watch", label: "▲ Watch" }}
            lines={[
              { label: "Eating", value: "small amounts ✓" },
              { label: "Vet", value: "Dr Crook" },
              { label: "Nurse", value: "RVN Dixon" },
            ]}
            foot={
              <>
                <Pill tone="due-soon" num>
                  meds 09:45
                </Pill>
                <EscalateButton />
              </>
            }
          />
        </Column>

        <Column title="Discharge" count={2}>
          <PatientCard
            name="Alfie"
            meta="Beagle · lump removal · ready area"
            status={{ tone: "ok", label: "● Ready" }}
            checks={{
              label:
                "Criteria 5/5 — meds ✓ · instructions ✓ · vet sign-off ✓ · invoice ✓ · owner told ✓",
              done: 5,
              total: 5,
            }}
            lines={[
              { label: "Vet", value: "Dr Houghton" },
              { label: "Nurse", value: "RVN Trimmer" },
            ]}
            foot={
              <Pill tone="due" num>
                collect 10:30
              </Pill>
            }
          />
          <PatientCard
            name="Millie"
            meta="Cat · wound repair · Kennel 7"
            status={{ tone: "watch", label: "▲ Watch" }}
            checks={{ label: "Criteria 3/5 — vet sign-off pending · invoice pending", done: 3, total: 5 }}
            lines={[
              { label: "Vet", value: "Dr Tunney" },
              { label: "Nurse", value: "RVN Sharrock" },
            ]}
            foot={
              <>
                <Pill tone="due" num>
                  collect 11:15
                </Pill>
                <EscalateButton />
              </>
            }
          />
        </Column>
      </Board>

      <FooterNote>
        Concept UI only. Clinical workflows, permissions and terminology require validation with the
        Andale team.
      </FooterNote>
    </Page>
  );
}
