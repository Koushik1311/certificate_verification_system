// Dashboard RootLayout

import DashboardLeftBar from "@/components/layout/DashboardLeftBar";
import LogoutButton from "@/components/user/LogoutButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Welcome to certificate verification system",
};

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex mx-4 h-screen mt-8">
      {/* User */}
      <div className="absolute top-3 right-4">
        <LogoutButton />
      </div>

      {/* Left bar */}
      <div>
        <DashboardLeftBar />
      </div>
      {/* Children or pages */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
