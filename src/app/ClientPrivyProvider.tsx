// src/app/providers/ClientPrivyProvider.tsx
"use client";

import {
  arbitrumSepolia,
  baseSepolia,
  mainnet,
  modeTestnet,
  morphSepolia,
  scrollSepolia,
} from "viem/chains";

import { PrivyProvider } from "@privy-io/react-auth";

export default function ClientPrivyProvider({
  children,
  appId,
}: {
  children: React.ReactNode;
  appId: string;
}) {
  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          //   logo: "http://localhost:3000/favicon.ico",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        defaultChain: baseSepolia,
        supportedChains: [
          arbitrumSepolia,
          baseSepolia,
          mainnet,
          modeTestnet,
          morphSepolia,
          scrollSepolia,
        ],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
