"use client";

import "@fileverse-dev/ddoc/styles";

import { useEffect, useState } from "react";

import { DdocEditor } from "@fileverse-dev/ddoc";

// import { Breadcrumb } from "@/components/ui/Breadcrumb";
// import Chip from "@/components/ui/Chip";

// import StyledIcon from "@/components/StyledIcon";
// import { usePrivy } from "@privy-io/react-auth";

const DEFAULT_DEADLINE_MINS = 10;
const DEFAULT_TRADING_TOKEN = "ETH";

export default function TokenPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // unset
  const [tokenB, setTokenB] = useState("No token");

  useEffect(() => {
    if (!id) {
      return;
    }
  }, [id]);

  return (
    <div className="mt-16 bg-white dark:bg-stone-800 p-6 w-full justify-center">
      <div>
        <p className="text-3xl text-black dark:text-white">{id}</p>
      </div>
      <DdocEditor isPreviewMode={false} />
    </div>
  );
}
