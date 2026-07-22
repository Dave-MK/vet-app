import { EscalateButton, ScrollToHandover, Tabs } from "@/components/interactive";
import {
  Avatar,
  Button,
  Card,
  HandoverItem,
  HandoverWho,
  ItemMeta,
  ItemTitle,
  LAYOUT_2,
  Owner,
  Page,
  PageHead,
  Pill,
  RowLine,
  RowRight,
  STACK,
  Subtle,
  Textarea,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export const metadata = { title: "Tasks & Handover · Andale Care Hub" };

function TaskGroup({ children, alert }: { children: ReactNode; alert?: boolean }) {
  return (
    <div
      className={cn(
        "px-3.5 pt-3 pb-1.5 text-[10.5px] font-extrabold tracking-wider uppercase sm:px-[17px]",
        alert ? "text-alert" : "text-muted",
      )}
    >
      {children}
    </div>
  );
}

function TaskRow({
  label,
  title,
  meta,
  right,
  done,
}: {
  label: string;
  title: ReactNode;
  meta: ReactNode;
  right: ReactNode;
  done?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-start gap-2.5 border-b border-line-soft px-3.5 py-2.5 transition last:border-b-0 hover:bg-card-2 sm:flex-nowrap sm:px-[17px]">
      <input
        type="checkbox"
        aria-label={label}
        defaultChecked={done}
        className="mt-0.5 size-[18px] shrink-0 accent-teal"
      />
      <div className={cn("min-w-0 basis-[70%] sm:basis-auto", done && "opacity-55")}>
        <ItemTitle>
          <span className={cn(done && "line-through")}>{title}</span>
        </ItemTitle>
        <ItemMeta>{meta}</ItemMeta>
      </div>
      <RowRight className="pl-[29px] sm:pl-0">{right}</RowRight>
    </div>
  );
}

export default function TasksPage() {
  return (
    <Page>
      <PageHead
        title="Tasks & Handover"
        lede="Every unresolved action, with an owner, a due time and an escalation route. Nothing lives in memory or on sticky notes."
        actions={
          <>
            <ScrollToHandover />
            <Button variant="primary">+ New task</Button>
          </>
        }
      />

      <div className={LAYOUT_2}>
        <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-card">
          <Tabs
            tabs={[
              {
                key: "my",
                label: (
                  <>
                    My work <b className="tabular-nums">(6)</b>
                  </>
                ),
              },
              {
                key: "team",
                label: (
                  <>
                    Team <b className="tabular-nums">(14)</b>
                  </>
                ),
              },
              {
                key: "all",
                label: (
                  <>
                    All open <b className="tabular-nums">(23)</b>
                  </>
                ),
              },
            ]}
          />

          <TaskGroup alert>Overdue (2)</TaskGroup>
          <TaskRow
            label="Complete task: call Sophie Lang"
            title="Call Sophie Lang — post-op check on Alfie"
            meta="Patient: Alfie Dunn · category: callback · created by discharge flow 20 Jul"
            right={
              <>
                <Owner initials="RT" name="RVN Trimmer" />
                <Pill tone="overdue" num>
                  due 09:00 · +32m
                </Pill>
                <EscalateButton />
              </>
            }
          />
          <TaskRow
            label="Complete task: review abnormal haematology"
            title="Review abnormal haematology — Archie Jones"
            meta="Category: diagnostics · auto-created when result filed 09:08"
            right={
              <>
                <Owner initials="MH" name="Dr Houghton" />
                <Pill tone="overdue" num>
                  +24m
                </Pill>
                <EscalateButton />
              </>
            }
          />

          <TaskGroup>Due today (3)</TaskGroup>
          <TaskRow
            label="Complete task: send records to PDSA"
            title="Send records to PDSA — Bruno Kelly transfer"
            meta="Category: records · client consent on file ✓"
            right={
              <>
                <Owner initials="SC" name="S. Coles" />
                <Pill tone="due" num>
                  17:00
                </Pill>
              </>
            }
          />
          <TaskRow
            label="Complete task: chase external lab"
            title="Chase external lab — histopathology for Cooper"
            meta="Category: diagnostics · sample sent 17 Jul · expected yesterday"
            right={
              <>
                <Owner initials="CD" name="RVN Dixon" />
                <Pill tone="due-soon" num>
                  12:00
                </Pill>
              </>
            }
          />
          <TaskRow
            done
            label="Complete task: confirm fasting"
            title="Confirm fasting — Bella (dental, tomorrow)"
            meta="Done 09:14 by D. Shelbourne · evidence: call log #4411"
            right={<Pill tone="ok">Done</Pill>}
          />

          <TaskGroup>This week (1)</TaskGroup>
          <TaskRow
            label="Complete task: order clipper blades"
            title="Order replacement clipper blades"
            meta="Category: equipment · photo attached · raised by VCA H. Evans"
            right={
              <>
                <Owner initials="CR" name="RVN Rustage" />
                <Pill tone="due">Fri</Pill>
              </>
            }
          />
        </div>

        <div className={STACK}>
          <Card
            id="handoverCard"
            title="Shift handover — build"
            aside={<Pill tone="plain">for 13:00 handover</Pill>}
          >
            <Subtle className="mb-3">
              Open items are pulled in automatically from the board and task list. Add risks, then each
              incoming team member acknowledges.
            </Subtle>
            <HandoverItem>
              <HandoverWho>
                <b>Auto · hospital board</b>
                <Pill tone="warn">3 open</Pill>
              </HandoverWho>
              Archie (fluids, escalation open) · Nala (temp watch) · Tilly (meds 09:45, appetite poor)
            </HandoverItem>
            <HandoverItem>
              <HandoverWho>
                <b>Auto · overdue tasks</b>
                <Pill tone="alert">2</Pill>
              </HandoverWho>
              Lang callback (+32m) · Archie result review (+24m)
            </HandoverItem>
            <HandoverItem>
              <HandoverWho>
                <b>Risk note — RVN Dixon</b>
                <span className="text-[13px] text-muted tabular-nums">09:20</span>
              </HandoverWho>
              Nala: recovery slower than expected after imaging sedation. Obs q30min not q60. Escalate
              temp &lt;37.4.
            </HandoverItem>
            <Textarea placeholder="Add a risk or context note…" aria-label="Add a handover note" />
            <div className="mt-2.5 flex justify-end">
              <Button variant="primary">Send for acknowledgement</Button>
            </div>
          </Card>

          <Card title="Previous handover — acknowledgements" aside={<Pill tone="ok">3 of 4</Pill>}>
            <RowLine
              icon={<Avatar initials="MH" />}
              title="Dr Houghton"
              meta="Acknowledged 08:04"
              right={<Pill tone="ok">✓</Pill>}
            />
            <RowLine
              icon={<Avatar initials="CD" />}
              title="RVN Dixon"
              meta="Acknowledged 08:01"
              right={<Pill tone="ok">✓</Pill>}
            />
            <RowLine
              icon={<Avatar initials="MS" />}
              title="RVN Sharrock"
              meta="Acknowledged 08:12"
              right={<Pill tone="ok">✓</Pill>}
            />
            <RowLine
              icon={<Avatar initials="LW" />}
              title="SVN Wright"
              meta="Not yet acknowledged · reminded 09:00"
              right={<Pill tone="due-soon">pending</Pill>}
            />
          </Card>
        </div>
      </div>
    </Page>
  );
}
