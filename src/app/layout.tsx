import { AuthProvider } from "./components/contexts/AuthContext";
import { NetworkProvider } from "./components/contexts/NetworkContext";
import Providers from "./providers";
import { useAuth } from "./components/contexts/AuthContext";

export const metadata = {
  title: "SeedGov",
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
      <Providers>
        <NetworkProvider>
          <AuthProvider>
            <body>{children}</body>
          </AuthProvider>
        </NetworkProvider>
      </Providers>
    </html>
  );
}
