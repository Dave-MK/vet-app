import { ConsultQueue, SignButton } from "@/components/interactive";
import {
  Button,
  CONSULT_GRID,
  Card,
  Page,
  PageHead,
  PhaseBanner,
  Pill,
  Prov,
  Textarea,
  ZoneLabel,
  inputStyles,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export const metadata = { title: "Consultation workspace · Andale Care Hub" };

const QUEUE = [
  { name: "Daisy Carter", detail: "09:20 · vacc + skin · in room 11m" },
  { name: "Barney Green", detail: "10:00 · skin review" },
  { name: "Luna Price", detail: "10:20 · dental check" },
  { name: "Frankie Wood", detail: "10:40 · lameness recheck" },
  { name: "Oscar Hall", detail: "11:00 · medication review" },
];

function FormSection({
  label,
  htmlFor,
  children,
}: {
  label: ReactNode;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="mb-2 block text-[12.5px] font-extrabold text-ink-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function ExamTile({
  label,
  children,
  empty,
}: {
  label: ReactNode;
  children: ReactNode;
  empty?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-2.5 text-xs leading-snug",
        empty ? "border-dashed border-line bg-white text-muted" : "border-line bg-card-2",
      )}
    >
      <strong className="mb-1 block">{label}</strong>
      {children}
    </div>
  );
}

