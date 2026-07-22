import { AckButton } from "@/components/interactive";
import {
  Button,
  Card,
  DateChip,
  HeadSlot,
  LAYOUT_2,
  LinkButton,
  MiniIcon,
  PageHead,
  Pill,
  Prov,
  RowLine,
  STACK,
  STATS_GRID,
  ScheduleRow,
  StatCard,
} from "@/components/ui";

export function TodayReception() {
  return (
    <>
      <PageHead
        title="Today — Reception"
        lede="Who is here, who is calling, and what is waiting on us. Every number opens its list."
        actions={
          <>
            <Pill tone="brand">● Live · updated 09:32:04</Pill>
            <DateChip>Tuesday 21 July 2026 · 09:32</DateChip>
          </>
        }
      />

      <div className={STATS_GRID}>
        <StatCard label="Waiting now" value={4} sub="Longest wait 18 min — Milo B" subTone="warn" />
        <StatCard label="Appointments today" value={26} sub="5 done · 1 late · 20 to come" />
        <StatCard
          label="Prescriptions"
          value={6}
          sub={
            <>
              ready to collect · <b className="text-warn">3 awaiting vet review</b>
            </>
          }
        />
        <StatCard label="Callbacks due" value={5} sub="1 overdue — post-op concern" subTone="alert" />
      </div>

      <div className={LAYOUT_2}>
        <div className={STACK}>
          <Card
            title="Waiting room"
            as="h2"
            aside={
              <HeadSlot>
                <Pill tone="warn">4 waiting</Pill>
                <Button>+ Walk-in</Button>
              </HeadSlot>
            }
          >
            <RowLine
              icon={<MiniIcon>🐱</MiniIcon>}
              title={
                <>
                  Milo Bell <Prov>cat area</Prov>
                </>
              }
              meta="Vomiting · triage: no red flags — N. Gillan 09:12 · Dr Houghton, Room 1"
              right={
                <>
                  <Pill tone="overdue" num>
                    waiting 18m
                  </Pill>
                  <Button variant="ack">In consult</Button>
                </>
              }
            />
            <RowLine
              icon={<MiniIcon>🐶</MiniIcon>}
              title={
                <>
                  Daisy Carter{" "}
                  <span className="inline-flex items-center gap-1 rounded-xs border border-warn-line bg-warn-soft px-1.5 py-0.5 align-middle text-[10px] font-bold tracking-wide whitespace-nowrap text-warn">
                    ⚠ quiet area
                  </span>
                </>
              }
              meta="Vaccination + skin review · nervous near larger dogs · Dr Crook, Room 2"
              right={
                <>
                  <Pill tone="due-soon" num>
                    waiting 11m
                  </Pill>
                  <Button variant="ack">In consult</Button>
                </>
              }
            />
            <RowLine
              icon={<MiniIcon>🐰</MiniIcon>}
              title={
                <>
                  Poppy Moore <Prov>rabbit — carrier covered</Prov>
                </>
              }
              meta="Nail clip · nurse clinic · RVN Sharrock"
              right={
                <>
                  <Pill tone="due" num>
                    waiting 6m
                  </Pill>
                  <Button variant="ack">In consult</Button>
                </>
              }
            />
            <RowLine
              icon={<MiniIcon>🐶</MiniIcon>}
              title="Alfie Dunn"
              meta="Collection — surgical discharge · RVN Trimmer preparing meds"
              right={
                <>
                  <Pill tone="due" num>
                    arrived 09:29
                  </Pill>
                  <Button variant="ack">Notify nurse</Button>
                </>
              }
            />
          </Card>

          <Card
            title="Schedule"
            as="h2"
            aside={
              <HeadSlot>
                <span className="text-[13px] text-muted tabular-nums">09:32</span>
                <Pill tone="brand">● Live</Pill>
              </HeadSlot>
            }
          >
            <ScheduleRow
              time="09:00"
              emoji="🐱"
              patient="Milo · Vomiting"
              client="James Bell · Dr Houghton · Room 1"
              right={<Pill tone="warn">Waiting 18m</Pill>}
            />
            <ScheduleRow
              now
              time="09:20"
              emoji="🐶"
              patient="Daisy · Vaccination + skin"
              client="Emma Carter · Dr Crook · Room 2"
              right={<Pill tone="warn">Waiting 11m</Pill>}
            />
            <ScheduleRow
              time="09:40"
              emoji="🐰"
              patient="Poppy · Nail clip"
              client="Leah Moore · RVN Sharrock · Nurse room"
              right={<Pill tone="ok">Checked in</Pill>}
            />
            <ScheduleRow
              time="10:00"
              emoji="🐶"
              patient="Barney · Skin review"
              client="Noah Green · Dr Crook · Room 2"
              right={<Button variant="ack">Check in</Button>}
            />
            <ScheduleRow
              time="10:20"
              emoji="🐱"
              patient="Luna · Dental check"
              client="Olivia Price · Dr Houghton · Room 1"
              right={<Pill tone="plain">Booked</Pill>}
            />
            <div className="pt-2.5 text-center">
              <Button>Show all 26 ↓</Button>
            </div>
          </Card>
        </div>

        <div className={STACK}>
          <Card title="Needs attention" aside={<Pill tone="alert">4 items · 2 clinical</Pill>}>
            <RowLine
              icon={<MiniIcon tone="alert">⚠</MiniIcon>}
              title="Abnormal lab result unacknowledged"
              meta={
                <>
                  Archie Jones · haematology · owner: <b>Dr Houghton</b> · escalates to Dr Crook at 30
                  min
                </>
              }
              right={
                <>
                  <Pill tone="overdue" num>
                    24m
                  </Pill>
                  <AckButton />
                </>
              }
            />
            <RowLine
              icon={<MiniIcon tone="alert">☎</MiniIcon>}
              title="Post-op callback overdue"
              meta={
                <>
                  Sophie Lang re: Alfie · owner: <b>RVN Trimmer</b> · due 09:00
                </>
              }
              right={
                <>
                  <Pill tone="overdue" num>
                    32m
                  </Pill>
                  <AckButton />
                </>
              }
            />
            <RowLine
              icon={<MiniIcon tone="warn">Rx</MiniIcon>}
              title="3 repeat prescriptions near SLA"
              meta={
                <>
                  Oldest 26h · owner: <b>duty vet (Dr Houghton)</b> · target 48h
                </>
              }
              right={
                <>
                  <Pill tone="due-soon" num>
                    26h
                  </Pill>
                  <LinkButton variant="ack" href="/rx">
                    Open queue
                  </LinkButton>
                </>
              }
            />
            <RowLine
              icon={<MiniIcon tone="info">✉</MiniIcon>}
              title="Records request from PDSA"
              meta={
                <>
                  Transfer out — Bruno Kelly · owner: <b>S. Coles</b> · due today
                </>
              }
              right={
                <>
                  <Pill tone="due">today</Pill>
                  <AckButton />
                </>
              }
            />
          </Card>

          <Card title="Expected collections" aside={<Pill tone="plain">3 today</Pill>}>
            <RowLine
              icon={<MiniIcon>💊</MiniIcon>}
              title="Apoquel — Daisy Carter"
              meta="Ready · paid · shelf B2"
              right={<Pill tone="ok">Ready</Pill>}
            />
            <RowLine
              icon={<MiniIcon>🐶</MiniIcon>}
              title="Alfie Dunn — surgical discharge"
              meta="10:30 · discharge appt with RVN Trimmer"
              right={
                <Pill tone="due" num>
                  10:30
                </Pill>
              }
            />
            <RowLine
              icon={<MiniIcon>💊</MiniIcon>}
              title="Metacam — Tilly Shaw"
              meta="Being prepared · dispensary"
              right={<Pill tone="plain">Preparing</Pill>}
            />
          </Card>
        </div>
      </div>
    </>
  );
}
