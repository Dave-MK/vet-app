import { EscalateButton, FilterChips } from "@/components/interactive";
import {
  Button,
  Card,
  Comfort,
  Concern,
  InfoRow,
  Meta,
  Page,
  PageHead,
  Pill,
  Prov,
  SPLIT,
  STACK,
} from "@/components/ui";
import type { ReactNode } from "react";

export const metadata = { title: "Patient record · Andale Care Hub" };

function TimelineItem({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="relative pb-4 pl-4">
      <span
        aria-hidden="true"
        className="absolute top-1 -left-[18px] size-2.5 rounded-full bg-teal shadow-[0_0_0_4px_var(--color-teal-soft)]"
      />
      <h4 className="mb-1 text-[13.5px]">{title}</h4>
      <p className="text-xs leading-relaxed text-muted">{children}</p>
    </div>
  );
}

export default function PatientPage() {
  return (
    <Page>
      <PageHead
        title="Patient record"
        lede="Shared clinical and operational view. Every fact shows where it came from — staff never guess which system to correct."
        actions={
          <>
            <Pill tone="info">Merlin-linked ✓ synced 09:30</Pill>
            <Button variant="primary">+ New encounter</Button>
          </>
        }
      />

      <div className={SPLIT}>
        <div className={STACK}>
          <Card>
            <div className="flex flex-wrap items-center gap-4">
              <div
                aria-hidden="true"
                className="relative grid size-[78px] shrink-0 place-items-center rounded-3xl bg-linear-to-br from-[#e4f4f0] to-[#bfe3dc] text-[42px] shadow-[inset_0_0_0_1px_rgb(28_136_128_/_0.14),0_8px_20px_rgb(28_136_128_/_0.14)]"
              >
                🐶
                <small className="absolute -right-1.5 -bottom-1.5 rounded-xs bg-navy px-1.5 py-0.5 text-[9px] font-bold text-white">
                  photo
                </small>
              </div>
              <div>
                <h2 className="text-[19px] text-navy sm:text-2xl">Daisy Carter</h2>
                <p className="my-1 text-[13.5px] text-muted">
                  Golden Retriever · Female neutered · 5y 2m ·{" "}
                  <span className="tabular-nums">28.4 kg</span>
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Pill tone="ok">PHC Plus</Pill>
                  <Pill tone="warn">⚠ Nervous near larger dogs</Pill>
                  <Pill tone="plain">NKA ✓</Pill>
                </div>
              </div>
            </div>
            <div className="mt-3.5 flex flex-wrap gap-2">
              <Button>Book</Button>
              <Button>Message</Button>
              <Button>+ Task</Button>
              <EscalateButton variant="danger" />
            </div>
          </Card>

          <Card title="Core details" aside={<Button>Edit</Button>} bodyClassName="grid gap-3">
            <InfoRow label="Client">
              Emma Carter <Prov source="pms">Merlin</Prov>
            </InfoRow>
            <InfoRow label="Household">
              1 other pet — Biscuit (cat) · no balance owing <Prov source="pms">Merlin</Prov>
            </InfoRow>
            <InfoRow label="Microchip">
              <span className="tabular-nums">985141000742618</span> <Prov source="pms">Merlin</Prov>
            </InfoRow>
            <InfoRow label="Weight">
              <span className="tabular-nums">28.4 kg · 18 Mar 2026</span>{" "}
              <Pill tone="due-soon" small>
                4 months old — recheck
              </Pill>
            </InfoRow>
            <InfoRow label="Allergies">
              No known allergies — asked &amp; confirmed 12 Jun 2026 · G. Tunney MRCVS{" "}
              <Prov>Care Hub</Prov>
            </InfoRow>
            <InfoRow label="Medication">
              Apoquel 16 mg OD · prescriber Dr Tunney · authorised 03 Jul 2026{" "}
              <Pill tone="due-soon" small>
                review before next repeat
              </Pill>
            </InfoRow>
            <InfoRow label="Insurance">
              Petplan · verified 03 Jul 2026 by S. Coles <Prov>Care Hub</Prov>
            </InfoRow>
          </Card>

          <Card title="Comfort profile" aside={<Button>+ Entry</Button>}>
            <Comfort>
              ✓ Food motivated
              <Meta>12 Jun 2026 · RVN Sharrock</Meta>
            </Comfort>
            <Comfort>
              ✓ Prefers owner present
              <Meta>12 Jun 2026 · RVN Sharrock</Meta>
            </Comfort>
            <Comfort tone="warn">
              ⚠ Nervous near larger dogs — book quiet waiting area
              <Meta>21 May 2026 · N. Gillan · surfaced at check-in ✓</Meta>
            </Comfort>
            <Comfort>
              ✓ Settles on non-slip mat
              <Meta>12 Jun 2026 · RVN Sharrock</Meta>
            </Comfort>
          </Card>
        </div>

        <div className={STACK}>
          <Card title="Clinical summary" aside={<Pill tone="warn">Skin review due</Pill>}>
            <Concern>
              <b className="text-alert">Active concern:</b> recurrent allergic dermatitis — review
              Apoquel response, check ears and paws.
              <Meta>
                Raised 12 Jun 2026 · Dr Tunney · linked task: &ldquo;Derm review&rdquo; → Dr Crook,
                today · review or resolve at next consult
              </Meta>
            </Concern>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { label: "Last consult", value: "12 Jun 2026" },
                { label: "Vaccination due", value: "19 Jul 2027" },
                { label: "Open tasks", value: "2 →" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="block w-full rounded-2xl border border-line bg-card px-4 py-[15px] text-left shadow-flat transition hover:border-teal-line hover:shadow-card"
                >
                  <div className="text-[12.5px] font-semibold text-muted">{item.label}</div>
                  <div className="mt-1.5 font-extrabold tabular-nums">{item.value}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card
            title="Timeline"
            aside={<FilterChips chips={["All", "Clinical", "Meds", "Comms", "Admin"]} />}
            bodyClassName="relative pl-5 before:absolute before:top-2 before:bottom-2 before:left-[27px] before:w-0.5 before:bg-linear-to-b before:from-teal-line before:to-line before:content-['']"
          >
            <TimelineItem
              title={
                <>
                  💉 Vaccination + health check <Prov>Care Hub</Prov>
                </>
              }
            >
              Today 09:20 (in progress) · Dr Crook · quiet room used per comfort profile.
            </TimelineItem>
            <TimelineItem
              title={
                <>
                  💊 Apoquel repeat authorised <Prov source="pms">Merlin</Prov>
                </>
              }
            >
              03 Jul 2026 · Dr Tunney · 30 tablets · <b>review required before next repeat</b>.
            </TimelineItem>
            <TimelineItem
              title={
                <>
                  🩺 Dermatology consultation <Prov source="pms">Merlin</Prov>
                </>
              }
            >
              12 Jun 2026 · Dr Tunney · paw licking + erythema, Apoquel commenced, NKA confirmed.
            </TimelineItem>
            <TimelineItem
              title={
                <>
                  ✉ Client message <Prov>Care Hub</Prov>
                </>
              }
            >
              11 Jun 2026 · Emma uploaded paw photographs, requested appointment · handled by S. Coles.
            </TimelineItem>
            <TimelineItem
              title={
                <>
                  ⚖ Weight recorded <Prov source="pms">Merlin</Prov>
                </>
              }
            >
              18 Mar 2026 · 28.4 kg (stable vs 28.1 kg Nov 2025).
            </TimelineItem>
            <div className="pl-4">
              <Button>Load earlier ↓</Button>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
