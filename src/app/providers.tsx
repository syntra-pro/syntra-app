// import { PrivyProvider } from "@privy-io/react-auth";
import ServerPrivyProvider from './ServerPrivyProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIX;

  return (
    <ServerPrivyProvider

    // appId={process.env.PRIV_ID!}
    >
      {children}
    </ServerPrivyProvider>
  );
}
