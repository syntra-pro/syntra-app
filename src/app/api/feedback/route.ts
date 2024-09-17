import { NextRequest, NextResponse } from 'next/server';
import { addDoc, collection } from 'firebase/firestore';

import { adminAuth } from '../../../lib/firebaseAdmin';
import { db } from '../../../lib/firebaseConfig';

interface FeedbackRequest {
  type: string;
  contents: string;
  timestamp: Date;
  user: string;
}

export async function POST(req: NextRequest) {
  try {
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

    const { type, contents, timestamp, user } = await req.json();

    const feedbackRef = collection(db, 'feedback');
    await addDoc(feedbackRef, {
      type,
      contents,
      timestamp,
      user,
    });

    return NextResponse.json({ message: 'Feedback stored' }, { status: 200 });
  } catch (error) {
    console.error('Error saving feedback:', error);
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
