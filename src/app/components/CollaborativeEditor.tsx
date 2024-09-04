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
  afterSave: () => void;
}> = ({ folder, documentId, afterSave }) => {
  const [cont, setCont] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");
  const [project, setProject] = useState("");
  const [tags, setTags] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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
          }
        }
      },
    });

    const fetchDocument = async () => {
      try {
        setIsLoading(true);
        const data = await readDocument(`/${folder}/${documentId}`);

        console.log("ok  ", `/${folder}/${documentId}`);
        console.log("data ", data);

        setTitle(data.title);
        setPriority(data.priority);
        setProject(data.project || "");
        setTags(data.tags || []);
        setCollabs(data.collabs || []);
        const content = data.content;

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
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    if (documentId === "0") {
      setTitle("");
      setPriority("normal");
      setProject("");
      setTags([]);
      setCollabs([]);
    } else {
      fetchDocument();
    }

    return () => {
      if (view) view.destroy();
    };
  }, []);

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
      // uploadLH(address, signedMessage, cont, key.data.apiKey, documentId)
      //   .then((response) => setResponseLH(response?.url))
      //   .catch((err) => console.error("xxxerr ", err));
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    const pathName =
      documentId === "0"
        ? `/${folder}/${new Date().getTime().toString()}`
        : `/${folder}/${documentId}`;

    await upsertDocument(
      pathName,
      cont,
      title,
      priority,
      project,
      tags,
      collabs
    );

    afterSave();
  };

  return (
    <div className="w-full">
      <>
        <div className="text-xs gap-y-2 flex flex-col ">
          <div className="flex items-baseline">
            <div className="w-1/12">Title</div>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="px-2 mr-2 py-1 w-8/12 outline-none rounded-md  "
              placeholder="type a name"
              type="text"
            />
            <div className="w-1/12">Priority</div>
            <select
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
              className="w-2/12 px-2 py-1 outline-none rounded-md"
            >
              <option value={"critical"}>Critical</option>
              <option value={"high"}>High</option>
              <option value={"normal"}>Normal</option>
              <option value={"low"}>Low</option>
            </select>
          </div>

          <div className="flex items-baseline opacity-50 w-full">
            <span className="w-1/12">Project</span>
            <select
              disabled
              className="w-5/12 mr-2 px-2 py-1 outline-none rounded-md"
            ></select>
            <span className="w-1/12">Collabs</span>
            <select
              disabled
              className="px-2 w-5/12 py-1 outline-none rounded-md"
            >
              <option value={"critical"}> </option>
              <option value={"high"}> </option>
              <option defaultValue={""} value={""}></option>
              <option value={"low"}> </option>
            </select>
          </div>
        </div>

        <div className="flex mt-2 w-full justify-end">
          {isSaving ? (
            <Loader />
          ) : (
            <button
              className="text-sm bg-black text-white px-3 py-1 rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>

        <div className="mt-3" ref={editorRef} />
      </>
      {/* )} */}
    </div>
  );
};

export default MarkdownEditor;

{
  /* DEPRECATED  */
}
{
  /* {responseLH && (
            <p style={{ fontSize: "8pt" }} className=" font-mono">
              Saved to: {responseLH}
            </p>
          )} */
}
{
  /* DEPRECATED  */
}
{
  /* <Button
          variant={"ghost"}
          size={"sm"}
          title="Save in Lighthouse 🔆"
          onClick={handleStore}
        >
          Save in Lighthouse 🔆
        </Button> */
}
{
  /* DEPRECATED  */
}
{
  /* <div className="text-xs justify-end mr-3 mt-2 flex gap-2">
        Encrypt data
        <input
          type="checkbox"
          disabled
          title="Coming soon"
          className="outline-none"
        />
      </div> */
}

{
  /* DEPRECATED  */
}
{
  /* {isVerified && (
        <div>
          <p>¡Bienvenido, usuario verificado!</p>
          <h2>Tus Documentos</h2>
           <ul>
            <li>Documento 1</li>
            <li>Documento 2</li>
            <li>Documento 3</li>
          </ul>
        </div>
      )} */
}
