'use client';

import {
  BackpackIcon,
  CaretRightIcon,
  TriangleRightIcon,
} from '@radix-ui/react-icons';

import { ALL_DOCS_FOLDER } from '../../lib/constants';
import { useState } from 'react';

interface ProjectListProps {
  projects: any[];
  handleSelect: (projectName: string) => void;
}

export const ProjectList = ({ projects, handleSelect }: ProjectListProps) => {
  const [selectedP, setSelectedP] = useState(ALL_DOCS_FOLDER);
  console.log('projects ', projects);
  const handleClick = (project: string) => {
    setSelectedP(project);
    handleSelect(project);
  };

  return projects.map((p, k) => (
    <div key={k}>
      <button
        onClick={e => handleClick(p.project)}
        className={`${
          selectedP === p.project
            ? 'bg-stone-200 dark:bg-stone-500 dark:text-stone-800'
            : 'bg-transparent '
        } hover:bg-stone-200 dark:hover:bg-stone-500 hover:dark:text-stone-800
                        px-4 py-2 rounded-md cursor-pointer w-full
                        text-sm flex justify-between`}>
        <div className={`flex items-center gap-2`}>
          {/* {selectedP === p.project ? (
            <CaretRightIcon />
          ) : (
            <div style={{ width: '15px' }}> </div>
          )} */}
          <span>{p.project}</span>
        </div>
        <span className="text-right font-light">{p.drafts} draft(s)</span>
      </button>
    </div>
  ));
};
