import Link from "next/link";
import PlatformLayout from "../layouts/platformLayout";

export default function Home() {
  return (
    <PlatformLayout>
      <main className="flex flex-col w-full gap-8 pt-24 px-8">
        <div id="sector1" className="flex flex-col sm:flex-row  w-full gap-4">
          <div
            className="rounded-lg border  border-stone-200 
          p-4 flex flex-col gap-4"
          >
            <div className="dark:text-stone-100">
              <h2 className="text-2xl font-semibold">Quick access</h2>
              <p className="text-sm opacity-50">
                Quickly access your most used features
              </p>
            </div>
            <Link href={"/daos/optimism"} className="bg-red-100 p-4 rounded-lg">
              <p className="font-bold">Optimism</p>
              <p className="text-xs">View your upcoming events</p>
            </Link>

            <Link
              href={"/daos/arbitrum"}
              className="bg-blue-100 p-4 rounded-lg"
            >
              <p className="font-bold">Arbitrum</p>
              <p className="text-xs">Manage your tasks and projects</p>
            </Link>

            <div className="bg-stone-100 p-4 rounded-lg">
              <p className="font-bold">Draft-001 Grants</p>
              <p className="text-xs">View your tasks list</p>
            </div>
          </div>

          <div
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors
          bg-stone-50 dark:bg-stone-700
          hover:bg-stone-100  hover:dark:bg-stone-600
          text-stone-600 dark:text-stone-300"
          >
            <h2 className="text-2xl font-semibold">Recent activity</h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Summary of your team&apos;s recent activity
            </p>
          </div>

          <div
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors
          bg-stone-50 dark:bg-stone-700
          hover:bg-stone-100  hover:dark:bg-stone-600
          text-stone-600 dark:text-stone-300"
          >
            <h2 className="text-2xl font-semibold">Recent drafts</h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Your most recent draft documents.
            </p>
          </div>
        </div>
        {/* <div className=" sm:flex-row  w-full gap-4"> */}
        <div
          id="sector2"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors
          bg-stone-50 dark:bg-stone-700
          hover:bg-stone-100  hover:dark:bg-stone-600
          text-stone-600 dark:text-stone-300"
        >
          <h2 className="text-2xl font-semibold">Activity Feed</h2>
          <p className="text-sm">Proposals currently being voted on</p>

          <p className="py-8 text-center font-mono">Coming Soon™</p>
        </div>
      </main>
    </PlatformLayout>
  );
}
