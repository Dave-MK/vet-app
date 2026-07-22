import { AckButton } from "@/components/interactive";
import {
  Button,
  Card,
  DateChip,
  LAYOUT_2,
  LinkButton,
  MiniIcon,
  PageHead,
  Pill,
  RowLine,
  STACK,
  STATS_GRID,
  ScheduleRow,
  StatCard,
} from "@/components/ui";

export function TodayVet() {
  return (
    <>
      <PageHead
        title="Today — Dr Houghton"
        lede="Your consultations, your open loops, and anything escalated to you."
        actions={
          <>
            <Pill tone="brand">● Live</Pill>
            <DateChip>Tuesday 21 July 2026 · 09:32</DateChip>
          </>
        }
      />

      <div className={STATS_GRID}>
        <StatCard label="My consults today" value={11} sub="next: Milo Bell — waiting 18 min" />
        <StatCard label="Results to review" value={3} sub="1 abnormal — Archie, 24 min" subTone="alert" />
        <StatCard label="Unsigned notes" value={2} sub="oldest from yesterday 16:40" subTone="warn" />
        <StatCard label="Rx to authorise" value={3} sub="oldest 26h of 48h target" subTone="warn" />
      </div>

      <div className={LAYOUT_2}>
        <Card title="My consultation list" as="h2" aside={<Pill tone="warn">running 12 min behind</Pill>}>
          <ScheduleRow
            now
            time="09:00"
            emoji="🐱"
            patient="Milo Bell · Vomiting"
            client="triaged — no red flags · waiting 18 min"
            right={<Button variant="primary">Start consult</Button>}
          />
          <ScheduleRow
            time="10:20"
            emoji="🐱"
            patient="Luna Price · Dental check"
            client="estimate on file · PHC Essential"
            right={<Pill tone="plain">Booked</Pill>}
          />
          <ScheduleRow
            time="10:40"
            emoji="🐶"
            patient="Frankie Wood · Lameness"
            client="recheck — seen 14 Jul"
            right={<Pill tone="plain">Booked</Pill>}
          />
        </Card>

        <div className={STACK}>
          <Card title="Open loops" aside={<Pill tone="alert">1 clinical</Pill>}>
            <RowLine
              icon={<MiniIcon tone="alert">⚠</MiniIcon>}
              title="Archie Jones — abnormal haematology"
              meta="You ordered 20 Jul · escalates to Dr Crook at 30 min"
              right={
                <>
                  <Pill tone="overdue" num>
                    24m
                  </Pill>
                  <AckButton label="Review" />
                </>
              }
            />
            <RowLine
              icon={<MiniIcon tone="warn">✎</MiniIcon>}
              title="2 unsigned notes"
              meta="Frankie Wood (yesterday) · Oscar Hall (yesterday)"
              right={<Pill tone="due-soon">sign today</Pill>}
            />
            <RowLine
              icon={<MiniIcon tone="warn">Rx</MiniIcon>}
              title="3 repeats to authorise"
              meta="1 needs re-exam decision (assessment stale)"
              right={
                <LinkButton variant="ack" href="/rx">
                  Open queue
                </LinkButton>
              }
            />
          </Card>

          <Card title="Escalated to me" aside={<Pill tone="plain">1</Pill>}>
            <RowLine
              icon={<MiniIcon tone="alert">▲</MiniIcon>}
              title="Nala — temp trending down in recovery"
              meta="Raised by RVN Chadwick 09:28 · severity: concern"
              right={<AckButton />}
            />
          </Card>
        </div>
      </div>
    </>
  );
}
