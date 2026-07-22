import { Empty, Page, PageHead } from "@/components/ui";

export const metadata = { title: "Administration · Andale Care Hub" };

export default function AdministrationPage() {
  return (
    <Page>
      <PageHead
        title="Administration"
        lede="Practice Director only. Escalation ladders, SLA thresholds and exception rules are configured here."
      />
      <Empty>Not designed yet — the rules behind the director&rsquo;s exception list live here.</Empty>
    </Page>
  );
}
