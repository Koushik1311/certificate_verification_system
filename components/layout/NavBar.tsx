import Logo from "../global/Logo";
import { NavLinks } from "@/constants/nav-links";
import { cookies } from "next/headers";
import Link from "next/link";

export default function NavBar() {
  const cookieStore = cookies();

  const hasCookie = cookieStore.has("refreshToken");

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
        {hasCookie ? (
          <Link
            href="/dashboard/upload"
            className="border border-blue-400 bg-blue-300 hover:border-blue-500 hover:bg-blue-400 transition duration-300 text-white rounded-lg px-3 py-1"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/login"
            className="px-6 py-2 text-white bg-blue-400 rounded-full hover:bg-blue-500 transition-colors"
          >
            Log in
          </Link>
        )}
      </div>
    </div>
  );
}
