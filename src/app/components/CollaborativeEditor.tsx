"use client";

import "../../../src/app/editorStyles.css";

import * as Y from "yjs";

import React, { useEffect, useRef } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { yCursorPlugin, ySyncPlugin, yUndoPlugin } from "y-prosemirror";

import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { IndexeddbPersistence } from "y-indexeddb";
import { Schema } from "prosemirror-model";
import { WebrtcProvider } from "y-webrtc";
import { addListNodes } from "prosemirror-schema-list";
import { buildMenuItems } from "prosemirror-example-setup";
import { exampleSetup } from "prosemirror-example-setup";
// fbconfig
import { firebaseConfig } from "../../lib/firebaseConfig";
import { initializeApp } from "firebase/app";
import { menuBar } from "prosemirror-menu";
import { schema } from "prosemirror-schema-basic";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks,
});

const CollaborativeEditor: React.FC<{ documentId: string }> = ({
  documentId,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const ydoc = new Y.Doc();
    const indexeddbProvider = new IndexeddbPersistence(documentId, ydoc);
    const webrtcProvider = new WebrtcProvider(documentId, ydoc);
    const type = ydoc.getXmlFragment("prosemirror");

    const editor = new EditorView(editorRef.current, {
      state: EditorState.create({
        schema: mySchema,
        plugins: [
          ySyncPlugin(type),
          yCursorPlugin(webrtcProvider.awareness),
          yUndoPlugin(),
          //   menuBar({
          //     floating: false,
          //     content: buildMenuItems(mySchema).fullMenu,
          //   }),
          ...exampleSetup({ schema: mySchema }),
        ],
      }),
    });

    // Sincronizar con Firebase Realtime Database
    const docRef = ref(database, `documents/${documentId}`);

    ydoc.on("update", (update) => {
      set(docRef, Y.encodeStateAsUpdate(ydoc));
    });

    onValue(docRef, (snapshot) => {
      const remoteState = snapshot.val();
      if (remoteState) {
        Y.applyUpdate(ydoc, new Uint8Array(Object.values(remoteState)));
      }
    });

    return () => {
      editor.destroy();
      webrtcProvider.destroy();
      indexeddbProvider.destroy();
    };
  }, [documentId]);

  return <div ref={editorRef} />;
};

export default CollaborativeEditor;
