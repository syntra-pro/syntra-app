import { FileTextIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DaoLinkProps {
  arrayLinks: [
    {
      title: string;
      url: string;
      description: string;
      svg: string;
    }
  ];
  filterBy: string;
}

const arr: React.FC<any> = ({ arrayLinks }: DaoLinkProps) => {
  return (
    <div className=" w-full grid grid-cols-2 gap-4 mb-6">
      {arrayLinks?.map((link: any, key: number) => (
        <Link key={key} target="_blank" href={link.url}>
          <div
            key={key}
            className="flex justify-between px-4 h-28 py-2 bg-stone-100 dark:bg-stone-700
            dark:hover:bg-rose-900 
            hover:bg-rose-100 shadow-md rounded-lg"
          >
            <div className="rounded-lg p-4 text-black dark:text-stone-300 transition-colors flex  justify-center flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileTextIcon className="h-6 w-6" />
                  <span className="text-md font-semibold">{link.title}</span>
                </div>
              </div>
              <div className="text-xs mt-3">
                {link.description || "No description available"}
              </div>
            </div>
            <div className="items-center flex">
              <div
                className="h-16 sm:hidden md:block w-16 text-blacks fill-currents fill-stone-400"
                style={{ width: "64px", height: "64px" }}
                dangerouslySetInnerHTML={{
                  __html: link.svg.replace(/fill="#\w+"/g, ""),
                }}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default arr;
