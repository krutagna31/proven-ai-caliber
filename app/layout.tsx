import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { ClientProvider, ThemeProvider } from "@/context";
import { Toaster } from "@/components/ui";
import "./globals.css";
import { QueryProvider } from "@/context/query-provider";

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
          <QueryProvider>
            <ClientProvider>
              {children}
              <Toaster position="top-center" />
            </ClientProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
