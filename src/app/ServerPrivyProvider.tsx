"use client";

import ClientPrivyProvider from "./ClientPrivyProvider";
import React from "react";

export default function ServerPrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_ID;
  return <ClientPrivyProvider appId={appId!}>{children}</ClientPrivyProvider>;
}
