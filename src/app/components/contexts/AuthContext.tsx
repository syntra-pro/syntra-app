'use client';

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User, usePrivy } from '@privy-io/react-auth';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signOut } from 'firebase/auth';

import { useRouter } from 'next/navigation';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// const firebaseApp = initializeApp(firebaseConfig);
// const firebaseAuth = getAuth(firebaseApp);

let firebaseApp;

if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

const firebaseAuth = getAuth(firebaseApp);

interface AuthContextType {
  authenticated: boolean;
  user: User | null;
  ready: boolean;
  login: () => void;
  logout: () => void;
  firebaseUser: any | null;
  isAdmin: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const [firebaseUser, setFirebaseUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();

  const [authState, setAuthState] = useState<
    Omit<AuthContextType, 'login' | 'logout'>
  >({
    authenticated: false,
    user: null,
    ready: false,
    firebaseUser: null,
    isAdmin: false,
  });

  // get custom tokens
  useEffect(() => {
    const authenticateWithFirebase = async (walletAddress: string) => {
      try {
        if (walletAddress === '' || typeof walletAddress === 'undefined')
          return;

        const response = await fetch('/api/custom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress }),
        });

        if (!response.ok) {
          throw new Error('Error getting custom token');
        }

        const { customToken, user } = await response.json();

        console.log('firebaseAuth ', firebaseAuth);
        setIsAdmin(user?.data?.isAdmin || false);
        const userCredential = await signInWithCustomToken(
          firebaseAuth,
          customToken,
        );

        setFirebaseUser(userCredential.user);
      } catch (error) {
        console.error('Error authenticating custom token:', error);
      }
    };

    if (ready && authenticated && user) {
      const walletAddress = user.wallet?.address;

      if (walletAddress) {
        authenticateWithFirebase(walletAddress);
      }

      setAuthState(prevState => ({
        ...prevState,
        authenticated,
        user,
        ready,
        isAdmin,
      }));
    }
  }, [ready, authenticated, user, isAdmin]);

  const handleLogout = () => {
    console.log('saliendo...');
    return logout()
      .then(() => {
        console.log('salido. ');

        signOut(firebaseAuth);
      })
      .then(() => {
        setFirebaseUser(null);
        router.push('/');
      })
      .catch(e => console.log('eeee ', e));
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, login, logout: handleLogout, firebaseUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be within AuthProvider');
  }
  return context;
};
