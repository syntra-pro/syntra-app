import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { firebaseConfig } from './firebaseConfig';
import fs from 'fs';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export async function uploadToFirebaseStorage(
  filePath: string,
  folder: string,
): Promise<string | null> {
  try {
    const fileBuffer = await fs.promises.readFile(filePath);
    const fileName = `${folder}/${filePath.split('/').pop() || 'file'}`;
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, fileBuffer);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading to Firebase Storage:', error);
    return null;
  }
}
