import "../../../src/app/editorStyles.css";

import { EditorState, Transaction } from "prosemirror-state";
import React, { useEffect, useRef, useState } from "react";
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
import { readDocument, upsertDocument } from "../../lib/utils";

import { EditorView } from "prosemirror-view";
import Loader from "./ui/Loader";
import { Schema } from "prosemirror-model";
import { addListNodes } from "prosemirror-schema-list";
import { keymap } from "prosemirror-keymap";
import { useWallets } from "@privy-io/react-auth";

// ... (keep the existing code until the MarkdownEditor component definition)

const MarkdownEditor: React.FC<{
  daoTemplates: any;
  folder: string;
  documentId: string;
  afterSave: () => void;
}> = ({ daoTemplates, folder, documentId, afterSave }) => {
  const [cont, setCont] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [priority, setPriority] = useState("medium");
  const [project, setProject] = useState("");
  const [tags, setTags] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const createEditorState = (content: string = "") => {
    const doc = defaultMarkdownParser.parse(content);
    return EditorState.create({
      doc,
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
  };

  const initializeEditor = (content: string = "") => {
    if (!editorRef.current) return;

    const state = createEditorState(content);

    if (viewRef.current) {
      viewRef.current.updateState(state);
    } else {
      viewRef.current = new EditorView(editorRef.current, {
        state,
        dispatchTransaction: (transaction: Transaction) => {
          if (viewRef.current) {
            const newState = viewRef.current.state.apply(transaction);
            viewRef.current.updateState(newState);
            if (transaction.docChanged) {
              const content = defaultMarkdownSerializer.serialize(newState.doc);
              setCont(content);
            }
          }
        },
      });
    }
  };

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setIsLoading(true);
        if (documentId === "0") {
          setTitle("");
          setLink("");
          setPriority("medium");
          setProject("");
          setTags([]);
          setCollabs([]);
          initializeEditor();
        } else {
          const data = await readDocument(`/${folder}/${documentId}`);
          setTitle(data.title);
          setLink(data.link);
          setPriority(data.priority);
          setProject(data.project || "");
          setTags(data.tags || []);
          setCollabs(data.collabs || []);
          initializeEditor(data.content);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocument();

    return () => {
      if (viewRef.current) viewRef.current.destroy();
    };
  }, [documentId, folder]);

  const handleTemplate = async (templateId: string) => {
    try {
      setIsLoading(true);
      const daoTemplate = daoTemplates.find((r: any) => r.id === templateId);
      setTitle(`[${daoTemplate.name}]`);
      setLink("");
      setPriority("medium");
      setProject("");
      setTags([]);
      setCollabs([]);
      const content = daoTemplate.markdown;
      setCont(content);
      initializeEditor(content);
    } catch (error) {
      console.error("Error fetching template:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const pathName =
        documentId === "0"
          ? `/${folder}/${new Date().getTime().toString()}`
          : `/${folder}/${documentId}`;

      await upsertDocument(
        pathName,
        cont,
        title,
        link,
        priority,
        project,
        tags,
        collabs
      );

      afterSave();
    } catch (error) {
      console.error("Error saving document:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // ... (keep the existing return statement and JSX)
};

export default MarkdownEditor;
