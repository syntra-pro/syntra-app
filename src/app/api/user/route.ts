import { getUser, updateDocument } from '../../../lib/firestore';

import { IncomingMessage } from 'http';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import { adminAuth } from '../../../lib/firebaseAdmin';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
// import { uploadToFirebaseStorage } from '../../../lib/storageFirebase'; // TBD
import { uploadToPinata } from '../../../lib/storageIPFSPinata';

async function streamToBuffer(stream: ReadableStream): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (value) chunks.push(value);
    done = readerDone;
  }

  return Buffer.concat(chunks);
}

async function convertNextRequestToIncomingMessage(
  req: Request,
): Promise<IncomingMessage> {
  const bodyBuffer = await streamToBuffer(req.body!);

  const readable = new Readable();
  readable._read = () => {};
  readable.push(bodyBuffer);
  readable.push(null);

  const incomingMessage = readable as IncomingMessage;
  incomingMessage.headers = Object.fromEntries(req.headers.entries());
  incomingMessage.method = req.method || 'GET';
  incomingMessage.url = req.url || '';

  return incomingMessage;
}

export async function POST(req: Request) {
  const form = formidable({ multiples: true });

  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { message: 'Missing or invalid Authorization header' },
      { status: 401 },
    );
  }
  const idToken = authHeader.split('Bearer ')[1];
  console.log('2 idToken', idToken);

  // Verifiy ID token
  const aa = (await adminAuth()).auth();
  const decodedToken = await aa.verifyIdToken(idToken);
  console.log('3 decodedToken', decodedToken);
  if (!decodedToken) {
    return NextResponse.json({ message: 'No auth' }, { status: 401 });
  }

  return new Promise<any>(async (resolve, reject) => {
    try {
      const incomingMessage = await convertNextRequestToIncomingMessage(req);

      form.parse(incomingMessage, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing form:', err);
          return reject(
            NextResponse.json({ error: 'Error parsing form' }, { status: 400 }),
          );
        }

        let updatedProfile = {};

        try {
          const profile = JSON.parse(
            Array.isArray(fields.profile)
              ? fields.profile[0]
              : fields.profile || '{}',
          );
          const avatar = files.avatar?.[0];
          const cover = files.cover?.[0];

          let avatarIPFSUrl = null;
          let avatarFBUrl = null;
          let coverIPFSUrl = null;
          let coverFBUrl = null;

          const readFileAsBase64 = async (filepath: string) => {
            const fileBuffer = await fs.readFile(filepath);
            return fileBuffer.toString('base64');
          };

          if (avatar) {
            console.log('avatar', avatar);
            const avatarContent = await readFileAsBase64(avatar.filepath);
            const avatarFileName = path.basename(avatar.filepath);
            avatarIPFSUrl = (
              await uploadToPinata(avatarFileName, avatarContent)
            ).cid;
            console.log('avatarIPFSUrl', avatarIPFSUrl);
            // avatarFBUrl = await uploadToFirebaseStorage(
            //   avatar.filepath,
            //   'avatars',
            // );
            updatedProfile = {
              ...profile,
              avatarIPFSUrl,
              avatarFBUrl,
            };
          }

          if (cover) {
            console.log('cover', cover);
            const coverContent = await readFileAsBase64(cover.filepath);
            const coverFileName = path.basename(cover.filepath);
            coverIPFSUrl = (await uploadToPinata(coverFileName, coverContent))
              .cid;

            // FIXME
            // coverFBUrl = await uploadToFirebaseStorage(
            //   cover.filepath,
            //   'covers',
            // );
            console.log('coverIPFSUrl', coverIPFSUrl);
            updatedProfile = {
              ...profile,
              coverIPFSUrl,
              coverFBUrl,
            };
          }

          updatedProfile = {
            ...profile,
          };

          const res = await updateDocument(
            'users',
            profile.address,
            updatedProfile,
            idToken,
          );

          resolve(
            NextResponse.json(
              { success: true, data: updatedProfile },
              { status: 200 },
            ),
          );
        } catch (error) {
          console.error('Error processing request:', error);
          reject(
            NextResponse.json(
              { error: 'Internal server error' },
              { status: 500 },
            ),
          );
        }
      });
    } catch (error) {
      console.error('Error converting request:', error);
      reject(
        NextResponse.json({ error: 'Internal server error' }, { status: 500 }),
      );
    }
  });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const address = searchParams.get('address');

    if (address) {
      const user = await getUser('users', address);

      if (user === null) {
        // User not customized
        return NextResponse.json(
          { message: 'Profile not found' },
          { status: 200 },
        );
      }

      return NextResponse.json(user, { status: 200 });
    }
  } catch (error) {
    console.error('Error handling GET request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
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

//     console.log('CONTENT ', content);
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
