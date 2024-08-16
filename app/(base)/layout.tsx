import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CVS",
  description: "Welcome to certificate verification system",
};

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
