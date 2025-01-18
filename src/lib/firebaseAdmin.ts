import admin from 'firebase-admin';
import { firebaseConfig } from './firebaseConfig';

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, '\n');
}

export async function adminAuth() {
  const params = firebaseConfig;
  const privateKey = formatPrivateKey(params.privateKey);

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  });

  const auth = admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
    databaseURL: params.databaseURL,
  });

  return auth;
}
