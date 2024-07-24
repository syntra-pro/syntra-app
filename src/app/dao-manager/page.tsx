import Link from "next/link";

export default function DaoManager() {
  return (
    <div className="py-24 mx-6 flex flex-wrap content-start justify-center min-h-screen gap-6 ">
      <Link
        className="flex items-center gap-2 mt-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
        href="/daos/arbitrum"
      >
        <div className="rounded-lg bg-stone-700 p-4 w-70 h-60">
          <div className=" w-60 h-32 mb-2 rounded-lg bg-blue-600">
            placeholder
          </div>
          <p className=" text-2xl font-semibold">Arbitrum</p>
          <p className=" text-xs">10 Collaborators</p>
          <p className=" text-xs">11 Projects</p>
        </div>
      </Link>

      <div className="rounded-lg bg-stone-700 p-4 w-70 h-60">
        <div className="w-60 h-32 mb-2 rounded-lg bg-red-600">placeholder</div>
        <p className=" text-2xl font-semibold">Optimism</p>
        <p className=" text-xs">10 Collaborators</p>
        <p className=" text-xs">11 Projects</p>
      </div>
    </div>
  );
}
