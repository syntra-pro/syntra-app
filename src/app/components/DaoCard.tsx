import Link from 'next/link';
import React from 'react';

interface DaoCardProps {
  colour: string;
  path: string;
  drafts?: number;
  projects: number;
  name: string;
  disabled: boolean;
  svg: string;
}

const DaoCard: React.FC<DaoCardProps> = ({
  colour,
  path,
  drafts,
  projects,
  name,
  disabled,
  svg,
}) => {
  const encodedSvg = encodeURIComponent(svg);

  return disabled ? (
    <div
      className="flex opacity-50 items-center gap-2 rounded-lg
   text-sm font-medium text-gray-500   dark:text-gray-400 shadow-md
   bg-stone-100
   ">
      <div className="rounded-lg p-4 w-64 h-56">
        <div className={`w-56 h-32 mb-2 rounded-lg ${colour}`}></div>
        <div className="text-2xl font-semibold">{name}</div>
        {/* <div className="text-xs mt-1">{drafts} Drafts</div> */}
      </div>
    </div>
  ) : (
    <Link
      className="flex items-center gap-2 border border-stone-200 dark:border-stone-700 rounded-lg shadow-md
   text-sm font-medium text-gray-500 transition-colors dark:text-gray-400"
      href={path}>
      <div className="rounded-lg p-4 w-64 h-56">
        <div
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodedSvg}")`,
            backgroundSize: 'calc(100% - 24px) auto', // Restamos 8px en total (4px de cada lado)
            backgroundPosition: 'center', // Centramos la imagen
            backgroundRepeat: 'no-repeat', // Evita que se repita
            // width: '200px',
            // height: '200px',
          }}
          className={`w-56 h-32 mb-2 rounded-lg ${colour}`}></div>
        <div className="text-2xl font-semibold">{name}</div>
        {/* <div className="text-xs mt-1">{drafts} Drafts</div> */}
      </div>
    </Link>
  );
};

export default DaoCard;
