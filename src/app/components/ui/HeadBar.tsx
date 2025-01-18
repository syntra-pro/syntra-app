'use client';

import { useEffect, useState } from 'react';

import { ArrowLeftIcon } from 'lucide-react';
import { BlankLink } from '../BlankLink';
import Loader from './Loader';
import { LoginButton } from './LoginButton';
import { useAuth } from '../contexts/AuthContext';
import { useDAO } from '../contexts/DAOContext';
import { useParams } from 'next/navigation';
import { useTheme } from 'next-themes';

// import WorldIDVerifier from "../WorldBadge";

interface HeadBarProps {
  showDropdown?: boolean;
}

export const HeadBar = ({ showDropdown = false }: HeadBarProps) => {
  const { authenticated, user } = useAuth();

  const [address, setAddress] = useState<boolean>(false);
  const par = useParams();
  const id = par.id as string;
  const {
    logo,
    color,
    setLogo,
    setColor,
    colorDark,
    setColorDark,
    showLoader,
    showBack,
  } = useDAO();
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    if (!user) {
      return;
    }
    setAddress(authenticated);
  }, [authenticated, user]);

  const isDarkMode = systemTheme !== 'light';

  return (
    <header
      className="w-[calc(100%-10rem)] ml-44 transition-colors mr-0 fixed shadow-smx top-0 right-00 z-30 flex h-12 items-center"
      style={{
        backgroundColor:
          typeof systemTheme === 'undefined'
            ? '#6363630f'
            : logo === ''
            ? isDarkMode
              ? '#1c1917'
              : '#f5f5f4'
            : isDarkMode
            ? colorDark
            : color,
      }}>
      <div className=" containers flex items-center w-full justify-between px-4 md:px-6">
        <>
          {showLoader ? (
            <Loader fullWidth={false} />
          ) : (
            <span className="flex gap-2 dark:text-stone-300 items-center">
              {id?.length > 0 && showBack && (
                <BlankLink className="text-xl opacity-40" href={'/dao-manager'}>
                  <ArrowLeftIcon width={16} height={16} />
                </BlankLink>
              )}
            </span>
          )}
        </>
        <div className="w-full text-center flex justify-center text-lg">
          {logo === '' ? (
            id?.length > 0 &&
            // id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
            ''
          ) : (
            <>
              <div dangerouslySetInnerHTML={{ __html: logo }} />
            </>
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
