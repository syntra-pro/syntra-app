import { Calendar } from "lucide-react";
import React from "react";

const ArbitrumAnn = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="px-4 pb-4 dark:text-stone-200">
      <div
        className=" text-stone-600 dark:text-stone-200 text-centers text-lg 
      font-semibold  mb-4  pt-3  "
      >
        Weekly Calendar
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={day}
            className="bg-stone-50 dark:bg-stone-600 p-2 rounded shadow-md"
          >
            <h3 className="text-xs font-mono text-stone-500 dark:text-stone-300 font-thin text-center mb-2">
              {day}
            </h3>
            <div className=" tracking-tight" style={{ fontSize: "8pt" }}>
              {index === 0 && (
                <div className="bg-gray-300 dark:bg-gray-700 px-3 py-2 rounded mb-1">
                  <Calendar className="inline-block mr-1" size={12} />
                  Post Tally proposals
                </div>
              )}
              {index <= 2 && (
                <div className="bg-slate-200 dark:bg-slate-800 px-3 py-2 rounded mb-1">
                  <Calendar className="inline-block mr-1" size={12} />
                  Schedule Snapshot votes
                </div>
              )}
              {index === 3 && (
                <div>
                  <div className="bg-orange-50 dark:bg-orange-950 px-3 py-2 rounded mb-1">
                    <Calendar className="inline-block mr-1" size={12} />
                    Snapshot votes start
                  </div>
                  <div className="bg-rose-200 dark:bg-rose-800 px-3 py-2 rounded">
                    <Calendar className="inline-block mr-1" size={12} />
                    Tally votes start
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-stone-600 dark:text-stone-400">
        <div>* Votes are encouraged to start before Thursday at 12 pm UTC.</div>
        <div>
          * Holiday break: December 20 - January 6th (No new proposals,
          emergency votes only)
        </div>
      </div>
    </div>
  );
};

export default ArbitrumAnn;
