"use client";

import { useEffect, useState } from "react";

import { Button } from "./Button";
// import Profile from "../Profile";
// import { shortAddress } from "@/lib/utils";
// import { useBalance } from "../contexts/BalanceContext";
import { usePrivy } from "@privy-io/react-auth";

export const LoginButton = () => {
  const { ready, authenticated, login, user } = usePrivy();
  const [showMenu, setShowMenu] = useState(false);
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);
  //   const { isConnected, setIsConnected } = useBalance();
  const handleClick = () => setShowMenu(!showMenu);

  //   useEffect(() => {
  //     setIsConnected(authenticated);
  //   }, [setIsConnected, authenticated]);

  return authenticated ? (
    <div className="grid relative">
      <Button
        // disabled={disableLogin}
        className="rounded-full px-10 z-20"
        variant="default"
        onClick={handleClick}
      >
        {/* {shortAddress(user?.wallet?.address)} ⏷ */}
      </Button>

      <div className="justify-self-end absolute">
        {/* {showMenu ? <Profile address={user?.wallet?.address} /> : ""} */}
      </div>
    </div>
  ) : (
    <Button
      className="rounded-full px-10
    dark:bg-stone-700
    dark:text-stone-200
    hover:dark:bg-stone-600
    hover:dark:text-stone-100"
      variant="default"
      size={"sm"}
      disabled={disableLogin}
      onClick={login}
    >
      Sign in
    </Button>
  );
};
