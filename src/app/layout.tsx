import { AuthProvider } from "./components/contexts/AuthContext";
import { NetworkProvider } from "./components/contexts/NetworkContext";
import Providers from "./providers";
import { VerificationProvider } from "./components/contexts/VerificationContext";
// import { useAuth } from "./components/contexts/AuthContext";

export const metadata = {
  title: "Syntra",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { authenticated, user, ready } = useAuth();

  return (
    <html lang="en">
      <body>
        <Providers>
          <NetworkProvider>
            <VerificationProvider>
              <AuthProvider>{children}</AuthProvider>
            </VerificationProvider>
          </NetworkProvider>
        </Providers>
      </body>
    </html>
  );
}
