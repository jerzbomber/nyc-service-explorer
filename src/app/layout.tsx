import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "NYC Service Explorer",
  description:
    "The NYC Service Explorer is a simple web application that allows users to discover essential community services in New York City",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
