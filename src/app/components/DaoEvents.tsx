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
      empty event
    </div>
  ) : (
    <div className="bg-rose-50 dark:bg-stone-700 p-2 shadow-md w-60 rounded-lg">
      {/* upper titles  */}
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-stone-500 dark:text-stone-400">
          {start && localTime(start.toString(), startTimezone)}
        </span>

        <div className="flex gap-1 justify-end">
          {hangoutLink && (
            <Link
              href={hangoutLink}
              target="_blank"
              className="bg-rose-200 dark:bg-stone-400 text-black  text-xs px-2 py-1 rounded-md"
              title="Link to conference"
            >
              🎥
            </Link>
          )}

          {htmlLink && (
            <Link
              href={htmlLink}
              target="_blank"
              className="bg-rose-200 dark:bg-stone-400 text-black text-xs px-2 py-1 rounded-md"
              title="Link to original event"
            >
              🗓️
            </Link>
          )}
        </div>
      </div>

      <div
        className="w-full h-14 my-2 font-mono text-sm leading-tight tracking-tight 
      overflow-hidden whitespace-nowraps"
      >
        <span
          title={summary}
          className="inline-block animate-scroll dark:text-stone-300"
        >
          {summary}
        </span>
      </div>
    </div>
  );
};

export default DaoEvent;
