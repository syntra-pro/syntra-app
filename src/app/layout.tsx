// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }

"use client";

import "../app/globals.css";

import {
  BarChartIcon,
  BellIcon,
  CubeIcon,
  FileIcon,
  HomeIcon,
} from "@radix-ui/react-icons";

import { Button } from "./components/ui/Button";
import { HeadBar } from "./components/ui/HeadBar";
// import { Inter } from "next/font/google";
import Link from "next/link";
import { NetworkProvider } from "./components/contexts/NetworkContext";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Welcome to SeedGov</title>
        <meta name="description" content="Seed" />
      </head>

      <body className="bg-white dark:bg-stone-800">
        <Providers>
          <NetworkProvider>
            <HeadBar />
            {/* content screen */}
            <div
              className="flex min-h-screen
           

          "
            >
              {/* sidebar */}
              <div
                className="fixed left-0 top-16 bottom-0
                 z-30 
                flex w-44 
            flex-col border-rs bg-zinc-100 p-4
             dark:border-gray-800 dark:bg-gray-950"
              >
                <nav className="flex-1 space-y-2">
                  <div>
                    <Link
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                      href="/"
                    >
                      <HomeIcon />
                      Home
                    </Link>

                    <Link
                      className="flex items-center gap-2 mb-4 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                      href="#"
                    >
                      <BellIcon />
                      Notifications
                    </Link>

                    <span className="font-semibold pl-3 text-stone-500 text-sm">
                      Workspace
                    </span>

                    <Link
                      className="flex items-center gap-2 mt-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                      href="#"
                    >
                      <CubeIcon /> DAO Manager
                    </Link>
                    <Link
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                      href="#"
                    >
                      <FileIcon />
                      Drafts
                    </Link>
                    <Link
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                      href="#"
                    >
                      <BarChartIcon />
                      Analytics
                    </Link>
                  </div>

                  {/* footer  */}
                  <div
                    className="fixed h-6 justify-center items-center
                bottom-6 z-20  gap-[13px] inline-flex"
                  >
                    <>
                      {/* <span className="text-zinc-600 text-xs ">Follow us</span>
                    <div className="w-20 h-6 justify-start items-start gap-1 inline-flex">
                      <div
                        className="w-6 h-6 p-0.5 bg-zinc-100 rounded 
                        sidebarSocials
                        flex-col justify-center items-center gap-2.5 inline-flex"
                      >
                        <StyledIcon Icon={DiscordIcon} />
                      </div>
                      <div
                        className="w-6 h-6 p-0.5 bg-zinc-100 rounded sidebarSocials
                        flex-col justify-center items-center gap-2.5 inline-flex"
                      >
                        <StyledIcon Icon={TelegramIcon} />
                      </div>
                      <div
                        className="w-6 h-6 p-0.5 bg-zinc-100 rounded 
                        sidebarSocials
                          flex-col justify-center items-center gap-2.5 inline-flex"
                      >
                        <StyledIcon Icon={XIcon} />
                      </div>
                    </div> */}
                    </>

                    <Button className="bg-black ml-4 dark:bg-stone text-white">
                      New Project
                    </Button>
                  </div>
                </nav>
              </div>

              {/* main content */}
              <main className="ml-44 w-full flex overflow-y-auto">
                {children}
              </main>
            </div>
          </NetworkProvider>
        </Providers>
      </body>
    </html>
  );
}
