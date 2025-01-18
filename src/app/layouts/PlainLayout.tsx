'use client';

import '../../app/globals.css';

import { ThemeProvider, useTheme } from 'next-themes';

export default function PlainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { systemTheme } = useTheme();

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <main className="w-full flex overflow-clip scroll-auto">{children}</main>
    </ThemeProvider>
  );
}
