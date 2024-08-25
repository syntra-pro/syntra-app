import { get, getDatabase, ref, set } from "firebase/database";

import { NextResponse } from "next/server";
import { firebaseConfig } from "../../../lib/firebaseConfig";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder");
    const documentId = searchParams.get("documentId");

    if (!folder || !documentId) {
      return NextResponse.json(
        { error: "Folder and Document ID are required" },
        { status: 400 }
      );
    }

    const docRef = ref(database, `documents/${folder}/${documentId}`);
    const snapshot = await get(docRef);
    const data = snapshot.val();
    const documentKey = Object.keys(data)[0];
    const content = data[documentKey].content;
    if (snapshot.exists()) {
      return NextResponse.json({ content }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pathName, content } = body;

    if (!pathName || typeof content !== "string") {
      return NextResponse.json(
        { error: "Folder, Document ID, and content are required" },
        { status: 400 }
      );
    }

    const docRef = ref(database, `documents/${pathName}`);
    await set(docRef, { content });

    return NextResponse.json(
      { message: "Document updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
