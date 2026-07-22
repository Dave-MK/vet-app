"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  Button,
  Field,
  HandoverItem,
  Input,
  RoutePreview,
  Select,
  Subtle,
  Textarea,
  buttonStyles,
} from "@/components/ui";

type Severity = "Concern" | "Urgent" | "Emergency";

/** Centred dialog on a desktop, bottom sheet on a phone. */
function Overlay({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-60 grid animate-[page-in_0.18s_var(--ease-hub)] place-items-end justify-stretch bg-[#0b1628]/55 backdrop-blur-[3px] sm:place-items-center sm:p-5"
    >
      <div className="scroll-slim max-h-[92dvh] w-full animate-sheet overflow-auto rounded-t-3xl bg-white shadow-modal sm:max-h-[min(90vh,900px)] sm:max-w-[560px] sm:animate-rise sm:rounded-3xl">
        {children}
      </div>
    </div>
  );
}

function ModalHead({
  id,
  title,
  onClose,
}: {
  id: string;
  title: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="sticky top-0 z-1 flex items-center justify-between gap-3 border-b border-line bg-white px-5 py-4">
      <h3 id={id} className="text-[16.5px] text-navy">
        {title}
      </h3>
      <button className={buttonStyles.icon} onClick={onClose} aria-label="Close">
        ✕
      </button>
    </div>
  );
}

function ModalFoot({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 flex flex-col-reverse justify-end gap-2.5 border-t border-line bg-white px-5 py-3.5 pb-[max(14px,env(safe-area-inset-bottom))] sm:flex-row sm:flex-wrap sm:pb-3.5 [&>button]:w-full sm:[&>button]:w-auto">
      {children}
    </div>
  );
}

export function EscalationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [severity, setSeverity] = useState<Severity>("Urgent");

  return (
    <Overlay open={open} onClose={onClose} labelledBy="escTitle">
      <ModalHead id="escTitle" title="▲ Raise escalation" onClose={onClose} />
      <div className="px-5 py-4">
        <Field label="Patient" htmlFor="esc-patient">
          <Input id="esc-patient" defaultValue="Nala — Maine Coon · Kennel 3" />
        </Field>
        <Field label="Reason" htmlFor="esc-reason">
          <Select id="esc-reason" defaultValue="Clinical deterioration">
            <option>Clinical deterioration</option>
            <option>Medication or dosage concern</option>
            <option>Unexpected test result</option>
            <option>Estimate exceeded</option>
            <option>Client dissatisfaction</option>
            <option>Graduate / student support needed</option>
            <option>Other (describe below)</option>
          </Select>
        </Field>
        <Field label="Severity">
          <div className="mt-1.5 flex flex-wrap gap-2">
            {(["Concern", "Urgent", "Emergency"] as Severity[]).map((level) => (
              <button
                key={level}
                aria-pressed={severity === level}
                onClick={() => setSeverity(level)}
                className={cn(
                  "flex-[1_1_100%] rounded-[11px] border p-2.5 text-center text-[13px] font-extrabold transition sm:flex-[1_1_110px]",
                  severity === level
                    ? "border-alert-line bg-alert-soft text-alert"
                    : "border-line bg-white hover:border-[#cdd8e4]",
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Note" htmlFor="esc-note">
          <Textarea
            id="esc-note"
            defaultValue="Temp 37.6 and trending down 30 min post-imaging. Warming in place. Please review."
          />
        </Field>
        <RoutePreview>
          <b>Route ({severity.toLowerCase()}):</b> Dr Houghton (responsible vet) — notified
          immediately
          <br />
          <b>Unacknowledged 5 min →</b> Dr Crook (senior vet)
          <br />
          <b>Unacknowledged 10 min →</b> all clinical staff + Head RVN
          <br />
          <b>Logged:</b> raise, every acknowledgement and the resolution, on the patient record
        </RoutePreview>
      </div>
      <ModalFoot>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onClose}>
          ▲ Raise escalation
        </Button>
      </ModalFoot>
    </Overlay>
  );
}

export function SignModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Overlay open={open} onClose={onClose} labelledBy="signTitle">
      <ModalHead id="signTitle" title="Review & sign — Daisy Carter" onClose={onClose} />
      <div className="px-5 py-4">
        <Subtle>
          <b>1 · AI-drafted content in this note</b> — confirm you have reviewed the differences:
        </Subtle>
        <div className="mt-2 mb-1.5 rounded-[9px] bg-[#f1ecfd] px-2.5 py-2 text-xs leading-relaxed">
          <b>AI draft:</b> &ldquo;…paw licking has returned. No missed doses.&rdquo;
        </div>
        <div className="mb-1.5 rounded-[9px] bg-ok-soft px-2.5 py-2 text-xs leading-relaxed">
          <b>Your version:</b> &ldquo;…paw licking has returned <b>over ~2 weeks</b>. No missed doses{" "}
          <b>reported</b>.&rdquo;
        </div>
        <Subtle className="mt-3 mb-2">
          <b>2 · Attestation</b>
        </Subtle>
        <HandoverItem>
          I confirm this record is accurate, that examination findings were entered or dictated by me,
          and that AI-drafted content has been reviewed and edited where required. —{" "}
          <b>C. Crook MRCVS</b>
        </HandoverItem>
        <Subtle className="mt-3 mb-2">
          <b>3 · Before this consult closes</b> — choose at least one:
        </Subtle>
        <div className="grid gap-[7px]">
          {[
            { label: "Create task: chase cytology result — Dr Crook, due Thu", checked: true },
            { label: "Book recheck: 2 weeks — reception queue", checked: true },
            { label: "Callback: cytology result to Emma Carter when reviewed", checked: false },
            { label: "No follow-up needed — record why", checked: false },
          ].map((option) => (
            <label
              key={option.label}
              className="flex cursor-pointer items-center gap-2.5 rounded-[11px] border border-line bg-white px-3 py-2.5 text-[13px] transition hover:border-[#cdd8e4]"
            >
              <input
                type="checkbox"
                defaultChecked={option.checked}
                className="size-[17px] shrink-0 accent-teal"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      <ModalFoot>
        <Button onClick={onClose}>Back to note</Button>
        <Button variant="primary" onClick={onClose}>
          Sign record ✓
        </Button>
      </ModalFoot>
    </Overlay>
  );
}
