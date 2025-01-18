'use server';
// import { db, firebaseConfig } from '../../../lib/firebaseConfig';
// import { doc, setDoc } from 'firebase/firestore';
// import { get, getDatabase, push, ref, set } from 'firebase/database';

import { NextResponse } from 'next/server';
import { getDocument } from '../../../lib/firestore';
// import { initializeApp } from 'firebase/app';

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

export async function GET(req: Request) {
  return getDocument('settings', 'lvhor5qkWfS8PwfQR7y5')
    .then(p => {
      console.log('p ', p);

      return NextResponse.json({ p }, { status: 200 });
    })
    .catch(err => {
      return NextResponse.json(
        { error: 'No documents found in the folder' },
        { status: 404 },
      );
    });
}

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//       pathName,
//       content,
//       title,
//       link,
//       priority,
//       project,
//       tags,
//       collabs,
//       isNew,
//     } = body;

//     if (!pathName || typeof content !== 'string') {
//       return NextResponse.json(
//         { error: 'Folder, Document ID, and content are required' },
//         { status: 400 },
//       );
//     }

//     if (isNew) {
//       const incompletePath = `documents/${pathName}`;
//       console.log('incompletePath ', incompletePath);
//       const newDocRef = push(ref(database, incompletePath));
//       await set(newDocRef, {
//         content,
//         title,
//         link,
//         priority,
//         project,
//         tags,
//         collabs,
//       });

//       return NextResponse.json(
//         { message: 'Document created successfully', id: newDocRef.key },
//         { status: 201 },
//       );
//     } else {
//       const docRef = ref(database, `documents/${pathName}`);
//       await set(docRef, {
//         content,
//         title,
//         link,
//         priority,
//         project,
//         tags,
//         collabs,
//       });

//       // TODO Erase from route 0

//       return NextResponse.json(
//         { message: 'Document updated successfully' },
//         { status: 200 },
//       );
//     }
//   } catch (error) {
//     console.error('Error handling POST request:', error);
//     return NextResponse.json(
//       { error: 'Internal Server Error' },
//       { status: 500 },
//     );
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const docRef = doc(db, 'daos', 'optimism', 'templates', '001');

//     // Guardar el documento en Firestore
//     await setDoc(docRef, body);

//     // Retornar respuesta exitosa
//     return NextResponse.json(
//       { message: 'Documento guardado con éxito' },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error('Error guardando el documento: ', error);
//     return NextResponse.json(
//       { error: 'Error guardando el documento' },
//       { status: 500 },
//     );
//   }
// }
