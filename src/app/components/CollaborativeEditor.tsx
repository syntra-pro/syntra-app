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

import { EditorView } from "prosemirror-view";
import { Schema } from "prosemirror-model";
// import WorldIDVerifier from "./WorldBadge";
import { addListNodes } from "prosemirror-schema-list";
import { keymap } from "prosemirror-keymap";
import { upsertDocument } from "../../lib/utils";
// import { useVerification } from "./contexts/VerificationContext";
import { useWallets } from "@privy-io/react-auth";

// import { getLHkey, uploadLH } from "../../lib/storageLighthouse";

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
  const [cont, setCont] = useState("");
  // DEPRECATED
  // const { isVerified, setIsVerified } = useVerification();
  // const [responseLH, setResponseLH] = useState<string | undefined>(undefined);

  const [docname, setDocname] = useState(documentId);
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
            setCont(content);
            updateContent(content);
          }
        }
      },
    });

    const updateContent = async (content: string) => {
      await upsertDocument("update", content, `/${folder}/${docname}`);
    };

    const fetchDocument = async () => {
      try {
        const content = await upsertDocument(
          "fetch",
          null,
          `/${folder}/${docname}`
        );
        if (content && view) {
          const remoteContent = content;
          const newDoc = defaultMarkdownParser.parse(remoteContent);
          setCont(remoteContent);
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

  const { wallets } = useWallets();

  const handleStore = async () => {
    try {
      const wallet = wallets[0]; // Replace this with your desired wallet
      if (!wallet) return;
      const provider = await wallet.getEthereumProvider();
      const address = wallet.address;

      //   const { message } = (await lighthouse.getAuthMessage(address)).data;
      //   const signature = await provider.request({
      //     method: "personal_sign",
      //     params: [message, address],
      //   });

      //   const verificationMessage = await getMessage(address);

      //   const signAuthMessage = async (
      //     address: string,
      //     verificationMessage: string
      //   ) => {
      //     const signedMessage = await provider.request({
      //       method: "personal_sign",
      //       params: [verificationMessage, address],
      //     });
      //     return signedMessage;
      //   };

      //   const signedMessage = await signAuthMessage(address, verificationMessage);
      //   const key = await lighthouse.getApiKey(address, signedMessage);

      // DEPRECATED
      // const { signedMessage, key } = await getLHkey(address, provider);
      // uploadLH(address, signedMessage, cont, key.data.apiKey, docname)
      //   .then((response) => setResponseLH(response?.url))
      //   .catch((err) => console.error("xxxerr ", err));
    } catch (error) {
      console.log("Error ", error);
    }
  };

  return (
    <div className="">
      <div className="w-full flex justify-between">
        <div>
          <div className="text-xs font-mono">
            Filename:{" "}
            <input
              onChange={(e) => setDocname(e.target.value)}
              defaultValue={docname}
              className=" outline-none bg-transparent"
              placeholder="type a name"
              type="text"
            />
          </div>
          {/* DEPRECATED  */}
          {/* {responseLH && (
            <p style={{ fontSize: "8pt" }} className=" font-mono">
              Saved to: {responseLH}
            </p>
          )} */}
        </div>
        {/* DEPRECATED  */}
        {/* <Button
          variant={"ghost"}
          size={"sm"}
          title="Save in Lighthouse 🔆"
          onClick={handleStore}
        >
          Save in Lighthouse 🔆
        </Button> */}
      </div>

      {/* DEPRECATED  */}
      {/* <div className="text-xs justify-end mr-3 mt-2 flex gap-2">
        Encrypt data
        <input
          type="checkbox"
          disabled
          title="Coming soon"
          className="outline-none"
        />
      </div> */}

      {/* DEPRECATED  */}
      {/* {isVerified && (
        <div>
          <p>¡Bienvenido, usuario verificado!</p>
          <h2>Tus Documentos</h2>
           <ul>
            <li>Documento 1</li>
            <li>Documento 2</li>
            <li>Documento 3</li>
          </ul>
        </div>
      )} */}

      <div className="mt-3" ref={editorRef} />
    </div>
  );
};

export default MarkdownEditor;
