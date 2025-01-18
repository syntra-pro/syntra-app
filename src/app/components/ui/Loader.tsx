'use client';
interface LoaderProps {
  fullWidth?: boolean;
}

const Loader = ({ fullWidth = true }: LoaderProps) => (
  <div
    className={`flex  ${
      fullWidth ? ' w-full ' : ' px- '
    } items-center justify-center bg-transparent`}>
    <div className="relative inline-flex">
      <div className="w-4 h-4 bg-rose-300 rounded-full"></div>
      <div className="w-4 h-4 bg-rose-300 rounded-full absolute top-0 left-0 animate-ping"></div>
      <div className="w-4 h-4 bg-rose-300 rounded-full absolute top-0 left-0 animate-pulse"></div>
    </div>
  </div>
);

export default Loader;
