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

import { EditorView } from "prosemirror-view";
import { Schema } from "prosemirror-model";
import { addListNodes } from "prosemirror-schema-list";
import { keymap } from "prosemirror-keymap";
import { upsertDocument } from "../../lib/utils";

const shiftEnterCommand = chainCommands(
  newlineInCode,
  createParagraphNear,
  liftEmptyBlock,
  splitBlock
);

const oldUpdateState = EditorView.prototype.updateState;

EditorView.prototype.updateState = function (state) {
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

    view.setProps({
      dispatchTransaction: (transaction: Transaction) => {
        if (view && view.state) {
          const newState = view.state.apply(transaction);
          view.updateState(newState);
          if (transaction.docChanged) {
            const content = defaultMarkdownSerializer.serialize(newState.doc);
            updateContent(content);
          }
        }
      },
    });

    const updateContent = async (content: string) => {
      await upsertDocument("update", content, `/${folder}/${documentId}`);
    };

    const fetchDocument = async () => {
      try {
        const content = await upsertDocument(
          "fetch",
          null,
          `/${folder}/${documentId}`
        );
        if (content && view) {
          const remoteContent = content;
          const newDoc = defaultMarkdownParser.parse(remoteContent);
          const newState = EditorState.create({
            doc: newDoc,
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

          view.updateState(newState);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchDocument();

    return () => {
      if (view) view.destroy();
    };
  }, [documentId, folder]);

  return (
    <div className="">
      <p className="text-xs font-mono">Filename: {documentId}</p>
      <div ref={editorRef} />
    </div>
  );
};

export default MarkdownEditor;
