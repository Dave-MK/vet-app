"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STAFF, type Role, type StaffMember } from "@/lib/nav";
import { EscalationModal, SignModal } from "@/components/modals";

/* ------------------------------------------------------------------
   Demo role switching. In the real product this comes from the session;
   here it drives which Today variant renders and which nav items exist.
   ------------------------------------------------------------------ */

type RoleContextValue = {
  role: Role;
  setRole: (role: Role) => void;
  user: StaffMember;
};

const RoleContext = createContext<RoleContextValue | null>(null);

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside <Providers>");
  return ctx;
}

/* ------------------------------------------------------------------
   Escalation and sign-off are reachable from every screen, so both
   dialogs live at the root and screens just ask for them by name.
   ------------------------------------------------------------------ */

type Dialog = "escalation" | "sign" | null;

type DialogContextValue = {
  open: Dialog;
  openDialog: (dialog: Exclude<Dialog, null>) => void;
  closeDialog: () => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used inside <Providers>");
  return ctx;
}

export function Providers({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("reception");
  const [open, setOpen] = useState<Dialog>(null);

  const openDialog = useCallback((dialog: Exclude<Dialog, null>) => setOpen(dialog), []);
  const closeDialog = useCallback(() => setOpen(null), []);

  // Esc closes whichever dialog is showing
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDialog();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeDialog]);

  const roleValue = useMemo(() => ({ role, setRole, user: STAFF[role] }), [role]);
  const dialogValue = useMemo(() => ({ open, openDialog, closeDialog }), [open, openDialog, closeDialog]);

  return (
    <RoleContext.Provider value={roleValue}>
      <DialogContext.Provider value={dialogValue}>
        {children}
        <EscalationModal open={open === "escalation"} onClose={closeDialog} />
        <SignModal open={open === "sign"} onClose={closeDialog} />
      </DialogContext.Provider>
    </RoleContext.Provider>
  );
}
