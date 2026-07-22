import { EscalateButton } from "@/components/interactive";
import {
  Button,
  Card,
  DateChip,
  LAYOUT_2,
  LinkButton,
  MiniIcon,
  PageHead,
  Pill,
  RAIL,
  RowLine,
  STACK,
  ZoneLabel,
} from "@/components/ui";

export function TodayNurse() {
  return (
    <>
      <PageHead
        title="Today — Nursing"
        lede="Everything due across the ward, your assigned patients and clinics, and entries awaiting countersign."
        actions={
          <>
            <Pill tone="brand">● Live</Pill>
            <DateChip>Tuesday 21 July 2026 · 09:32</DateChip>
          </>
        }
      />

      <Card className="mb-3.5 xl:mb-[15px]">
        <ZoneLabel muted>Next due across the ward</ZoneLabel>
        <div className={RAIL}>
          <span className="snap-start">
            <Pill tone="overdue" num>
              Archie · fluids 09:25 · +7m
            </Pill>
          </span>
          <span className="snap-start">
            <Pill tone="overdue" num>
              Nala · obs 09:28 · +4m
            </Pill>
          </span>
          <span className="snap-start">
            <Pill tone="due-soon" num>
              Cooper · obs 09:35
            </Pill>
          </span>
          <span className="snap-start">
            <Pill tone="due-soon" num>
              Tilly · meds 09:45
            </Pill>
          </span>
          <span className="snap-start">
            <Pill tone="due" num>
              Bella · pre-med 10:05
            </Pill>
          </span>
        </div>
      </Card>

      <div className={LAYOUT_2}>
        <Card
          title="My patients"
          as="h2"
          aside={
            <LinkButton href="/hospital">Open board</LinkButton>
          }
        >
          <RowLine
            icon={<MiniIcon>🐶</MiniIcon>}
            title="Archie Jones — gastroenteritis"
            meta={
              <>
                Fluids due 09:25 · vet: Dr Crook · <b>escalation open</b>
              </>
            }
            right={
              <>
                <Pill tone="overdue" num>
                  +7m
                </Pill>
                <EscalateButton variant="icon" />
              </>
            }
          />
          <RowLine
            icon={<MiniIcon>🐱</MiniIcon>}
            title="Nala — post-imaging recovery"
            meta="Obs due 09:28 · temp 37.6 ↓ · vet: Dr Houghton"
            right={
              <>
                <Pill tone="overdue" num>
                  +4m
                </Pill>
                <EscalateButton variant="icon" />
              </>
            }
          />
          <RowLine
            icon={<MiniIcon>🐶</MiniIcon>}
            title="Tilly — pancreatitis"
            meta="Meds 09:45 · eating small amounts · vet: Dr Crook"
            right={
              <Pill tone="due-soon" num>
                09:45
              </Pill>
            }
          />
        </Card>

        <div className={STACK}>
          <Card title="Nurse clinics" aside={<Pill tone="plain">4 today</Pill>}>
            <RowLine
              icon={<MiniIcon>🐰</MiniIcon>}
              title="Poppy Moore — nail clip"
              meta="09:40 · waiting · PHC included"
              right={<Pill tone="ok">Checked in</Pill>}
            />
            <RowLine
              icon={<MiniIcon>🐶</MiniIcon>}
              title="Rex Palmer — weight clinic"
              meta="11:00 · 3rd visit"
              right={<Pill tone="plain">Booked</Pill>}
            />
          </Card>

          <Card title="Awaiting countersign" aside={<Pill tone="warn">2 — SVN Lauren</Pill>}>
            <RowLine
              icon={<MiniIcon>✎</MiniIcon>}
              title="Obs entry — Cooper 09:05"
              meta="Draft by SVN Lauren Wright · supervision: you"
              right={<Button variant="ack">Countersign</Button>}
            />
            <RowLine
              icon={<MiniIcon>✎</MiniIcon>}
              title="Feeding record — Tilly 08:50"
              meta="Draft by SVN Lauren Wright"
              right={<Button variant="ack">Countersign</Button>}
            />
          </Card>
        </div>
      </div>
    </>
  );
}
