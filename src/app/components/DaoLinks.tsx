import Link from "next/link";
import React from "react";

interface DaoLinkProps {
  arrayLinks: [
    {
      title: string;
      url: string;
    }
  ];
  filterBy: string;
}

const arr: React.FC<any> = ({ arrayLinks }: DaoLinkProps) => {
  return arrayLinks.map((link: any, key: number) => (
    <Link
      key={key}
      target="_blank"
      className=" border rounded-lg  dark:border-stone-600 border-stone-200 text-xs text-gray-600 dark:text-gray-400"
      href={link.url}
    >
      <div className="rounded-sm w-36 h-16 items-center  p-2 sw-full flex justify-between hover:bg-rose-200 dark:hover:bg-rose-400 hover:dark:text-stone-800 ">
        <div className="   ">{link.title}</div>
        <div className="ml-2 dark:text-stone-600 text-stone-100">↗︎</div>
      </div>
    </Link>
  ));
};

export default arr;
