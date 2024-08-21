import Logo from "../global/Logo";
import { NavLinks } from "@/constants/nav-links";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between mt-3">
      {/* Logo */}
      <Logo />

      {/* NavLinks */}
      <ul className="flex items-center justify-center gap-6">
        {NavLinks.map((navLink, index) => (
          <li key={index}>
            <Link
              href={navLink.link}
              className="hover:text-blue-500 transition-colors"
            >
              {navLink.label}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        {/* Dashboard */}
        <Link
          href="/dashboard/upload"
          className="border border-blue-400 bg-blue-300 hover:border-blue-500 hover:bg-blue-400 transition duration-300 text-white rounded-lg px-3 py-1"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
