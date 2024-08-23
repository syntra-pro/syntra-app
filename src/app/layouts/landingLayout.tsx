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
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold">
            Syntra
          </Link>

          <div className="flex gap-10 text-stone-400 text-xs self-center">
            <Link href={"#setting"}>About</Link>
            <Link href={"/changelog"}>Changelog</Link>
            <Link href={"https://www.seedlatam.org"}>Seed Org</Link>
          </div>

          <Link href={"/home"}>
            <div className="rounded-full bg-rose-300 pl-4 pr-2 py-2 text-sm">
              Get started
              <span className="bg-black ml-2 rounded-full px-2 py-1 text-white ">
                →
              </span>
            </div>
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="py-12 w-full">
        <div className="w-11/12 mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xl font-semibold">Syntra</span>
              <p style={{ fontSize: "8pt" }} className="text-stone-400 mt-2">
                (C) 2024 Seed. All rights reserved
              </p>
            </div>
            <div className="flex gap-8 text-xs font-light text-stone-500">
              <div className="flex flex-col  gap-y-2">
                <p className="text-">About us</p>
                <p className="text-">Changelog</p>
                <p className="text-">Seed Org</p>
              </div>

              <div className="flex flex-col  gap-y-2">
                <p className="text-">FAQs</p>
                <p className="text-">Terms</p>
                <p className="text-">Contact</p>
              </div>
            </div>

            <Link href={"/home"}>
              <div className="rounded-full bg-rose-300 pl-4 pr-2 py-2 text-sm">
                Get started
                <span className="bg-black ml-2 rounded-full px-2 py-1 text-white ">
                  →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
