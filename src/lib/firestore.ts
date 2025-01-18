'use server';

import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

import { db } from './firebaseConfig';
import { getAuth } from 'firebase-admin/auth';

export async function getDocument(
  collectionName: string,
  documentId: string,
): Promise<DocumentData | null> {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log('No such document!');
      return null;
    }

    const data = docSnap.data();
    const subcollections = ['links', 'templates', 'settings'];
    const result: DocumentData = { ...data };

    for (const subcollectionName of subcollections) {
      const subcollectionRef = collection(docRef, subcollectionName);
      const subcollectionSnap = await getDocs(subcollectionRef);

      result[subcollectionName] = subcollectionSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    }
    return result;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}

//isAdmin
export async function getUser(
  collectionName: string,
  documentId: string,
): Promise<DocumentData | null> {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log('No such document!');
      return null;
    }

    const data = docSnap.data();
    const result: DocumentData = { data };
    return result;
  } catch (error) {
    console.error('>>>>.... Error fetching document:', error);
    throw error;
  }
}

export async function updateDocument(
  collectionName: string,
  documentId: string,
  data: Record<string, any>,
  token: string,
): Promise<any> {
  try {
    const auth = getAuth();
    const user = await auth.verifyIdToken(token);
    const userId = user.uid;

    const docRef = doc(db, 'users', userId);
    await setDoc(docRef, data, { merge: true });

    console.log(
      `Document ${documentId} in ${collectionName} updated successfully.`,
    );

    return true;
  } catch (error) {
    console.error('--Error updating document:', error);
    throw error;
  }
}
