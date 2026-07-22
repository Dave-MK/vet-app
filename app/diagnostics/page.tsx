import { Empty, Page, PageHead } from "@/components/ui";

export const metadata = { title: "Diagnostics · Andale Care Hub" };

export default function DiagnosticsPage() {
  return (
    <Page>
      <PageHead
        title="Diagnostics"
        lede="Not designed yet. Results currently reach the team through the Today board and the task queue — see the abnormal-result escalation on Today."
      />
      <Empty>
        Nothing here until in-house and external lab routing is scoped (discovery Part 7).
      </Empty>
    </Page>
  );
}
