import NavBar from "@/components/layout/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credify",
  description: "Welcome to certificate verification system",
};

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="container">
        <NavBar />
      </header>
      {children}
    </>
  );
}
