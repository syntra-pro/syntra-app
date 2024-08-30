import Link from "next/link";
import React from "react";

interface DaoLinkProps {
  arrayLinks: [
    {
      // organization: string;
      // type: string;
      title: string;
      url: string;
    }
  ];
  filterBy: string;
}

// const DaoLinks: React.FC<DaoLinkProps> = ({
const arr: React.FC<any> = ({ arrayLinks }: DaoLinkProps) => {
  // const ss = arrayLinks.filter((x) => x.type === filterBy);

  return arrayLinks.map((link: any, key: number) => (
    <Link
      key={key}
      target="_blank"
      className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400"
      href={link.url}
    >
      <div className="rounded-sm p-2 w-full flex justify-between hover:bg-rose-200 dark:hover:bg-rose-400 hover:dark:text-stone-800 ">
        <div>✦ {link.title}</div>
        <div className="dark:text-stone-600 text-stone-100">↗︎</div>
      </div>
    </Link>
  ));
};

export default arr;
