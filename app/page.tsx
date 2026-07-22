import { redirect } from "next/navigation";

/** The hub has no separate landing screen — everyone starts on Today. */
export default function Home() {
  redirect("/today");
}
