"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { NAV, ROLE_OPTIONS, type Role } from "@/lib/nav";
import { useDialog, useRole } from "@/components/providers";
import { buttonStyles } from "@/components/ui";
import { cn } from "@/lib/cn";

/** Above this the sidebar is always visible, so the drawer must never be open. */
const RAIL_QUERY = "(min-width:821px)";

/** Page gutter. Repeated on the topbar and the content well so they stay aligned. */
export const GUTTER = "px-[13px] sm:px-4 md:px-[22px] xl:px-[26px] 3xl:px-[34px]";

/* Sidebar internals are hidden in rail mode (821–1024) but shown in the
   drawer and in the full sidebar — hence the md:hidden lg:block pattern. */
const RAIL_HIDDEN = "md:hidden lg:block";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { role, setRole, user } = useRole();
  const { openDialog } = useDialog();

  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const firstNavItem = useRef<HTMLAnchorElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const closeNav = useCallback(() => setNavOpen(false), []);

  // The drawer only exists below 821px — never leave it stuck open on resize.
  useEffect(() => {
    const mq = window.matchMedia(RAIL_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) closeNav();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeNav]);

  // Lock the page behind the drawer so only the drawer scrolls.
  useEffect(() => {
    if (!navOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstNavItem.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previous;
    };
  }, [navOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNav();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeNav]);

  const visibleNav = NAV.filter((item) => !item.roles || item.roles.includes(role));

  return (
    <>
      <div className="grid min-h-dvh grid-cols-1 md:grid-cols-[76px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[256px_minmax(0,1fr)] 3xl:grid-cols-[268px_minmax(0,1fr)]">
        <aside
          id="sidebar"
          className={cn(
            "paw-watermark scroll-slim-light no-print sticky top-0 z-40 flex h-dvh flex-col overflow-y-auto overscroll-contain bg-linear-168 from-navy-2 via-navy to-navy-deep from-0% via-38% px-2.5 pt-4 pb-3 text-white lg:px-3 lg:pt-[18px]",
            // below md the sidebar leaves the flow and slides in as a drawer
            "max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:w-[min(280px,84vw)] max-md:px-3 max-md:transition-transform max-md:duration-[260ms] max-md:ease-hub",
            navOpen
              ? "max-md:translate-x-0 max-md:shadow-drawer"
              : "max-md:-translate-x-[102%]",
          )}
        >
          <div className={cn("flex items-center gap-3 px-2 pt-1 pb-4", "md:justify-center md:px-0 lg:justify-start lg:px-2")}>
            <div
              aria-hidden="true"
              className="grid size-[42px] shrink-0 place-items-center rounded-xl bg-linear-140 from-teal-300 via-teal to-[#1a6f8a] via-62% text-[22px] leading-none shadow-[0_8px_20px_rgb(28_136_128_/_0.42),inset_0_1px_0_rgb(255_255_255_/_0.35)]"
            >
              🐾
            </div>
            <div className={RAIL_HIDDEN}>
              <strong className="block text-[15.5px] tracking-tight">Andale Care Hub</strong>
              <span className="mt-0.5 block text-[10.5px] text-[#9db0c5]">
                Practice operations · concept v2
              </span>
            </div>
          </div>

          <div className="mx-1 mb-3.5 rounded-xl border border-white/15 bg-white/8 p-2.5 md:mx-0 md:p-1.5 lg:mx-1 lg:p-2.5">
            <label
              htmlFor="roleSel"
              className={cn(
                "mb-1.5 block text-[9.5px] font-extrabold tracking-wider text-[#9db0c5] uppercase",
                RAIL_HIDDEN,
              )}
            >
              Viewing as
            </label>
            <select
              id="roleSel"
              aria-label="Switch demo role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value as Role);
                closeNav();
              }}
              className="w-full rounded-md border border-white/20 bg-navy-deep/70 px-2.5 py-2 text-[13px] text-white md:px-1 md:py-1.5 md:text-center md:text-[11px] lg:px-2.5 lg:py-2 lg:text-left lg:text-[13px]"
            >
              {ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#0e2038] text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <nav aria-label="Main" className="flex flex-col gap-[3px]">
            {visibleNav.map((item, i) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={i === 0 ? firstNavItem : undefined}
                  aria-current={active ? "page" : undefined}
                  onClick={closeNav} // the drawer has done its job once you pick a destination
                  className={cn(
                    "relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#c2cfdd] no-underline transition hover:bg-white/10 hover:text-white active:scale-[0.985]",
                    "md:justify-center md:px-0 lg:justify-start lg:px-3 lg:py-2.5",
                    active && "bg-white/12 text-white shadow-[inset_3px_0_0_var(--color-teal-300)]",
                  )}
                >
                  <span aria-hidden="true" className="w-5 shrink-0 text-center text-[15px] md:w-auto">
                    {item.icon}
                  </span>
                  <span className={RAIL_HIDDEN}>{item.label}</span>
                  {item.flag ? (
                    <span
                      className={cn(
                        "ml-auto rounded-xs bg-white/15 px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide text-[#c3d1e0]",
                        RAIL_HIDDEN,
                      )}
                    >
                      {item.flag}
                    </span>
                  ) : null}
                  {item.count ? (
                    <span
                      className={cn(
                        "ml-auto rounded-full bg-alert-solid px-[7px] text-[11px] font-extrabold text-white shadow-badge tabular-nums",
                        "md:absolute md:top-1 md:right-1.5 md:ml-0 md:px-[5px] md:text-[9px] lg:static lg:ml-auto lg:px-[7px] lg:text-[11px]",
                      )}
                    >
                      {item.count}
                      <span className="sr-only"> unresolved</span>
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-3.5">
            <div
              className={cn(
                "mx-1 mb-2.5 rounded-xl border border-white/10 bg-white/8 px-3 py-2.5 text-[12.5px]",
                RAIL_HIDDEN,
              )}
            >
              <div>
                <span
                  aria-hidden="true"
                  className="mr-1.5 inline-block size-2 rounded-full bg-[#63d3a0] shadow-[0_0_0_3px_rgb(99_211_160_/_0.18)]"
                />
                <b>Open · closes 18:30</b>
              </div>
              <small className="mt-0.5 block text-[#a9b8c8]">Tue 21 Jul · 9 team members in</small>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl p-2 md:justify-center md:p-1.5 lg:justify-start lg:p-2">
              <span
                aria-hidden="true"
                className="grid size-[34px] shrink-0 place-items-center rounded-full bg-linear-to-br from-[#dff0ed] to-[#c2e2dc] text-[12.5px] font-extrabold text-navy"
              >
                {user.initials}
              </span>
              <div className={RAIL_HIDDEN}>
                <b className="text-[13.5px]">{user.name}</b>
                <small className="mt-px block text-[11.5px] text-[#a9b8c8]">{user.role}</small>
              </div>
            </div>
          </div>
        </aside>

        <main className="col-start-1 flex min-w-0 flex-col md:col-start-2">
          <header
            className={cn(
              "no-print sticky top-0 z-20 flex min-h-[62px] flex-wrap items-center justify-between gap-2 border-b border-line bg-white/85 py-2.5 backdrop-blur-md backdrop-saturate-150 md:min-h-[70px]",
              GUTTER,
            )}
          >
            <button
              aria-label="Open navigation"
              aria-expanded={navOpen}
              aria-controls="sidebar"
              onClick={() => setNavOpen((open) => !open)}
              className={cn(buttonStyles.icon, "md:hidden")}
            >
              ☰
            </button>

            <div
              className={cn(
                "min-w-0 flex-auto items-center gap-2 rounded-lg border border-line bg-bg-2 px-3.5 py-2.5 text-muted transition focus-within:border-teal-line focus-within:bg-white focus-within:ring-3 focus-within:ring-teal/10 sm:flex sm:flex-[0_1_400px]",
                searchOpen ? "order-3 flex w-full flex-[1_1_100%]" : "hidden",
              )}
            >
              ⌕
              <input
                ref={searchInput}
                aria-label="Search"
                placeholder="Search clients, patients, microchips or tasks…  ( / )"
                className="w-full min-w-0 border-0 bg-transparent text-sm outline-none"
              />
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2 sm:ml-0">
              <button
                aria-label="Search"
                aria-expanded={searchOpen}
                onClick={() => {
                  setSearchOpen((open) => !open);
                  if (!searchOpen) requestAnimationFrame(() => searchInput.current?.focus());
                }}
                className={cn(buttonStyles.icon, "sm:hidden")}
              >
                ⌕
              </button>
              <button
                className={cn(buttonStyles.danger, "px-3 text-[13.5px] sm:px-3.5 sm:text-[15px]")}
                onClick={() => openDialog("escalation")}
              >
                ▲ Escalate
              </button>
              <button
                className={cn(
                  buttonStyles.primary,
                  "hidden px-3 text-[13.5px] min-[380px]:inline-flex sm:px-[15px] sm:text-[15px]",
                )}
              >
                + New task
              </button>
              <button aria-label="Notifications" className={buttonStyles.icon}>
                🔔
              </button>
            </div>
          </header>

          <div className={cn("flex-1 pt-[18px] pb-10 md:pt-[22px] md:pb-12", GUTTER)}>
            <div className="3xl:mx-auto 3xl:max-w-[1720px]">{children}</div>
          </div>
        </main>
      </div>

      <div
        aria-hidden="true"
        onClick={closeNav}
        className={cn(
          "fixed inset-0 z-30 bg-[#0b1628]/50 backdrop-blur-[2px] transition-opacity duration-[220ms] md:hidden",
          navOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
    </>
  );
}
