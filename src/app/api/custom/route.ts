import { NextRequest, NextResponse } from 'next/server';

import { adminAuth } from '../../../lib/firebaseAdmin';
import { getUser } from '../../../lib/firestore';

export async function POST(req: NextRequest) {
  try {
    // Verificar si el método es POST
    if (req.method !== 'POST') {
      return NextResponse.json(
        { message: 'Method Not Allowed' },
        { status: 405 },
      );
    }

    // Verificar que el cuerpo de la solicitud no esté vacío
    if (!req.body) {
      return NextResponse.json(
        { message: 'Request body is empty' },
        { status: 400 },
      );
    }

    // Parsear el cuerpo de la solicitud
    const requestBody = await req.json();

    // Verificar si hay contenido en el cuerpo después de parsear
    if (!requestBody) {
      return NextResponse.json(
        { message: 'Invalid or empty JSON in request body' },
        { status: 400 },
      );
    }

    const { walletAddress }: { walletAddress?: string } = requestBody;

    if (!walletAddress) {
      return NextResponse.json(
        { message: 'Missing wallet address' },
        { status: 400 },
      );
    }

    const user = await getUser('users', walletAddress);

    if (user === null) {
      // Usuario no en la whitelist
      // console.log('Wallet not in whitelist: ', walletAddress);
      // return NextResponse.json(
      //   { message: 'Wallet not in whitelist' },
      //   { status: 403 }
      // );
    }

    const customToken = await adminAuth.createCustomToken(walletAddress);

    return NextResponse.json({ customToken, user });
  } catch (error) {
    console.error('Error generating custom token:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
