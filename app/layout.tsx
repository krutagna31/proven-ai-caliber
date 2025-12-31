import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { ClientProvider, ThemeProvider } from "@/context";
import "./globals.css";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Proven AI",
  description:
    "Proven AI is a platform for managing pharmaceutical tasks, master data, and document workflows.",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${josefinSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientProvider>{children}</ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
