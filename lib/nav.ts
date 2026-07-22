export type Role = "reception" | "vet" | "nurse" | "director";

export type StaffMember = {
  name: string;
  role: string;
  initials: string;
};

export const STAFF: Record<Role, StaffMember> = {
  reception: { name: "Natalie Gillan", role: "Head Receptionist", initials: "NG" },
  vet: { name: "Matthew Houghton", role: "Veterinary Surgeon", initials: "MH" },
  nurse: { name: "Catherine Dixon", role: "Head RVN", initials: "CD" },
  director: { name: "Debbie Roden", role: "Practice Director", initials: "DR" },
};

export const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "reception", label: "Natalie G · Head Receptionist" },
  { value: "vet", label: "Matthew H · Veterinary Surgeon" },
  { value: "nurse", label: "Catherine D · Head RVN" },
  { value: "director", label: "Debbie R · Practice Director" },
];

export type NavItem = {
  href: string;
  icon: string;
  label: string;
  /** unresolved-work badge */
  count?: number;
  /** roadmap marker, e.g. PHASE 3 */
  flag?: string;
  /** when set, only these roles see the item */
  roles?: Role[];
};

export const NAV: NavItem[] = [
  { href: "/today", icon: "⌂", label: "Today" },
  { href: "/tasks", icon: "✓", label: "Tasks & Handover", count: 2 },
  { href: "/intake", icon: "☎", label: "Intake" },
  { href: "/patient", icon: "🐕", label: "Clients & Patients" },
  { href: "/rx", icon: "Rx", label: "Prescriptions", count: 3 },
  { href: "/hospital", icon: "▦", label: "Hospital" },
  { href: "/consult", icon: "✚", label: "Consultation", flag: "PHASE 3" },
  { href: "/diagnostics", icon: "◫", label: "Diagnostics" },
  { href: "/administration", icon: "⚙", label: "Administration", roles: ["director"] },
];
