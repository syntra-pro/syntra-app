"use client";
const Loader = () => (
  <div className="flex  w-full items-center justify-center bg-transparent">
    <div className="relative inline-flex">
      <div className="w-4 h-4 bg-rose-300 rounded-full"></div>
      <div className="w-4 h-4 bg-rose-300 rounded-full absolute top-0 left-0 animate-ping"></div>
      <div className="w-4 h-4 bg-rose-300 rounded-full absolute top-0 left-0 animate-pulse"></div>
    </div>
  </div>
);

export default Loader;
