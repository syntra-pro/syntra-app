'use server';

import { get, getDatabase, push, ref, remove, set } from 'firebase/database';

import { NextResponse } from 'next/server';
import { firebaseConfig } from '../../../lib/firebaseConfig';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const folder = searchParams.get('folder');
    const documentId = searchParams.get('documentId');

    if (documentId) {
      const docRef = ref(database, `/documents/${documentId}`);
      const snapshot = await get(docRef);
      const data = snapshot.val();

      if (snapshot.exists()) {
        return NextResponse.json(data, { status: 200 });
      } else {
        return NextResponse.json([], { status: 200 });
      }
    } else {
      // allDocs
      const folderRef = ref(database, `${folder}`);
      const snapshot = await get(folderRef);
      const data = snapshot.val();

      if (snapshot.exists()) {
        const documents = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        return NextResponse.json({ documents }, { status: 200 });
      } else {
        return NextResponse.json({ documents: [] }, { status: 200 });
      }
    }
  } catch (error) {
    console.error('Error handling GET request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      pathName,
      content,
      title,
      link,
      priority,
      project,
      tags,
      collabs,
      isNew,
    } = body;

    if (!pathName || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Folder, Document ID, and content are required' },
        { status: 400 },
      );
    }

    console.log('CONTENT ', content);
    if (isNew) {
      const incompletePath = `documents/${pathName}`;
      console.log('incompletePath ', incompletePath);
      const newDocRef = push(ref(database, incompletePath));
      await set(newDocRef, {
        content,
        title,
        link,
        priority,
        project,
        tags,
        collabs,
      });

      return NextResponse.json(
        { message: 'Document created successfully', id: newDocRef.key },
        { status: 201 },
      );
    } else {
      const docRef = ref(database, `documents/${pathName}`);
      await set(docRef, {
        content,
        title,
        link,
        priority,
        project,
        tags,
        collabs,
      });

      // TODO Erase from route 0

      return NextResponse.json(
        { message: 'Document updated successfully' },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { pathName } = body;
    console.log('path ', pathName);

    if (!pathName) {
      // daoname/wallet/documentId
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 },
      );
    }

    const doc = `documents/${pathName}`;
    const docRef = ref(database, doc);

    await remove(docRef);

    return NextResponse.json(
      { message: 'Document deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error handling DELETE request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     if (body.isNew) {
//       const { pathName, content, title, priority, project, tags, collabs } =
//         body;

//       if (!pathName || typeof content !== "string") {
//         return NextResponse.json(
//           { error: "Folder, Document ID, and content are required" },
//           { status: 400 }
//         );
//       }

//       const incompletePath=  `documents/${pathName}`

//       const docRef = ref(database, `/${incompletePath}/[ADDHERE THE RANDOM ID]`); //  /arbitrum/0x014FFCF34D8515535b99d6AEF654258c237168B6/1 where 1 should be a random ID
//       await set(docRef, { content, title, priority, project, tags, collabs });

//       return NextResponse.json(
//         { message: "Document updated successfully" },
//         { status: 200 }
//       );
//     } else {
//       const { pathName, content, title, priority, project, tags, collabs } =
//         body;
//       console.log("doc ", body);
//       if (!pathName || typeof content !== "string") {
//         return NextResponse.json(
//           { error: "Folder, Document ID, and content are required" },
//           { status: 400 }
//         );
//       }

//       const docRef = ref(database, `documents/${pathName}`); //  /arbitrum/0x014FFCF34D8515535b99d6AEF654258c237168B6/1
//       await set(docRef, { content, title, priority, project, tags, collabs });

//       return NextResponse.json(
//         { message: "Document updated successfully" },
//         { status: 200 }
//       );
//     }
//   } catch (error) {
//     console.error("Error handling POST request:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
