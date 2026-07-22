import {
  Button,
  Card,
  InfoRow,
  ItemMeta,
  ItemTitle,
  MiniIcon,
  Page,
  PageHead,
  Pill,
  Prov,
  RX_GRID,
  RowLine,
  RowRight,
  Subtle,
} from "@/components/ui";
import { cn } from "@/lib/cn";

export const metadata = { title: "Repeat prescriptions · Andale Care Hub" };

const PIPELINE = [
  { stage: "Received", count: 4 },
  { stage: "Awaiting review", count: 3, hot: true },
  { stage: "More info needed", count: 1 },
  { stage: "Approved", count: 2 },
  { stage: "Being prepared", count: 2 },
  { stage: "Ready", count: 6 },
  { stage: "Collected today", count: 5 },
];

export default function RxPage() {
  return (
    <Page>
      <PageHead
        title="Repeat prescriptions"
        lede="One queue, visible to reception and vets, with the clinical gates and the 48-hour service target on every request."
        actions={<Pill tone="plain">avg turnaround this month: 31h</Pill>}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {PIPELINE.map((item) => (
          <div
            key={item.stage}
            className={cn(
              "min-w-24 flex-auto rounded-lg border px-3.5 py-2.5 text-[11.5px] font-bold text-muted shadow-flat",
              item.hot ? "border-alert-line bg-linear-to-b from-white to-alert-soft" : "border-line bg-white",
            )}
          >
            {item.stage}
            <b
              className={cn(
                "mt-0.5 block text-lg tracking-tight tabular-nums",
                item.hot ? "text-alert" : "text-ink",
              )}
            >
              {item.count}
            </b>
          </div>
        ))}
      </div>

      <div className={RX_GRID}>
        <Card title="Awaiting vet review" as="h2" aside={<Pill tone="warn">3 · oldest 26h of 48h</Pill>}>
          {/* the selected request, mirrored in the review panel */}
          <div className="-mx-2.5 flex flex-wrap items-start gap-2.5 rounded-md bg-teal-soft px-2.5 py-2.5 sm:flex-nowrap">
            <MiniIcon>💊</MiniIcon>
            <div className="min-w-0 basis-[60%] sm:basis-auto">
              <ItemTitle>Tilly Shaw — Metacam 1.5 mg/ml oral susp.</ItemTitle>
              <ItemMeta>Requested 20 Jul 09:30 via phone · selected below</ItemMeta>
            </div>
            <RowRight>
              <Pill tone="due-soon" num>
                26h
              </Pill>
            </RowRight>
          </div>

          <RowLine
            icon={<MiniIcon>💊</MiniIcon>}
            title="Oscar Hall — Vetmedin 5 mg"
            meta="Requested 20 Jul 14:10 via web form · last exam 02 Jun 2026 ✓"
            right={
              <>
                <Pill tone="due" num>
                  19h
                </Pill>
                <Button variant="ack">Review</Button>
              </>
            }
          />
          <RowLine
            icon={<MiniIcon>💊</MiniIcon>}
            title={
              <>
                Bruno Kelly — Ronaxan 100 mg{" "}
                <Pill tone="alert" small>
                  antimicrobial
                </Pill>
              </>
            }
            meta="Requested today 08:15 · physical exam gate applies"
            right={
              <>
                <Pill tone="due" num>
                  1h
                </Pill>
                <Button variant="ack">Review</Button>
              </>
            }
          />
        </Card>

        <Card title="Vet review — Tilly Shaw" aside={<Pill tone="plain">Terrier · 9y · 7.2 kg</Pill>}>
          <div className="text-[15px] font-extrabold">Metacam 1.5 mg/ml — 0.35 ml OD with food</div>
          <div className="my-2 flex flex-wrap gap-1.5">
            <Pill tone="info">POM-V</Pill>
            <Pill tone="plain">NSAID — long-term</Pill>
            <Pill tone="plain">not a controlled drug</Pill>
          </div>

          <div className="my-3 grid gap-3">
            <InfoRow label="Last clinical assessment">
              14 Feb 2026 · physical exam · Dr Tunney{" "}
              <Pill tone="overdue" small>
                157 days — practice limit 180
              </Pill>
            </InfoRow>
            <InfoRow label="Monitoring">
              Renal bloods due — last 14 Feb 2026{" "}
              <Pill tone="due-soon" small>
                recommend before next repeat
              </Pill>
            </InfoRow>
            <InfoRow label="Repeats used">
              <span className="tabular-nums">4 of 6 authorised</span>
            </InfoRow>
            <InfoRow label="Stock">
              In stock — dispensary ✓ <Prov source="pms">Merlin</Prov>
            </InfoRow>
          </div>

          <Subtle className="leading-relaxed">
            Gate: assessment within practice review window, but monitoring bloods are older than
            recommended for long-term NSAID use. Options below record the decision and reason against
            the authorisation.
          </Subtle>

          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="primary" className="grow sm:grow-0">
              Approve — 1 repeat
            </Button>
            <Button className="grow sm:grow-0">Approve + book bloods</Button>
            <Button className="grow sm:grow-0">More info</Button>
            <Button variant="danger" className="grow sm:grow-0">
              Decline — needs exam
            </Button>
          </div>
        </Card>
      </div>
    </Page>
  );
}
