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
          <div className="text-2xl font-semibold">SeedGov</div>
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
      <footer className="py-12 w-full text-white bg-stone-700">
        <div className="w-8/12 mx-auto">
          <div className="flex justify-between items-center">
            <p className="text-4xl font-semibold">SeedGov</p>

            <div className="flex gap-10">
              <p className="text-lg font-semibold"> Services</p>
              <p className="text-lg font-semibold"> About us</p>
              <p className="text-lg font-semibold"> Terms</p>
            </div>
          </div>

          <p className="font-mono text-xs mt-4">
            (C) 2024 Seed. All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
