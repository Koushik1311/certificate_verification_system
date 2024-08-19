// Dashboard RootLayout

import DashboardLeftBar from "@/components/layout/DashboardLeftBar";
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
    <div className="flex mx-4 h-screen">
      {/* Left bar */}
      <div>
        <DashboardLeftBar />
      </div>
      {/* Children or pages */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
