import "../../../src/app/editorStyles.css";

import { EditorState, Transaction } from "prosemirror-state";
import React, { useEffect, useRef } from "react";
import { buildMenuItems, exampleSetup } from "prosemirror-example-setup";
import {
  chainCommands,
  createParagraphNear,
  liftEmptyBlock,
  newlineInCode,
  splitBlock,
} from "prosemirror-commands";
import {
  defaultMarkdownParser,
  defaultMarkdownSerializer,
  schema,
} from "prosemirror-markdown";
import { get, getDatabase, onValue, ref, set } from "firebase/database";

import { EditorView } from "prosemirror-view";
import { Schema } from "prosemirror-model";
import { addListNodes } from "prosemirror-schema-list";
import { firebaseConfig } from "../../lib/firebaseConfig";
import { initializeApp } from "firebase/app";
import { keymap } from "prosemirror-keymap";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const shiftEnterCommand = chainCommands(
  newlineInCode,
  createParagraphNear,
  liftEmptyBlock,
  splitBlock
);

const oldUpdateState = EditorView.prototype.updateState;

EditorView.prototype.updateState = function (state) {
  // This prevents the matchesNode error on hot reloads
  // @ts-ignore
  if (!this.docView) {
    return;
  }

  oldUpdateState.call(this, state);
};

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks,
});

const menu = buildMenuItems(mySchema);

const MarkdownEditor: React.FC<{
  folder: string;
  documentId: string;
}> = ({ folder, documentId }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    let view: EditorView | null = null;

    const state = EditorState.create({
      schema: mySchema,
      plugins: [
        keymap({
          "Shift-Enter": shiftEnterCommand,
        }),
        ...exampleSetup({
          schema: mySchema,
          menuContent: [...menu.fullMenu.slice(0, 1), menu.fullMenu[1]],
        }),
      ],
    });

    view = new EditorView(editorRef.current, { state });

    const updateFirebase = (content: string) => {
      set(ref(database, `documents/${folder}/${documentId}`), {
        content,
      });
    };

    view.setProps({
      dispatchTransaction: (transaction: Transaction) => {
        if (view && view.state) {
          const newState = view.state.apply(transaction);
          console.log("new state  ", newState);
          view.updateState(newState);
          if (transaction.docChanged) {
            const content = defaultMarkdownSerializer.serialize(newState.doc);
            updateFirebase(content);
          }
        }
      },
    });

    const docRef = ref(database, `documents/${documentId}`);

    let updating = false;

    onValue(docRef, (snapshot) => {
      if (updating) return;
      const data = snapshot.val();
      if (data && data.content && view) {
        try {
          updating = true;
          const remoteContent = data.content;
          console.log("Received remote content:", remoteContent);

          if (remoteContent) {
            const newDoc = defaultMarkdownParser.parse(remoteContent);
            const newState = EditorState.create({
              doc: newDoc,
              schema: mySchema,
              plugins: [
                keymap({
                  "Shift-Enter": shiftEnterCommand,
                }),
                // ...view.state.plugins,
                ...exampleSetup({
                  schema: mySchema,
                  menuContent: [...menu.fullMenu.slice(0, 1), menu.fullMenu[1]],
                }),
              ],
            });

            view.updateState(newState);
          }
        } catch (error) {
          console.error("Error applying remote update:", error);
          console.error("Problematic content:", data.content);
        } finally {
          updating = false;
        }
      }
    });

    // initial sync!
    get(ref(database, `documents/${folder}/${documentId}`)).then((snapshot) => {
      const data = snapshot.val();
      if (data && data.content) {
        const initialDoc = defaultMarkdownParser.parse(data.content);
        const initialState = EditorState.create({
          doc: initialDoc,
          schema: mySchema,
          plugins: [
            keymap({
              "Shift-Enter": shiftEnterCommand,
            }),
            ...exampleSetup({
              schema: mySchema,
              menuContent: [...menu.fullMenu.slice(0, 1), menu.fullMenu[1]],
            }),
          ],
        });

        console.log("XXXX ", initialState);
        view.updateState(initialState);
      }
    });
    //   .catch((error) => {
    //     console.error("Error fetching initial content:", error);
    //   });

    return () => {
      if (view) view.destroy();
    };
  }, [documentId, folder]);

  return (
    <div className="">
      <p className="text-xs font-mono">
        Filename: {folder}/{documentId}
      </p>
      <div ref={editorRef} />
    </div>
  );
};

export default MarkdownEditor;
