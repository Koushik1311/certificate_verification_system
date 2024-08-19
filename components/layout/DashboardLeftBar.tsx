"use client";

import { DashboardLinks } from "@/constants/dashboard-links";
import Link from "next/link";
import Logo from "../global/Logo";
import { usePathname } from "next/navigation";
import cn from "@/lib/utils";

export default function DashboardLeftBar() {
  const pathname = usePathname();

  return (
    <>
      {/* Logo */}
      <div className="ml-3">
        <Logo />
      </div>

      <ul className="mt-9">
        {DashboardLinks.map((link, index) => {
          const isActive = pathname.startsWith(`${link.link}`);

          return (
            <li key={index}>
              <Link
                href={link.link}
                className={cn(
                  "flex items-center gap-2 h-12 px-4 hover:bg-blue-100 hover:text-blue-600 border border-white hover:border-blue-200 rounded-lg w-52 transition-colors",
                  isActive && "bg-blue-100 text-blue-600 border border-blue-400"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
