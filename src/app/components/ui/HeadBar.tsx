// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";

import { Button } from "./Button";
// import GroupButton from "./GroupButton";
// import LayoutGridIcon from "@/components/ui/Icons/LayoutGridIcon.svg";
// import LayoutListIcon from "@/components/ui/Icons/LayoutListIcon.svg";
import Link from "next/link";
import { LoginButton } from "./LoginButton";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "next/navigation";

// import { LoginButton } from "./LoginButton";
// import Logo from "@/components/ui/Icons/Logo.svg";
// import NetworkSelector from "./NetworkSelector";
// import SearchBar from "./SearchBar";
// import SeparatorIcon from "@/components/ui/Icons/SeparatorIcon.svg";
// import StyledIcon from "../StyledIcon";

interface HeadBarProps {
  showDropdown?: boolean;
  // dropdownContent?: ReactNode;
}

export const HeadBar = ({ showDropdown = false }: HeadBarProps) => {
  const { authenticated, user } = useAuth();

  const [address, setAddress] = useState<boolean>(false);
  const par = useParams();
  const id = par.id as string;

  useEffect(() => {
    if (!user) {
      return;
    }
    setAddress(authenticated);
  }, [authenticated, user]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 flex h-14 w-full items-center 
      bg-stone-100 
      dark:bg-stone-950
      shadow-md
      shadow-stone-200
      border-stone-300
      dark:shadow-black "
    >
      <div className="containers flex items-center w-full justify-between px-4 md:px-6">
        <Link className="w-44 flex items-center gap-2" href="#">
          {/* <MountainIcon className="h-6 w-6" /> */}
          {/* <StyledIcon Icon={Logo} /> */}
          <div className="flex items-start">
            <span className="text-xl font-light dark:text-amber-600">
              SeedGov
            </span>
            <span className="mt-1" style={{ fontSize: "10px" }}>
              ™
            </span>
          </div>
        </Link>

        <span className="ml-10 flex gap-2 items-center">
          <Link className="text-xl opacity-40" href={"/dao-manager"}>
            ←
          </Link>
          <span className="text-xl">
            {id?.length > 0 &&
              id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()}
          </span>
        </span>
        <div className="flex w-full items-right gap-4">
          {/* search bar */}
          {/* <SearchBar /> */}

          {showDropdown && (
            <div className="relative">
              <Button size="icon" variant="ghost">
                {/* <StyledIcon Icon={LayoutListIcon} /> */}
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                {/* {dropdownContent} */}
              </div>
            </div>
          )}
          {/* <StyledIcon Icon={SeparatorIcon} /> */}

          {/* network button  */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* <NetworkSelector /> */}
        </div>

        {authenticated && (
          <span className="text-amber-600 font-mono text-xs">🔑</span>
        )}

        <LoginButton />
      </div>
    </header>
  );
};
