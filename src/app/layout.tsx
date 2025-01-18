import { AuthProvider } from './components/contexts/AuthContext';
import { DAOProvider } from './components/contexts/DAOContext';
import { MixpanelProvider } from './components/contexts/mixpanelContext';
import { NetworkProvider } from './components/contexts/NetworkContext';
import Providers from './providers';
import { ThemeProvider } from 'next-themes';
import { VerificationProvider } from './components/contexts/VerificationContext';

export const metadata = {
  title: 'Syntra',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-stone-800">
        <ThemeProvider attribute="class" defaultTheme="system">
          <MixpanelProvider>
            <Providers>
              <NetworkProvider>
                <VerificationProvider>
                  <AuthProvider>
                    <DAOProvider>{children}</DAOProvider>
                  </AuthProvider>
                </VerificationProvider>
              </NetworkProvider>
            </Providers>
          </MixpanelProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
