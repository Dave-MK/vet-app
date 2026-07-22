import {
  Button,
  Card,
  DateChip,
  MiniIcon,
  PageHead,
  Pill,
  RowLine,
  STATS_GRID,
  StatCard,
} from "@/components/ui";

export function TodayDirector() {
  return (
    <>
      <PageHead
        title="Today — Exceptions"
        lede="Only what needs your attention. Everything healthy stays off this screen."
        actions={<DateChip>Tuesday 21 July 2026 · 09:32</DateChip>}
      />

      <div className={STATS_GRID}>
        <StatCard
          label="Clinical alerts unacked >15m"
          value={1}
          valueTone="alert"
          sub="Archie — abnormal result, 24m"
          subTone="alert"
        />
        <StatCard label="Unsigned notes >24h" value={0} sub="All signed same-day this week" subTone="ok" />
        <StatCard label="Rx SLA breaches (7d)" value={1} sub="avg turnaround 31h of 48h" subTone="warn" />
        <StatCard
          label="Complaints in window"
          value={1}
          sub="ack sent day 1 of 5 · resolution day 6 of 56"
        />
      </div>

      <Card
        title="Exception list"
        aside={<span className="text-[13px] text-muted">rules: config → Administration</span>}
      >
        <RowLine
          icon={<MiniIcon tone="alert">⚠</MiniIcon>}
          title="Abnormal result unacknowledged 24 min"
          meta="Archie Jones · owner Dr Houghton · ladder: Dr Crook at 30m → you at 60m"
          right={
            <Pill tone="overdue" num>
              24m
            </Pill>
          }
        />
        <RowLine
          icon={<MiniIcon tone="warn">⏱</MiniIcon>}
          title="Waiting time above threshold"
          meta="Milo Bell 18 min (threshold 15) · Dr Houghton running behind"
          right={
            <Pill tone="due-soon" num>
              18m
            </Pill>
          }
        />
        <RowLine
          icon={<MiniIcon tone="info">👥</MiniIcon>}
          title="Thursday PM: no RVN cover in theatre"
          meta="R. Trimmer leave · flagged from rota import"
          right={<Button variant="ack">Assign</Button>}
        />
      </Card>
    </>
  );
}
