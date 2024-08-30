import {
  DocumentData,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebaseConfig";

export async function getDocument(
  collectionName: string,
  documentId: string
): Promise<DocumentData | null> {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No such document!");
      return null;
    }

    const data = docSnap.data();
    const subcollections = ["links", "templates", "settings"];
    const result: DocumentData = { ...data };

    for (const subcollectionName of subcollections) {
      const subcollectionRef = collection(docRef, subcollectionName);
      const subcollectionSnap = await getDocs(subcollectionRef);

      result[subcollectionName] = subcollectionSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }
    return result;
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
}
