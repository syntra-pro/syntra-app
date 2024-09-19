'use client';

import {
  CopyIcon,
  DotsVerticalIcon,
  DrawingPinIcon,
  ExternalLinkIcon,
  Link2Icon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { readDocument, removeDocument, upsertDocument } from '../../lib/utils';
import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useAuth } from './contexts/AuthContext';
import { useDAO } from './contexts/DAOContext';

interface DraftListProps {
  documents: any[];
  handleOpenDraft: (draftId: string) => void;
  afterOperation: () => void;
}

export const DraftList = ({
  documents,
  handleOpenDraft,
  afterOperation,
}: DraftListProps) => {
  const [visibleMenus, setVisibleMenus] = useState<{ [key: string]: boolean }>(
    {},
  );
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { name } = useDAO();
  const { user } = useAuth();

  const toggleMenuVisibility = (id: string) => {
    setVisibleMenus(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleClickOutside = (event: MouseEvent) => {
    Object.keys(menuRefs.current).forEach(key => {
      if (
        visibleMenus[key] &&
        menuRefs.current[key] &&
        !menuRefs.current[key]?.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(`#submenu-${key}`)
      ) {
        setVisibleMenus(prev => ({
          ...prev,
          [key]: false,
        }));
      }
    });
  };

  const handleDelete = async (id: string) => {
    const pathName = `${name}/${user?.wallet?.address}/${id}`;
    const response = await removeDocument(pathName);
    console.log('response ', response);
    if (!response) {
      throw new Error('Error deleting document');
    }
    toggleMenuVisibility(id);
    afterOperation();
  };

  const handleDuplicate = async (id: string) => {
    const data = await readDocument(`/${name}/${user?.wallet?.address}/${id}`);
    console.log('data ', data);
    const P = `/${name}/${user?.wallet?.address}/${new Date()
      .getTime()
      .toString()}`;
    console.log('P ', P);
    await upsertDocument(
      P,
      data.content,
      data.title,
      data.link || '',
      data.priority,
      data.project || 'xxx',
      data.tags || [],
      data.collabs || [],
    );
    toggleMenuVisibility(id);
    afterOperation();
  };

  const handlePin = async (id: string) => {
    // const pathName = `${name}/${user?.wallet?.address}/${id}`;
    // const response = await removeDocument(pathName);
    // console.log('response ', response);
    // if (!response) {
    //   throw new Error('Error deleting document');
    // }
    // afterOperation();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visibleMenus]);

  const adjustMenuPosition = (id: string) => {
    const menuElement = menuRefs.current[id];
    if (menuElement) {
      const rect = menuElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom > viewportHeight) {
        menuElement.style.transform = 'translateY(-100%)';
      } else {
        menuElement.style.transform = 'translateY(0)';
      }
    }
  };

  useEffect(() => {
    Object.keys(visibleMenus).forEach(id => {
      if (visibleMenus[id]) {
        adjustMenuPosition(id);
      }
    });
  }, [visibleMenus]);

  return documents
    .filter((r: any) => r.id !== '0')
    .map((i, k) => (
      <div
        className="w-full flex gap-3 rounded-md cursor-pointer items-center pl-4 pr-2
           hover:bg-stone-100 dark:hover:bg-stone-500 hover:dark:text-stone-900 relative"
        key={k}>
        <button
          className="w-full text-left"
          onClick={() => handleOpenDraft(i.id)}>
          <div className="py-2 text-sm w-full flex justify-between">
            <div className="flex gap-2 items-center">
              {i.title || `id #${i.id}`}

              {i.link !== '' && typeof i.link !== 'undefined' ? (
                <Link
                  title={`Draft has an associated link:\n ${i.link}`}
                  href={
                    i.link.startsWith('http') ? i.link : `https://${i.link}`
                  }
                  target="_blank"
                  rel="noopener noreferrer">
                  <Link2Icon className="hover:text-amber-700 dark:hover:text-amber-400" />
                </Link>
              ) : (
                <div className="px-2"></div>
              )}
            </div>
            <div
              className={`text-xs font-light ${
                i.priority === 'critical' &&
                'dark:bg-red-600 bg-rose-500 text-white'
              } w-14x text-center px-2 py-0`}>
              {i.project}
            </div>
          </div>
        </button>
        <button
          id={`submenu-${i.id}`}
          onClick={() => toggleMenuVisibility(i.id)}
          className="px-2 py-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-600 
            hover:dark:text-stone-300 outline-none relative">
          <DotsVerticalIcon />
        </button>

        {/* submenu */}
        {visibleMenus[i.id] && (
          <div
            id="submenu-content"
            ref={el => {
              menuRefs.current[i.id] = el;
            }}
            className="absolute z-50 bg-stone-100 dark:bg-stone-500 dark:text-stone-900 
              shadow-md flex flex-col rounded-sm"
            style={{
              top: '100%',
              right: 0,
              minWidth: '150px',
            }}>
            <button onClick={() => handlePin(i.id)} className="text-xs">
              <div
                className="flex gap-2 p-4 hover:bg-stone-200 dark:hover:bg-stone-600 rounded-sm
               hover:dark:text-stone-300 items-center">
                <DrawingPinIcon />
                Pin draft <small>(Soon™)</small>
              </div>
            </button>

            <button onClick={() => handleDelete(i.id)} className="text-xs">
              <div
                className="flex gap-2 p-4 hover:bg-stone-200 dark:hover:bg-stone-600 rounded-sm
               hover:dark:text-stone-300 items-center">
                <TrashIcon />
                Delete
              </div>
            </button>

            <button onClick={() => handleDuplicate(i.id)} className="text-xs">
              <div
                className="flex gap-2 p-4 hover:bg-stone-200 dark:hover:bg-stone-600 rounded-sm
               hover:dark:text-stone-300 items-center">
                <CopyIcon />
                Duplicate
              </div>
            </button>

            <button className="text-xs">
              <div
                className="flex gap-2 p-4 hover:bg-stone-200 dark:hover:bg-stone-600 rounded-sm
               hover:dark:text-stone-300 items-center">
                <ExternalLinkIcon />
                Open in new tab <small>(Soon™)</small>
              </div>
            </button>
          </div>
        )}
      </div>
    ));
};
