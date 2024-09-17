import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  // const serviceAccount = JSON.parse(
  //   process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string,
  // );
  // const sa: admin.ServiceAccount = {
  //   clientEmail: process.env.FIREBASE_PROJECT_ID,
  //   privateKey: process.env.FIREBASE_PRIVATE_KEY,
  //   clientEmail: process.env.FIREBASE_EMAIL,
  // };
  // auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  // tokenUri: 'https://oauth2.googleapis.com/token',
  // client_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  // auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  // client_x509_cert_url:
  //  'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6dwvg%40demosphere-web3.iam.gserviceaccount.com',
  // universe_domain: 'googleapis.com',
}

// const ao: admin.AppOptions = {
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   credential: admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY,
//     clientEmail: process.env.FIREBASE_EMAIL,
//   }),
// };

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_EMAIL}`,
};

if (!admin.apps.length) {
  admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://demosphere-web3-default-rtdb.firebaseio.com',
  });
}

// admin.initializeApp(ao);
const adminAuth = admin.auth();

export { adminAuth };
