"use client";

import "../../app/globals.css";

import {
  BarChartIcon,
  BellIcon,
  CubeIcon,
  FileIcon,
  HomeIcon,
} from "@radix-ui/react-icons";

import { Button } from "../components/ui/Button";
import Link from "next/link";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="px-12 py-3">
        <div className="flex justify-between ">
          <div className="text-2xl">SeedGov</div>
          <div className="flex gap-10 self-center">
            <Link href={"/platform"}>Explore now</Link>
            <Link href={"#"}>Get started</Link>
            <Link href={"#"}>Learn more</Link>
            <Link href={"#"}>Menu</Link>
          </div>
          <div className="flex gap-x-4">
            <Button>Log in</Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className=" flex bg-black text-white gap-4">
        <p className="">About</p>
        <p className="">Features</p>
        <p className="">Pricing</p>
        <p className="">Contact</p>
      </footer>
    </div>
  );
}
