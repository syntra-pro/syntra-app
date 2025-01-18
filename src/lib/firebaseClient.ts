import { getApp, getApps, initializeApp } from 'firebase/app';

// FIXME
import { firebaseConfig } from './firebaseConfig';
import { getAuth } from 'firebase/auth';

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const firebaseAuth = getAuth(firebaseApp);

export { firebaseApp, firebaseAuth };
