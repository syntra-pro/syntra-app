"use client";

import "../../app/globals.css";

import {
  BarChartIcon,
  BellIcon,
  CubeIcon,
  DiscordLogoIcon,
  FileIcon,
  HomeIcon,
  QuestionMarkCircledIcon,
  QuestionMarkIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

import { AnimatePresence } from "framer-motion";
import FeedbackPopup from "../components/FeedbackPopup";
import { HeadBar } from "../components/ui/HeadBar";
// import { Inter } from "next/font/google";
import Link from "next/link";
import { LoginButton } from "../components/ui/LoginButton";
// import { NetworkProvider } from "../components/contexts/NetworkContext";
// import Providers from "../providers";
import { useAuth } from "../components/contexts/AuthContext";
import { useState } from "react";

// import { AuthProvider } from "../components/contexts/AuthContext";

function MainContent({ children }: { children: React.ReactNode }) {
  const { authenticated, user, ready } = useAuth();
  // console.log("ready ", ready, authenticated);

  return (
    <>
      {!ready ? (
        <div className="flex h-screen w-full items-center justify-center bg-transparent">
          <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-rose-500"></div>
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
            {/* <button className="px-6 py-2 bg-stone-500 text-white font-medium rounded-md hover:bg-rose-400 transition duration-200">
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
  const [feedback, setFeedback] = useState(false);

  return (
    <>
      <div>
        <title>Welcome to Syntra</title>
        <meta name="description" content="Seed" />
      </div>
      <div className="bg-white dark:bg-stone-800">
        <HeadBar />
        {/* content screen */}
        <div className="flex min-h-screen">
          {/* main content */}
          <main className="ml-44 w-full flex overflow-y-auto">
            {/* if not authenticated, nag screen */}

            <MainContent>{children}</MainContent>
          </main>

          {/* sidebar */}
          <div
            className="fixed left-0 top-12 bottom-0
                 z-30 flex w-44 justify-between
                flex-col bg-zinc-100 p-3
                dark:border-gray-800 dark:bg-gray-950"
          >
            <nav className="flex flex-col">
              <Link
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-rose-200 hover:text-gray-900 focus:bg-rose-200 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                href="/home"
              >
                <HomeIcon />
                Home
              </Link>

              <Link
                className="flex items-center gap-2 mb-4 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-rose-200 hover:text-gray-900 focus:bg-rose-200 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                href="#"
              >
                <BellIcon />
                Notifications
              </Link>

              <span className="font-semibold pl-3 text-stone-500 text-sm">
                Workspace
              </span>

              <Link
                className="flex items-center gap-2 mt-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-rose-200 hover:text-gray-900 focus:bg-rose-200 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                href="/dao-manager"
              >
                <CubeIcon /> DAO Manager
              </Link>
              <Link
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-rose-200 hover:text-gray-900 focus:bg-rose-200 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                href="#"
              >
                <FileIcon />
                Drafts
              </Link>
              <Link
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-rose-200 hover:text-gray-900 focus:bg-rose-200 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                href="#"
              >
                <BarChartIcon />
                Analytics
              </Link>
            </nav>

            {/* lower section  */}
            <div className="flex flex-col text-center gap-3 mb-3">
              <button
                onClick={() => setFeedback(true)}
                // className="text-sm text-stone-500 px-3 py-2 rounded-md hover:bg-rose-200 bg-transparent"
                className="rounded-md flex gap-2 items-center px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-rose-200 hover:text-gray-900 focus:bg-rose-200 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
              >
                <QuestionMarkCircledIcon />
                Send feedback
              </button>

              {/* footer  */}
              <div className="justify-center">
                <div className="flex justify-between">
                  <div className="text-zinc-600 content-center text-xs ">
                    Follow us
                  </div>
                  <div className="flex gap-1">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {feedback && <FeedbackPopup onClose={() => setFeedback(false)} />}
      </AnimatePresence>{" "}
    </>
  );
}
