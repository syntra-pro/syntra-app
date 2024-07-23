import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col w-full gap-8 pt-24 px-8">
      <div id="sector1" className="flex flex-col sm:flex-row  w-full gap-4">
        <a
          href="#"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors
          bg-stone-50 dark:bg-stone-700
          hover:bg-stone-100  hover:dark:bg-stone-600
          text-stone-600 dark:text-stone-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">DAO Resources</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Access important DAO resources and documents.
          </p>
        </a>

        <a
          href="#"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors
          bg-stone-50 dark:bg-stone-700
          hover:bg-stone-100  hover:dark:bg-stone-600
          text-stone-600 dark:text-stone-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">Calendar</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            View upcoming DAO events and meetings.
          </p>
        </a>

        <a
          href="#"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors
          bg-stone-50 dark:bg-stone-700
          hover:bg-stone-100  hover:dark:bg-stone-600
          text-stone-600 dark:text-stone-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">Templates</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Use pre-built templates for common DAO tasks.
          </p>
        </a>
      </div>

      {/* <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left"> */}
      <div id="sector2" className="flex  flex-col sm:flex-row w-full gap-8 ">
        <div
          className="bg-transparent w-full border p-4 rounded-md
        text-stone-600 dark:text-stone-300
        border-stone-300 dark:border-stone-700"
        >
          <p className="text-2xl font-semibold">Subprojects</p>
          <h4>View and manage all active subprojects.</h4>
        </div>

        <div
          className="bg-transparent w-full border p-4  rounded-md
        text-stone-600 dark:text-stone-300
        border-stone-300 dark:border-stone-700"
        >
          <p className="text-2xl font-semibold">Drafts</p>
          <h4> Access work on your draft proposals. New project</h4>
        </div>
      </div>
    </main>
  );
}
