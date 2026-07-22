"use client";

import { useRole } from "@/components/providers";
import { Page } from "@/components/ui";
import { TodayReception } from "@/components/today/reception";
import { TodayVet } from "@/components/today/vet";
import { TodayNurse } from "@/components/today/nurse";
import { TodayDirector } from "@/components/today/director";

/** One shell, four screens. The signed-in role decides which one you land on. */
export default function TodayPage() {
  const { role } = useRole();

  return (
    <Page>
      {role === "reception" ? <TodayReception /> : null}
      {role === "vet" ? <TodayVet /> : null}
      {role === "nurse" ? <TodayNurse /> : null}
      {role === "director" ? <TodayDirector /> : null}
    </Page>
  );
}
