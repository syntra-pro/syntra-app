'use client';

import React, { useEffect, useRef } from 'react';

import blockies from 'ethereum-blockies';

interface ChipsProps {
  text: string;
}

const Chip: React.FC<ChipsProps> = ({ text }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && text) {
      const cleanedText = text.trim().toLowerCase();
      const blockie = blockies.create({
        seed: cleanedText,
        color: '#006300',
        bgcolor: '#ffffff',
        size: 8,
        scale: 4,
      });
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        ); // cleans
        context.drawImage(blockie, 0, 0, 26, 26);
      }
    }
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
