"use client";

import React, { createContext, useContext, useState } from "react";

type VerificationContextType = {
  isVerified: boolean;
  setIsVerified: (value: boolean) => void;
};

const VerificationContext = createContext<VerificationContextType | undefined>(
  undefined
);

export const VerificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <VerificationContext.Provider value={{ isVerified, setIsVerified }}>
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (context === undefined) {
    throw new Error(
      "useVerification must be used within a VerificationProvider"
    );
  }
  return context;
};
