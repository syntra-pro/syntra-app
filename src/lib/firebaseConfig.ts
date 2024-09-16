import { getApp, getApps, initializeApp } from 'firebase/app';

// import { cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}',
);

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NFIREBASE_PROJECT_ID,
  storageBucket: 'demosphere-web3.appspot.com',
  messagingSenderId: '37949963488',
  appId: '1:37949963488:web:90296ecb9a4b25d2f0a485',
  // credential: cert(serviceAccount),
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(app);
const database = getDatabase(app);

export { app, database, db };
