'use client';

import React, { useEffect, useRef } from 'react';

import { setBlockie } from '../../../lib/utils';

interface ChipsProps {
  text: string;
}

const Chip: React.FC<ChipsProps> = ({ text }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setBlockie(canvasRef, text);
  }, [text]);

  return (
    <div className="py-1 px-2 rounded-full justify-center items-center gap-1 inline-flex">
      <div className="justify-center items-center gap-1 flex">
        <canvas
          ref={canvasRef}
          width={26}
          height={26}
          className="w-[26px] h-[26px] rounded-[14px] border border-stone-400"
        />
        <div className="text-center text-neutral-700 dark:text-neutral-300 text-sm">
          {text}
        </div>
      </div>
    </div>
  );
};

export default Chip;
