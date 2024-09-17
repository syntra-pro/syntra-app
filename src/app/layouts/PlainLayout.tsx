'use client';

import '../../app/globals.css';

import { ThemeProvider, useTheme } from 'next-themes';

import { initMixpanel } from '../../lib/mixpanel';
import { useEffect } from 'react';

export default function PlainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    initMixpanel();
  }, []);

  const isDarkMode = systemTheme !== 'light';

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <main className="w-full flex overflow-clip scroll-auto">{children}</main>
    </ThemeProvider>
  );
}
