"use client";

import "../../app/globals.css";

import {
  BarChartIcon,
  BellIcon,
  CubeIcon,
  DiscordLogoIcon,
  FileIcon,
  HomeIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

// import { AuthProvider } from "../components/contexts/AuthContext";
import { HeadBar } from "../components/ui/HeadBar";
// import { Inter } from "next/font/google";
import Link from "next/link";
import { LoginButton } from "../components/ui/LoginButton";
// import { NetworkProvider } from "../components/contexts/NetworkContext";
// import Providers from "../providers";
import { useAuth } from "../components/contexts/AuthContext";

function MainContent({ children }: { children: React.ReactNode }) {
  const { authenticated, user, ready } = useAuth();
  // console.log("ready ", ready, authenticated);

  return (
    <>
      {!ready ? (
        <div className="flex h-screen w-full items-center justify-center bg-transparent">
          <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-amber-500"></div>
        </div>
      ) : authenticated ? (
        <>{children}</>
      ) : (
        <div className="flex h-screen w-full items-center justify-center bg-transparent">
          <div className="text-center">
            <h1 className="text-5xl font-thin text-gray-800 mb-4">
              Welcome Back!
            </h1>
            <p className="text-stone-600 mb-6">
              Please log in to continue using our platform
            </p>
            {/* <button className="px-6 py-2 bg-stone-500 text-white font-medium rounded-md hover:bg-amber-400 transition duration-200">
              Login
            </button> */}
            <LoginButton />
          </div>
        </div>
      )}
    </>
  );
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <title>Welcome to Syntra</title>
        <meta name="description" content="Seed" />
      </div>

      <div className="bg-white dark:bg-stone-800">
        {/* <Providers>
          <NetworkProvider>
            <AuthProvider> */}
        <HeadBar />
        {/* content screen */}
        <div className="flex min-h-screen">
          {/* sidebar */}
          <div
            className="fixed left-0 top-12 bottom-0
                 z-30 flex w-44 
                flex-col border-rs bg-zinc-100 p-4
                dark:border-gray-800 dark:bg-gray-950"
          >
            <nav className="flex-1 space-y-2">
              <div>
                <Link
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-amber-100 hover:text-gray-900 focus:bg-amber-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                  href="/home"
                >
                  <HomeIcon />
                  Home
                </Link>

                <Link
                  className="flex items-center gap-2 mb-4 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-amber-100 hover:text-gray-900 focus:bg-amber-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                  href="#"
                >
                  <BellIcon />
                  Notifications
                </Link>

                <span className="font-semibold pl-3 text-stone-500 text-sm">
                  Workspace
                </span>

                <Link
                  className="flex items-center gap-2 mt-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-amber-100 hover:text-gray-900 focus:bg-amber-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                  href="/dao-manager"
                >
                  <CubeIcon /> DAO Manager
                </Link>
                <Link
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-amber-100 hover:text-gray-900 focus:bg-amber-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                  href="#"
                >
                  <FileIcon />
                  Drafts
                </Link>
                <Link
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-amber-100 hover:text-gray-900 focus:bg-amber-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
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
                  <span className="text-zinc-600 text-xs ">Follow us</span>
                  <div className="w-20 h-6 justify-start items-start gap-1 inline-flex">
                    <div
                      className="w-6 h-6 p-0.5 bg-zinc-100 rounded 
                        sidebarSocials
                        flex-col justify-center items-center gap-2.5 inline-flex"
                    >
                      <DiscordLogoIcon />
                    </div>

                    <div
                      className="w-6 h-6 p-0.5 bg-zinc-100 rounded 
                        sidebarSocials
                          flex-col justify-center items-center gap-2.5 inline-flex"
                    >
                      <TwitterLogoIcon />
                    </div>
                  </div>
                </>
              </div>
            </nav>
          </div>

          {/* main content */}
          <main className="ml-44 w-full flex overflow-y-auto">
            {/* if not authenticated, nag screen */}

            <MainContent>{children}</MainContent>
          </main>
        </div>
        {/* </AuthProvider>
          </NetworkProvider>
        </Providers> */}
      </div>
    </>
  );
}
