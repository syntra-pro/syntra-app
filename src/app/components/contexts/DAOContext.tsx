'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

interface DAOContextProps {
  logo: string;
  setLogo: (logo: string) => void;
  color: string;
  setColor: (color: string) => void;
  colorDark: string;
  setColorDark: (color: string) => void;
  name: string;
  setName: (name: string) => void;
  showLoader: boolean;
  setShowLoader: (fullWidth: boolean) => void;
  showBack: boolean;
  setShowBack: (showBack: boolean) => void;
  daoAddress: string;
  setDaoAddress: (daoAddress: string) => void;
}

const DAOContext = createContext<DAOContextProps | undefined>(undefined);

export const useDAO = () => {
  const context = useContext(DAOContext);
  if (!context) {
    throw new Error('useDAO must be used inside DAOProvider');
  }
  return context;
};

export const DAOProvider = ({ children }: { children: ReactNode }) => {
  const [logo, setLogo] = useState<string>('');
  const [color, setColor] = useState<any>();
  const [colorDark, setColorDark] = useState<any>();
  const [name, setName] = useState<string>('');
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showBack, setShowBack] = useState<boolean>(false);
  const [daoAddress, setDaoAddress] = useState<string>('');

  return (
    <DAOContext.Provider
      value={{
        logo,
        setLogo,
        color,
        setColor,
        colorDark,
        setColorDark,
        name,
        setName,
        showLoader,
        setShowLoader,
        showBack,
        setShowBack,
        daoAddress,
        setDaoAddress,
      }}>
      {children}
    </DAOContext.Provider>
  );
};
