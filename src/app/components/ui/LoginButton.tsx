"use client";

import React, { useEffect, useState } from "react";

import { Button } from "./Button";
import { shortAddress } from "../../../lib/utils";
import { useAuth } from "../contexts/AuthContext";

export const LoginButton: React.FC = () => {
  const { authenticated, login, logout, user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleLogin = () => {
    login();
    setShowMenu(false);
  };
  const handleLogout = () => {
    logout();
    setShowMenu(false);
    console.log("loggg ", user);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return authenticated && isClient ? (
    <div className="relative">
      <Button
        className="rounded-xl pl-2 text-xs font-mono pr-4 z-20 dark:text-stone-300"
        variant="ghost"
        onClick={() => setShowMenu(!showMenu)}
      >
        {shortAddress(user?.wallet?.address)} ⏷
      </Button>
      <div className="justify-self-end absolute">
        {showMenu ? (
          <div className="bg-stone-100 shadow-md rounded-md p-4">
            <Button size="sm" onClick={handleLogout}>
              Disconnect
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <Button
      className="rounded-full px-10 dark:bg-stone-700 dark:text-stone-200 hover:dark:bg-stone-600 hover:dark:text-stone-100"
      variant="default"
      size="sm"
      onClick={handleLogin}
    >
      Login
    </Button>
  );
};
