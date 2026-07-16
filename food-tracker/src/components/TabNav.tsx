"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/ingredients", label: "Ingredients" },
  { href: "/meals", label: "Meals" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

export default function TabNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      {TABS.map((tab) => {
        const active = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              active
                ? "text-blue-600 border-t-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "text-zinc-500 border-t-2 border-transparent dark:text-zinc-400"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
