// "use client";

// import { useEffect, useState } from "react";

// import { Button } from "./Button";
// import { shortAddress } from "../../lib/utils";
// import { usePrivy } from "@privy-io/react-auth";

// export const LoginButton = () => {
//   const { ready, authenticated, login, logout, user } = usePrivy();
//   const [showMenu, setShowMenu] = useState(false);
//   // Disable login when Privy is not ready or the user is already authenticated
//   const disableLogin = !ready || (ready && authenticated);

//   const handleLogin = () => {
//     login();
//     setShowMenu(false);
//   };
//   return authenticated ? (
//     <div className="relative">
//       <Button
//         // disabled={disableLogin}
//         className="rounded-xl px-4 z-20"
//         variant="ghost"
//         onClick={() => setShowMenu(!showMenu)}
//       >
//         {shortAddress(user?.wallet?.address)} ⏷
//       </Button>

//       <div className="justify-self-end  absolute">
//         {showMenu ? (
//           <div className="bg-stone-100 shadow-md rounded-md p-4">
//             <Button size={"sm"} onClick={() => logout()}>
//               Disconnect
//             </Button>
//           </div>
//         ) : (
//           ""
//         )}
//       </div>
//     </div>
//   ) : (
//     <Button
//       className="rounded-full px-10
//     dark:bg-stone-700
//     dark:text-stone-200
//     hover:dark:bg-stone-600
//     hover:dark:text-stone-100"
//       variant="default"
//       size={"sm"}
//       disabled={disableLogin}
//       onClick={handleLogin}
//     >
//       Sign in
//     </Button>
//   );
// };

// LoginButton.tsx
import React, { useState } from "react";

import { Button } from "./Button";
import { shortAddress } from "../../lib/utils";
import { useAuth } from "../contexts/AuthContext";

export const LoginButton: React.FC = () => {
  const { authenticated, login, logout, user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogin = () => {
    login();
    setShowMenu(false);
  };
  const handleLogout = () => {
    logout();
    setShowMenu(false);
    console.log("loggg ", user);
  };

  return authenticated ? (
    <div className="relative">
      <Button
        className="rounded-xl px-4 z-20"
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
