'use client';

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User, usePrivy } from '@privy-io/react-auth';
import { signInWithCustomToken, signOut } from 'firebase/auth';

import { firebaseAuth } from '../../../lib/firebaseClient';
import { useRouter } from 'next/navigation';

interface AuthState {
  authenticated: boolean;
  user: User | null;
  ready: boolean;
  firebaseUser: any | null;
  isAdmin: boolean;
}

type AuthContextType = AuthState & {
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Function to authenticate with Firebase
const authenticateWithFirebase = async (walletAddress: string) => {
  try {
    if (!walletAddress) {
      throw new Error('Invalid wallet address');
    }

    const response = await fetch('/api/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress }),
    });

    if (!response.ok) {
      throw new Error('Error fetching custom token');
    }

    const { customToken, user } = await response.json();

    // FIXME Sign in with the custom token in Firebase
    const userCredential = await signInWithCustomToken(
      firebaseAuth,
      customToken,
    );
    const idToken = await firebaseAuth.currentUser?.getIdToken();

    // Return all the required data
    return {
      walletAddress,
      customToken,
      idToken,
      isAdmin: user?.data?.isAdmin || false,
    };
  } catch (error) {
    console.error('Error in authenticateWithFirebase:', error);
    throw error;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const [authState, setAuthState] = useState<AuthState>({
    authenticated: false,
    user: null,
    ready: false,
    firebaseUser: null,
    isAdmin: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated && user?.wallet?.address) {
      authenticateWithFirebase(user.wallet.address)
        .then(({ walletAddress, customToken, idToken, isAdmin }) => {
          setAuthState(prevState => ({
            ...prevState,
            firebaseUser: { walletAddress, customToken, idToken },
            isAdmin,
            authenticated,
            user,
            ready,
          }));
        })
        .catch(error =>
          console.error('Error authenticating custom token:', error),
        );
    } else {
      setAuthState(prevState => ({
        ...prevState,
        authenticated,
        user,
        ready,
      }));
    }
  }, [ready, authenticated, user]);

  const handleLogout = async () => {
    try {
      await logout();
      await signOut(firebaseAuth);
      setAuthState({
        authenticated: false,
        user: null,
        ready: false,
        firebaseUser: null,
        isAdmin: false,
      });
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
