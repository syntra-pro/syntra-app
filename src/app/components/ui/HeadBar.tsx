'use client';

import { useEffect, useState } from 'react';

import { BlankLink } from '../BlankLink';
import { LoginButton } from './LoginButton';
import { useAuth } from '../contexts/AuthContext';
import { useDAO } from '../contexts/DAOContext';
import { useParams } from 'next/navigation';

// import WorldIDVerifier from "../WorldBadge";

interface HeadBarProps {
  showDropdown?: boolean;
}

export const HeadBar = ({ showDropdown = false }: HeadBarProps) => {
  const { authenticated, user } = useAuth();

  const [address, setAddress] = useState<boolean>(false);
  const par = useParams();
  const id = par.id as string;
  const { logo, color, setLogo, setColor, colorDark, setColorDark } = useDAO();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    setAddress(authenticated);
  }, [authenticated, user]);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // const handleBack = () => {
  //   setColor("stone-100");
  //   setColorDark("stone-900");
  //   setLogo("");
  // };

  return (
    <header
      className="w-[calc(100%-10rem)] ml-44 mr-0 shadow-md fixed top-0 right-00 z-30 flex h-12 items-center"
      style={{
        backgroundColor:
          logo === ''
            ? isDarkMode
              ? '#1c1917'
              : '#f5f5f4'
            : isDarkMode
            ? colorDark
            : color,
      }}>
      <div className=" containers flex items-center w-full justify-between px-4 md:px-6">
        <>
          <span className="  flex gap-2 dark:text-stone-300 items-center">
            {id?.length > 0 && (
              <>
                <BlankLink className="text-xl opacity-40" href={'/dao-manager'}>
                  ←
                </BlankLink>
              </>
            )}
          </span>
        </>
        <div className="w-full text-center flex justify-center text-lg">
          {logo === '' ? (
            id?.length > 0 &&
            // id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
            ''
          ) : (
            <div dangerouslySetInnerHTML={{ __html: logo }} />
          )}
        </div>

        {/* <WorldIDVerifier /> */}
        <>
          <LoginButton />
        </>
      </div>
    </header>
  );
};
