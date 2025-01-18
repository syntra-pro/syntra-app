'use client';

import '../../app/globals.css';

import {
  BarChartIcon,
  BellIcon,
  CubeIcon,
  FileIcon,
  GlobeIcon,
  HomeIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import { ThemeProvider, useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { BlankLink } from '../components/BlankLink';
import FeedbackPopup from '../components/FeedbackPopup';
import { HeadBar } from '../components/ui/HeadBar';
import Link from 'next/link';
import Loader from '../components/ui/Loader';
import { LoginButton } from '../components/ui/LoginButton';
import { useDAO } from '../components/contexts/DAOContext';
import { usePrivy } from '@privy-io/react-auth';

function MainContent({ children }: { children: React.ReactNode }) {
  // const { authenticated, user, ready } = useAuth();
  const { authenticated, user, ready } = usePrivy();

  return (
    <>
      {authenticated ? (
        <>{children}</>
      ) : ready ? (
        <div className="flex h-screen w-full items-center justify-center bg-transparent">
          <div className="text-center">
            <h1 className="text-5xl font-thin text-stone-800 dark:text-stone-300 mb-4">
              Welcome Back!
            </h1>
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              Please log in to continue using our platform
            </p>
            <LoginButton />
          </div>
        </div>
      ) : (
        <Loader />
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
  const { color, logo, colorDark } = useDAO();
  const { theme, setTheme, systemTheme } = useTheme();

  const isDarkMode = systemTheme !== 'light';

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <>
        <div>
          <title>Syntra</title>
          <meta name="description" content="Seed" />
        </div>
        <div className="  ">
          <HeadBar />
          {/* content screen */}
          <div className="flex h-screen">
            {/* main content */}
            <main className="ml-44 mt-12 w-full flex flex-grow overflow-auto ">
              {/* if not authenticated, nag screen */}
              <MainContent>{children}</MainContent>
            </main>

            {/* sidebar */}
            <div
              className="fixed left-0 h-full justify-between flex w-44 flex-col flex-grow overflow-auto p-3"
              style={{
                backgroundColor:
                  typeof systemTheme === 'undefined'
                    ? '#6363630f '
                    : logo === ''
                    ? isDarkMode
                      ? '#1c1917'
                      : '#f5f5f4'
                    : isDarkMode
                    ? colorDark
                    : color,
              }}>
              <div>
                <Link href="/">
                  <div className="ml-3 dark:invert ">
                    <svg
                      width="98.88"
                      height="32"
                      viewBox="0 0 365 118"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M113.227 98.5768C108.125 98.5768 103.605 97.6081 99.6653 95.6707C95.7905 93.6687 92.7229 90.8917 90.4626 87.3398C88.2669 83.7234 87.0722 79.5257 86.8784 74.7467H100.828C101.151 78.2341 102.378 80.9787 104.509 82.9807C106.705 84.9827 109.611 85.9837 113.227 85.9837C116.521 85.9837 119.136 85.3056 121.074 83.9494C123.011 82.5932 123.98 80.6558 123.98 78.1372C123.98 76.3935 123.398 75.005 122.236 73.9718C121.138 72.8739 119.75 72.0344 118.071 71.4531C116.392 70.8719 114.002 70.1938 110.902 69.4189C106.317 68.321 102.539 67.1586 99.5684 65.9315C96.6623 64.6399 94.1437 62.6057 92.0125 59.8287C89.8814 57.0518 88.8158 53.2416 88.8158 48.3981C88.8158 44.717 89.8168 41.4234 91.8188 38.5173C93.8208 35.6112 96.5977 33.3509 100.15 31.7364C103.702 30.0573 107.77 29.2178 112.355 29.2178C117.199 29.2178 121.461 30.0896 125.142 31.8333C128.823 33.5769 131.697 36.0633 133.764 39.2923C135.895 42.5213 137.025 46.2669 137.154 50.5292H123.398C123.076 47.8168 121.945 45.6857 120.008 44.1358C118.071 42.5213 115.52 41.714 112.355 41.714C109.449 41.714 107.157 42.3275 105.477 43.5546C103.798 44.7816 102.959 46.3961 102.959 48.3981C102.959 50.2709 103.54 51.7562 104.703 52.8541C105.865 53.9519 107.35 54.8238 109.159 55.4696C110.967 56.0508 113.453 56.6966 116.618 57.407C121.267 58.5048 125.045 59.635 127.951 60.7974C130.857 61.9599 133.344 63.9296 135.41 66.7065C137.541 69.4189 138.607 73.1645 138.607 77.9434C138.607 82.1411 137.541 85.7899 135.41 88.8898C133.279 91.9896 130.309 94.3791 126.498 96.0582C122.688 97.7372 118.264 98.5768 113.227 98.5768Z"
                        fill="#232118"
                      />
                      <path
                        d="M157.2 97.3175L139.473 48.9793H153.228L163.497 80.4621L173.668 48.9793H187.52L172.893 88.8898L162.819 117.563H149.935L157.2 97.3175Z"
                        fill="#232118"
                      />
                      <path
                        d="M191.665 48.9793H205.13V55.7602C206.487 53.3707 208.456 51.5302 211.039 50.2386C213.687 48.8824 216.69 48.2043 220.048 48.2043C223.665 48.2043 226.829 49.0116 229.542 50.6261C232.319 52.2406 234.45 54.5009 235.935 57.407C237.42 60.3131 238.163 63.639 238.163 67.3846V97.8018H224.601V70.3876C224.601 67.4169 223.729 64.9951 221.986 63.1223C220.242 61.1849 217.982 60.2162 215.205 60.2162C212.234 60.2162 209.812 61.2495 207.94 63.3161C206.067 65.318 205.13 67.9012 205.13 71.0657V97.8018H191.665V48.9793Z"
                        fill="#232118"
                      />
                      <path
                        d="M269.363 97.8018C263.68 97.8018 259.159 96.2519 255.801 93.152C252.443 90.0522 250.764 85.6931 250.764 80.0746V60.2162H241.464V48.9793H247.47C249.666 48.9793 250.764 47.8491 250.764 45.5888V34.5456H264.326V48.9793H277.403V60.2162H264.326V79.4934C264.326 84.1431 266.586 86.468 271.106 86.468H277.403V97.8018H269.363Z"
                        fill="#232118"
                      />
                      <path
                        d="M306.488 60.2162C303.259 60.2162 300.838 61.4432 299.223 63.8973C297.609 66.3513 296.801 69.7418 296.801 74.0686V97.8018H283.336V48.9793H296.801V57.1164C298.093 54.1457 299.675 52.0468 301.548 50.8198C303.485 49.5928 306.004 48.9793 309.104 48.9793H314.528V60.2162H306.488Z"
                        fill="#232118"
                      />
                      <path
                        d="M338.167 98.5768C330.999 98.5768 325.348 96.3165 321.215 91.7959C317.146 87.2107 315.112 81.0756 315.112 73.3905C315.112 68.3533 316.016 63.9296 317.824 60.1193C319.697 56.3091 322.345 53.3707 325.768 51.3042C329.19 49.2376 333.259 48.2043 337.973 48.2043C340.879 48.2043 343.495 48.721 345.82 49.7542C348.209 50.7229 350.114 52.0791 351.535 53.8228V48.9793H365V97.8018H351.535V92.6677C350.244 94.4759 348.403 95.929 346.014 97.0269C343.624 98.0601 341.009 98.5768 338.167 98.5768ZM340.298 86.9524C343.915 86.9524 346.821 85.7253 349.017 83.2713C351.212 80.7527 352.31 77.4591 352.31 73.3905C352.31 69.2574 351.212 65.9638 349.017 63.5098C346.821 60.9912 343.915 59.7319 340.298 59.7319C336.746 59.7319 333.872 60.9912 331.677 63.5098C329.481 65.9638 328.383 69.2574 328.383 73.3905C328.383 77.4591 329.481 80.7527 331.677 83.2713C333.872 85.7253 336.746 86.9524 340.298 86.9524Z"
                        fill="#232118"
                      />
                      <path
                        d="M66.5049 65.2235C66.5049 82.9153 52.1629 97.2573 34.4711 97.2573L5.00006 97.2573L5.00006 63.9422C5.00006 46.9581 18.7684 33.1898 35.7525 33.1898V33.1898C52.7366 33.1898 66.5049 46.9581 66.5049 63.9422V65.2235Z"
                        stroke="#171717"
                        strokeWidth="9.22573"
                      />
                      <path
                        d="M5.00012 37.0338C5.00012 19.342 19.3421 5 37.0339 5L66.5049 5V38.3151C66.5049 55.2992 52.7366 69.0675 35.7525 69.0675V69.0675C18.7684 69.0675 5.00012 55.2992 5.00012 38.3151V37.0338Z"
                        stroke="#171717"
                        strokeWidth="9.22573"
                      />
                    </svg>
                  </div>
                </Link>
                <nav className="mt-6 flex flex-col">
                  <BlankLink
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-slate-300 hover:text-gray-900 focus:bg-slate-300 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                    href="/home">
                    <HomeIcon />
                    Home
                  </BlankLink>

                  <Link
                    className="flex items-center gap-2 mb-4 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-slate-300 hover:text-gray-900 focus:bg-slate-300 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                    href="#">
                    <BellIcon />
                    Notifications
                  </Link>

                  <span className="font-semibold pl-3 text-stone-500 text-sm">
                    Workspace
                  </span>

                  <BlankLink
                    className="flex items-center gap-2 mt-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-slate-300 hover:text-gray-900 focus:bg-slate-300 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                    href="/dao-manager">
                    <CubeIcon /> DAO Manager
                  </BlankLink>
                  <Link
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-slate-300 hover:text-gray-900 focus:bg-slate-300 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                    href="#">
                    <FileIcon />
                    Drafts
                  </Link>
                  <Link
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-slate-300 hover:text-gray-900 focus:bg-slate-300 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
                    href="#">
                    <BarChartIcon />
                    Analytics
                  </Link>
                </nav>
              </div>
              {/* lower section  */}
              <div className="flex flex-col text-center gap-3 mb-3">
                <button
                  onClick={() => setFeedback(true)}
                  className="rounded-md flex gap-2 items-center px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-slate-300 hover:text-gray-900 focus:bg-slate-300 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50">
                  <QuestionMarkCircledIcon />
                  Send feedback
                </button>

                {/* footer  */}
                <div className="justify-center ml-3">
                  <div className="flex justify-between">
                    <div className="text-zinc-600 content-center text-xs ">
                      Follow us
                    </div>
                    <div className="flex gap-1">
                      <Link
                        target="_blank"
                        href={'https://seedorg.super.site/seedgov'}
                        className="w-6 h-6 p-0.5 dark:bg-transparent rounded 
                        sidebarSocials
                        flex-col justify-center items-center gap-2.5 inline-flex">
                        <GlobeIcon className="dark:invert" />
                      </Link>

                      <Link
                        href={'https://x.com/seedgov'}
                        target="_blank"
                        className="w-6 h-6 p-0.5 dark:bg-transparent rounded 
                        sidebarSocials
                          flex-col justify-center items-center gap-2.5 inline-flex">
                        {/* <TwitterLogoIcon  /> */}
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="dark:invert r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-lrsllp r-1nao33i r-16y2uox r-8kz0gk">
                          <g>
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                          </g>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {feedback && <FeedbackPopup onClose={() => setFeedback(false)} />}
        </AnimatePresence>{' '}
      </>
    </ThemeProvider>
  );
}