/** A card the scribe drafted. White on the dark panel so it reads as "for your note". */
function Fact({
  title,
  children,
  source,
  actions,
}: {
  title: ReactNode;
  children?: ReactNode;
  source?: ReactNode;
  actions?: string[];
}) {
  return (
    <div className="mb-2 rounded-lg bg-white p-3 text-ink shadow-flat">
      <strong className="block text-[13px]">{title}</strong>
      {children ? <p className="my-1.5 text-[11.5px] leading-relaxed text-muted">{children}</p> : null}
      {source ? <div className="mb-2 flex flex-wrap items-center gap-1.5">{source}</div> : null}
      {actions ? (
        <div className="flex flex-wrap gap-1.5">
          {actions.map((action) => (
            <button
              key={action}
              className="rounded-[9px] border border-line bg-card-2 px-2.5 py-1.5 text-[11px] font-bold transition hover:border-[#cdd8e4] hover:bg-white"
            >
              {action}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ConsultPage() {
  return (
    <Page>
      <PhaseBanner>
        PHASE 3 CONCEPT — this workspace assumes clinical notes are mastered in Care Hub, which the
        Andale deployment cannot do before integration Gate G1. Kept for design continuity; not in the
        internal MVP. See discovery Part 10.
      </PhaseBanner>

      <PageHead
        title="Consultation workspace"
        lede="Structured notes with an optional scribe that drafts, shows its uncertainty, and waits for a qualified human."
        actions={<Pill tone="warn">Draft — autosaved 14s ago</Pill>}
      />

      <div className={CONSULT_GRID}>
        <Card
          title="My queue"
          aside={
            <Pill tone="brand" num>
              5 left
            </Pill>
          }
        >
          <ConsultQueue items={QUEUE} />
        </Card>

        <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-line-soft bg-linear-to-b from-white to-card-2 px-3.5 py-3.5 sm:px-[17px]">
            <div>
              <h3 className="mb-1.5 text-[15.5px] text-navy">Daisy Carter</h3>
              <div className="flex flex-wrap gap-1.5">
                <Pill tone="plain" num>
                  28.4 kg
                </Pill>
                <Pill tone="plain">NKA ✓ 12 Jun 26</Pill>
                <Pill tone="info">Apoquel 16 mg OD</Pill>
                <Pill tone="warn">⚠ nervous of large dogs</Pill>
              </div>
            </div>
            <Pill tone="warn">Draft</Pill>
          </div>

          <div className="px-3.5 py-4 sm:px-[17px]">
            <FormSection
              label={
                <>
                  Presenting concern <Prov>Typed · reception</Prov>
                </>
              }
            >
              <div className={inputStyles}>
                Annual vaccination. Owner also reports increased paw licking over the last two weeks.
              </div>
            </FormSection>

            <FormSection
              htmlFor="history"
              label={
                <>
                  Clinical history <Prov source="ai">AI draft — accepted, edited</Prov>
                </>
              }
            >
              <Textarea
                id="history"
                defaultValue="Eating and drinking normally. No vomiting or diarrhoea. Apoquel reduced general itching but paw licking has returned over ~2 weeks. No missed doses reported."
              />
            </FormSection>

            <FormSection
              label={
                <>
                  Examination{" "}
                  <span className="text-[13px] font-normal text-muted">
                    — entered by clinician only; the scribe cannot write here
                  </span>
                </>
              }
            >
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3">
                <ExamTile
                  label={
                    <>
                      Weight <Prov>Device</Prov>
                    </>
                  }
                >
                  <span className="tabular-nums">28.4 kg</span>
                </ExamTile>
                <ExamTile
                  label={
                    <>
                      Temperature <Prov>Typed</Prov>
                    </>
                  }
                >
                  <span className="tabular-nums">38.4 °C</span>
                </ExamTile>
                <ExamTile
                  label={
                    <>
                      Heart rate <Prov>Typed</Prov>
                    </>
                  }
                >
                  <span className="tabular-nums">88 bpm</span>
                </ExamTile>
                <ExamTile
                  label={
                    <>
                      Ears <Prov>Dictated</Prov>
                    </>
                  }
                >
                  Mild erythema, both
                </ExamTile>
                <ExamTile
                  label={
                    <>
                      Paws <Prov>Dictated</Prov>
                    </>
                  }
                >
                  Interdigital erythema
                </ExamTile>
                <ExamTile empty label="Abdomen">
                  Not examined / not recorded
                </ExamTile>
              </div>
            </FormSection>

            <FormSection
              htmlFor="plan"
              label={
                <>
                  Assessment &amp; plan <Prov>Typed</Prov>
                </>
              }
            >
              <Textarea
                id="plan"
                defaultValue="Vaccination administered. Likely recurrence of allergic dermatitis. Cytology offered and accepted — estimate discussed and logged. Continue Apoquel pending results. Review if worsening or secondary infection suspected."
              />
            </FormSection>

            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <span className="text-[13px] text-muted">
                Estimate logged: cytology £62 ✓ · consent: verbal, recorded
              </span>
              <div className="flex flex-wrap gap-2">
                <Button>Save draft</Button>
                <SignButton />
              </div>
            </div>
          </div>
        </div>

        <div className="self-start overflow-hidden rounded-2xl bg-linear-170 from-navy-2 via-navy to-navy-deep via-55% text-white shadow-lift lg:col-span-full 2xl:col-span-1">
          <div className="sticky top-0 z-2 flex flex-wrap items-center gap-2 border-b border-white/15 bg-navy-2 px-3.5 py-3">
            <span
              aria-hidden="true"
              className="size-[9px] shrink-0 animate-rec rounded-full bg-[#f0716e] shadow-[0_0_0_5px_rgb(240_113_110_/_0.15)]"
            />
            <b className="text-xs tabular-nums">REC 08:42</b>
            <Button variant="ctrl">‖ Pause</Button>
            <Button variant="ctrl">■ Stop</Button>
            <Button variant="ctrl">⚑ Mark</Button>
            <Button variant="ctrl">🎙 Dictate</Button>
            <button className="ml-auto rounded-full border border-[#69d29b]/40 bg-[#69d29b]/15 px-2.5 py-1 text-[11px] font-bold text-[#8fe2b6]">
              Consent ✓ · view basis
            </button>
          </div>

          <div className="px-3.5 py-3.5">
            <ZoneLabel>Transcript</ZoneLabel>
            <div className="scroll-slim max-h-[min(40vh,180px)] overflow-auto rounded-lg border border-white/10 bg-white/8 p-3 text-xs leading-loose text-[#e6edf5]">
              <b className="text-[#83ddd0]">Client:</b> She has started licking her paws again, mostly
              in the evenings.
              <br />
              <br />
              <b className="text-[#83ddd0]">Vet:</b> Has she missed any Apoquel doses?
              <br />
              <br />
              <b className="text-[#83ddd0]">Client:</b> No, she has had it every day.
              <br />
              <br />
              <b className="text-[#83ddd0]">Vet:</b> I can see some redness between the toes.
              I&rsquo;d like to take a{" "}
              <span
                title="Low confidence — tap to correct"
                className="cursor-help border-b-2 border-dotted border-[#f2b75b] text-[#f7d9a1]"
              >
                sample for cytology
              </span>{" "}
              to check for yeast or bacteria.
            </div>

            <ZoneLabel>Drafted for your note</ZoneLabel>
            <Fact
              title="History summary"
              source={
                <>
                  <Pill tone="ok" small>
                    high confidence
                  </Pill>
                  <Prov>from 06:12–06:58</Prov>
                </>
              }
              actions={["Accept", "Edit", "Reject"]}
            >
              Increased paw licking ~2 weeks despite consistent Apoquel. Otherwise well at home.
            </Fact>
            <Fact
              title="Medication mention"
              source={
                <>
                  <Pill tone="warn" small>
                    verify — medication
                  </Pill>
                  <Prov>from 06:31</Prov>
                </>
              }
              actions={["Accept", "Edit", "Reject"]}
            >
              &ldquo;Apoquel every day, no missed doses&rdquo; — owner statement.
            </Fact>

            <ZoneLabel>Clinical considerations — advisory only</ZoneLabel>
            <div className="mb-2 rounded-lg border border-[#ecd9b4] bg-[#fdf8ef] p-3 text-ink">
              <strong className="flex items-center gap-1.5 text-[13px]">
                ⚖ Consider interdigital cytology
              </strong>
              <p className="my-1.5 text-[11.5px] leading-relaxed text-[#6b5d40]">
                Recurrent pruritus despite oclacitinib may indicate secondary infection.
              </p>
              <details className="my-2 text-[11.5px] text-[#57534a]">
                <summary className="cursor-pointer font-extrabold text-[#8a6d2f]">
                  Why is this shown? What was checked?
                </summary>
                <ul className="mt-2 list-disc pl-4 leading-loose">
                  <li>
                    <b>Inputs:</b> transcript mentions of paw licking + current Apoquel from record
                  </li>
                  <li>
                    <b>Checked:</b> current meds (no interaction), NKA status ✓
                  </li>
                  <li>
                    <b>Not checked:</b> examination findings (not yet signed), renal/hepatic status
                  </li>
                  <li>
                    <b>Source:</b> practice dermatology protocol v3 (approved Dr Crook, May 2026)
                  </li>
                  <li>
                    <b>Uncertainty:</b> moderate — based on spoken findings only
                  </li>
                  <li>
                    <b>Still required:</b> your examination, client consent, estimate
                  </li>
                </ul>
              </details>
              <div className="flex flex-wrap gap-1.5">
                <button className="rounded-[9px] border border-line bg-card-2 px-2.5 py-1.5 text-[11px] font-bold hover:bg-white">
                  Use in plan (logged)
                </button>
                <button className="rounded-[9px] border border-line bg-card-2 px-2.5 py-1.5 text-[11px] font-bold hover:bg-white">
                  Dismiss (logged)
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-dashed border-white/25 bg-white/8 p-3 text-[#c9d6e4]">
              <strong className="block text-[13px]">Never generated here</strong>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#9fb0c2]">
                Examination findings · doses · diagnoses · client-facing content. Dose{" "}
                <i>cross-checks</i> appear as warnings only.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 border-t border-white/12 px-3.5 py-2.5 text-[10px] text-[#8fa3b8]">
            <span>scribe-v2.4.1</span>
            <span>template derm-v3</span>
            <span>draft #a41f</span>
            <span>consent: verbal · N. Gillan 09:19</span>
          </div>
        </div>
      </div>
    </Page>
  );
}
