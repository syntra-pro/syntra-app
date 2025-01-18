'use server';

import { collection, getDocs } from 'firebase/firestore';

import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebaseConfig';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const daoName = searchParams.get('daoName');

  try {
    const proposalsCollection = collection(db, `DAOS/${daoName}/proposals`);
    const items = await getDocs(proposalsCollection);
    const proposals = items.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const sortedProposals = proposals.sort((a: any, b: any) => b.end - a.end);

    return NextResponse.json({ ok: true, data: sortedProposals });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: 500,
        message: error.message,
        statusText: error.message,
      }),
      {
        status: 500,
        statusText: error.message,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
