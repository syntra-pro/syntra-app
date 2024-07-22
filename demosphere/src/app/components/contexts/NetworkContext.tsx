import React, { ReactNode, createContext, useContext, useState } from "react";

interface NetworkContextType {
  network: string;
  setNetwork: (newNetwork: string) => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const NetworkProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [network, setNetwork] = useState<string>("");

  const handleSetNetwork = (newNetwork: string) => {
    setNetwork(newNetwork);
  };

  return (
    <NetworkContext.Provider
      value={{
        network,
        setNetwork: handleSetNetwork,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return context;
};
