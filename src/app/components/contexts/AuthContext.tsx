"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, usePrivy } from "@privy-io/react-auth";

interface AuthContextType {
  authenticated: boolean;
  user: User | null;
  ready: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const [authState, setAuthState] = useState<
    Omit<AuthContextType, "login" | "logout">
  >({
    authenticated: false,
    user: null,
    ready: false,
  });

  useEffect(() => {
    // console.log("ready ", ready);

    if (ready) {
      setAuthState({ authenticated, user, ready });
    }
  }, [ready, authenticated, user]);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
