import { FileTextIcon } from "lucide-react";
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
  return (
    <div className=" w-full grid grid-cols-2 gap-4 mb-6">
      {arrayLinks.map((link: any, key: number) => (
        <Link key={key} target="_blank" href={link.url}>
          <div
            key={key}
            className="flex justify-between px-4 h-28 py-2 bg-stone-100 hover:bg-rose-100 shadow-md rounded-lg"
          >
            <div className="rounded-lg p-4 text-black transition-colors flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileTextIcon className="h-6 w-6" />
                  <span className="text-md font-semibold">{link.title}</span>
                </div>
              </div>
              <div className="text-xs mt-2 text-black">
                {link.description || "No description available"}
              </div>
            </div>
            <div className="items-center flex">
              <FileTextIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default arr;
