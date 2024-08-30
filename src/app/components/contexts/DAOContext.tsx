"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface DAOContextProps {
  logo: string;
  setLogo: (logo: string) => void;
  color: string;
  setColor: (color: string) => void;
}

const DAOContext = createContext<DAOContextProps | undefined>(undefined);

export const useDAO = () => {
  const context = useContext(DAOContext);
  if (!context) {
    throw new Error("useDAO must be used inside DAOProvider");
  }
  return context;
};

export const DAOProvider = ({ children }: { children: ReactNode }) => {
  const [logo, setLogo] = useState<string>("");
  const [color, setColor] = useState<string>("");

  return (
    <DAOContext.Provider value={{ logo, setLogo, color, setColor }}>
      {children}
    </DAOContext.Provider>
  );
};
