import { RedFlagList } from "@/components/interactive";
import {
  Card,
  Field,
  INTAKE_GRID,
  Input,
  MiniIcon,
  Page,
  PageHead,
  Pill,
  Prov,
  RoutePreview,
  RowLine,
  STACK,
  Textarea,
} from "@/components/ui";

export const metadata = { title: "Intake · Andale Care Hub" };

/** Seeded from Andale's own critical-conditions list. Operational, not diagnostic. */
const SAFETY_QUESTIONS = [
  "Collapsed, unconscious or unresponsive",
  "Breathing difficulty, choking or repeated seizures",
  "Uncontrolled bleeding or deep wound",
  "Swallowed object or toxin (raisins, rat poison, antifreeze…)",
  "Unable to urinate (especially male cats)",
  "Severe vomiting/diarrhoea — 5+ episodes in 12h or blood",
  "Struggling to give birth / abnormal discharge",
  "Swollen abdomen or retching (especially large dogs)",
];

export default function IntakePage() {
  return (
    <Page>
      <PageHead
        title="Phone & walk-in intake"
        lede="Capture the reason in under a minute. Red flags escalate to the clinical team — reception never diagnoses and the system never reassures."
        actions={<Pill tone="plain">☎ line 1 active · 02:41</Pill>}
      />

      <div className={INTAKE_GRID}>
        <Card
          title="New contact"
          as="h2"
          aside={<span className="text-[13px] text-muted">started 09:31 · N. Gillan</span>}
        >
          <Field label="Client / patient" htmlFor="in-client">
            <Input id="in-client" defaultValue="Bell, James — Milo (cat, 4y) ✓ matched" />
            <div className="mt-1.5">
              <Prov source="pms">Merlin · synced 09:31</Prov>
            </div>
          </Field>

          <Field label="Reason for contact" htmlFor="in-reason">
            <Textarea
              id="in-reason"
              defaultValue="Milo vomited three times since last night. Keeping water down this morning. Owner worried, asking if he should be seen today."
            />
          </Field>

          <RedFlagList questions={SAFETY_QUESTIONS} />
        </Card>

        <div className={STACK}>
          <Card title="Escalation preview" aside={<Pill tone="plain">sends to duty clinician</Pill>}>
            <RoutePreview>
              <b>Route:</b> Duty vet — Dr Houghton (in consult)
              <br />
              <b>If unacknowledged 5 min:</b> → Dr Crook
              <br />
              <b>If unacknowledged 10 min:</b> → all clinical staff
              <br />
              <b>Attached:</b> contact note, safety answers, client phone
            </RoutePreview>
          </Card>

          <Card
            title="Today's intake log"
            aside={
              <Pill tone="plain" num>
                14
              </Pill>
            }
          >
            <RowLine
              icon={<MiniIcon>☎</MiniIcon>}
              title="Tilly Shaw — Metacam repeat"
              meta="09:18 · D. Shelbourne · → Rx queue"
              right={<Pill tone="ok">Done</Pill>}
            />
            <RowLine
              icon={<MiniIcon>☎</MiniIcon>}
              title="New client enquiry — rabbit"
              meta="09:05 · S. Greenwood · → registration link sent"
              right={<Pill tone="ok">Done</Pill>}
            />
            <RowLine
              icon={<MiniIcon>☎</MiniIcon>}
              title="Rex Palmer — weight clinic query"
              meta="08:52 · N. Gillan · → booked 11:00"
              right={<Pill tone="ok">Done</Pill>}
            />
          </Card>
        </div>
      </div>
    </Page>
  );
}
