import Link from "next/link";
import React from "react";

interface DaoCardProps {
  colour: string;
  path: string;
  collabs: number;
  projects: number;
  name: string;
  disabled: boolean;
}

const DaoCard: React.FC<DaoCardProps> = ({
  colour,
  path,
  collabs,
  projects,
  name,
  disabled,
}) => {
  return disabled ? (
    <div
      className="flex opacity-70 items-center gap-2 rounded-lg
   text-sm font-medium text-gray-500 transition-colors dark:text-gray-400
   bg-stone-100
   "
    >
      <div className="rounded-lg p-4 w-70 h-60">
        <div className={`w-60 h-32 mb-2 rounded-lg ${colour}`}></div>
        <p className="text-2xl font-semibold">{name}</p>
        <p className="text-xs">{collabs} Collaborators</p>
        <p className="text-xs">{projects} Projects</p>
      </div>
    </div>
  ) : (
    <Link
      className="flex items-center gap-2 bg- border border-stone-500 rounded-lg
   text-sm font-medium text-gray-500 transition-colors dark:text-gray-400"
      href={path}
    >
      <div className="rounded-lg p-4 w-70 h-60">
        <div className={`w-60 h-32 mb-2 rounded-lg ${colour}`}></div>
        <p className="text-2xl font-semibold">{name}</p>
        <p className="text-xs">{collabs} Collaborators</p>
        <p className="text-xs">{projects} Projects</p>
      </div>
    </Link>
  );
};

export default DaoCard;
