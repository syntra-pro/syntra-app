import Link from "next/link";
import React from "react";

interface DaoLinkProps {
  arrayLinks: {
    organization: string;
    type: string;
    name: string;
    url: string;
  }[];
  filterBy: string;
}

const DaoLinks: React.FC<DaoLinkProps> = ({
  arrayLinks,
  filterBy,
}: DaoLinkProps) => {
  const ss = arrayLinks.filter((x) => x.type === filterBy);

  return ss.map((link: any, key: number) => (
    <Link
      key={key}
      target="_blank"
      className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
      href={link.url}
    >
      <div className="rounded-sm px-2 py-1 w-full flex justify-between hover:bg-amber-400 dark:hover:bg-amber-400 hover:dark:text-stone-800 ">
        <p>✦ {link.name}</p>
        <p className="dark:text-stone-600 text-stone-100">↗︎</p>
      </div>
    </Link>
  ));
};

export default DaoLinks;
