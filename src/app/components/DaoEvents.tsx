import Link from "next/link";
import React from "react";
import { localTime } from "../../lib/utils";

interface DaoEventProps {
  id: number;
  updated: Date;
  summary: string;
  creatorEmail: string;
  htmlLink: string;
  start: Date;
  startTimezone: string;
  end: Date;
  endTimeZone: string;
  hangoutLink: string;
}

const DaoEvent: React.FC<DaoEventProps> = ({
  id,
  updated,
  summary,
  creatorEmail,
  htmlLink,
  start,
  startTimezone,
  end,
  endTimeZone,
  hangoutLink,
}) => {
  return !id ? (
    <div
      className="flex opacity-70 items-center gap-2 rounded-lg
   text-sm font-medium text-gray-500 transition-colors dark:text-gray-400
   bg-stone-100
   "
    >
      empty
    </div>
  ) : (
    <div className="bg-yellow-50 p-3 shadow-md w-60 rounded-lg">
      <p className="text-xs text-stone-500 text-right w-full mb-3">
        {localTime(start.toString(), startTimezone)}
      </p>

      <div className="w-full h-20 mb-3 font-mono leading-tight tracking-tight ">
        {summary}
      </div>
      {/* text-sm text-gray-500 transition-colors dark:text-gray-400 */}

      <div className="flex justify-betweens gap-2 justify-end mb-3">
        <Link
          href={hangoutLink}
          target="_blank"
          className="bg-amber-100 text-black px-2 py-1 rounded-md"
          title="Link to conference"
        >
          🎥
        </Link>

        <Link
          href={htmlLink}
          target="_blank"
          className="bg-amber-100 text-black px-2 py-1 rounded-md"
          title="Link to original event"
        >
          🗓️
        </Link>
      </div>

      <small
        title={creatorEmail}
        className="text-stone-400 italic truncate block max-w-xs "
      >
        Created by:
        <br />
        {creatorEmail}
      </small>
    </div>
  );
};

export default DaoEvent;
