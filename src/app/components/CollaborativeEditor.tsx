import '../../../src/app/editorStyles.css';

import { EditorState, Transaction } from 'prosemirror-state';
import React, { useEffect, useRef, useState } from 'react';
import { buildMenuItems, exampleSetup } from 'prosemirror-example-setup';
import {
  chainCommands,
  createParagraphNear,
  liftEmptyBlock,
  newlineInCode,
  splitBlock,
} from 'prosemirror-commands';
import {
  defaultMarkdownParser,
  defaultMarkdownSerializer,
  schema,
} from 'prosemirror-markdown';
import {
  preprocessMarkdown,
  readDocument,
  upsertDocument,
} from '../../lib/utils';

import { ALL_DOCS_FOLDER } from '../../lib/constants';
import { Button } from './ui/Button';
import { EditorView } from 'prosemirror-view';
import Loader from './ui/Loader';
import { Schema } from 'prosemirror-model';
import { addListNodes } from 'prosemirror-schema-list';
import { keymap } from 'prosemirror-keymap';

const shiftEnterCommand = chainCommands(
  newlineInCode,
  createParagraphNear,
  liftEmptyBlock,
  splitBlock,
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
  nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
  // @ts-ignore
  marks: {
    ...schema.spec.marks,
    strong: {
      parseDOM: [{ tag: 'strong' }],
      toDOM() {
        return ['strong', 0];
      },
    },
    em: {
      parseDOM: [{ tag: 'em' }],
      toDOM() {
        return ['em', 0];
      },
    },
    link: {
      parseDOM: [{ tag: 'a[href]' }],
      toDOM(node) {
        return ['a', { href: node.attrs.href }, 0];
      },
    },
  },
});
const menu = buildMenuItems(mySchema);

const MarkdownEditor: React.FC<{
  daoTemplate: any;
  folder: string;
  documentId: string;
  afterSave: () => void;
  projectName: string;
  projects: any[];
}> = ({
  daoTemplate,
  folder,
  documentId,
  afterSave,
  projectName,
  projects,
}) => {
  const [cont, setCont] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [priority, setPriority] = useState('medium');
  const [project, setProject] = useState(projectName);
  const [tags, setTags] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const createEditorState = (content: string = '') => {
    const doc = defaultMarkdownParser.parse(content.trim());
    return EditorState.create({
      doc,
      schema: mySchema,
      plugins: [
        keymap({
          'Shift-Enter': shiftEnterCommand,
        }),
        ...exampleSetup({
          schema: mySchema,
          menuContent: [...menu.fullMenu.slice(0, 1), menu.fullMenu[1]],
        }),
      ],
    });
  };

  const initializeEditor = (content: string = '') => {
    if (!editorRef.current) return;

    const state = createEditorState(content);

    if (viewRef.current) {
      viewRef.current.updateState(state);
    } else {
      // viewRef.current = new EditorView(editorRef.current, {
      //   state,
      //   dispatchTransaction: (transaction: Transaction) => {
      //     if (viewRef.current) {
      //       const newState = viewRef.current.state.apply(transaction);
      //       viewRef.current.updateState(newState);
      //       if (transaction.docChanged) {
      //         const content = defaultMarkdownSerializer.serialize(newState.doc);
      //         setCont(content);
      //       }
      //     }
      //   },
      // });

      viewRef.current = new EditorView(editorRef.current, {
        state: createEditorState(content),
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
        handleDOMEvents: {
          click: (view, event) => {
            const target = event.target as HTMLAnchorElement;
            if (target.tagName === 'A') {
              event.preventDefault(); // Prevent the default behavior
              window.open(target.href, '_blank'); // Open the link in a new tab
              return true;
            }
            return false;
          },
        },
      });
    }
  };

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setIsLoading(true);

        if (daoTemplate) {
          setTitle(`[${daoTemplate.name}]`);
          setLink('');
          setPriority('medium');
          // setProject('Unassigned');
          if (project === ALL_DOCS_FOLDER) {
            setProject('Unassigned');
          }
          setTags([]);
          setCollabs([]);
          const contentPre = daoTemplate.markdown;
          const content = preprocessMarkdown(contentPre);
          setCont(content);
          initializeEditor(content);
        } else {
          if (documentId === '0') {
            setTitle('');
            setLink('');
            setPriority('medium');
            if (project === ALL_DOCS_FOLDER) {
              setProject('Unassigned');
            }

            setTags([]);
            setCollabs([]);
            initializeEditor();
          } else {
            const data = await readDocument(`/${folder}/${documentId}`);
            setTitle(data.title);
            setLink(data.link);
            setPriority(data.priority);
            setProject(data.project || 'xxx');

            setTags(data.tags || []);
            setCollabs(data.collabs || []);
            setCont(data.content);
            initializeEditor(data.content);
          }
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocument();

    return () => {
      if (viewRef.current) viewRef.current.destroy();
    };
  }, [documentId, folder]);

  // const handleTemplate = async (templateId: string) => {
  //   try {
  //     setIsLoading(true);
  //     const daoTemplate = daoTemplates.find((r: any) => r.id === templateId);
  //     setTitle(`[${daoTemplate.name}]`);
  //     setLink('');
  //     setPriority('medium');
  //     setProject('');
  //     setTags([]);
  //     setCollabs([]);
  //     const contentPre = daoTemplate.markdown;
  //     const content = preprocessMarkdown(contentPre);
  //     // const content = contentPre;
  //     console.log('pre ', daoTemplate.markdown);
  //     console.log('post ', content);
  //     setCont(content);
  //     initializeEditor(content);
  //   } catch (error) {
  //     console.error('Error fetching template:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const pathName =
        documentId === '0'
          ? `/${folder}/${new Date().getTime().toString()}`
          : `/${folder}/${documentId}`;

      console.log('DDDD ', pathName, cont, title, link, project);
      await upsertDocument(
        pathName,
        cont,
        title,
        link,
        priority,
        project,
        tags,
        collabs,
      );

      afterSave();
    } catch (error) {
      console.error('Error saving document:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full">
      <>
        <div className="text-xs gap-y-2 flex flex-col ">
          <div className="flex items-baseline">
            <div className="w-1/12">Title</div>
            <input
              onChange={e => setTitle(e.target.value)}
              value={title}
              className="px-2 mr-2 py-1 w-8/12 outline-none rounded-md  "
              placeholder="Enter a name..."
              type="text"
            />
            <div className="w-1/12">Priority</div>
            <select
              disabled
              // onChange={e => setPriority(e.target.value)}
              // value={priority}
              className="w-2/12 px-2 py-1 outline-none  opacity-50  rounded-md">
              <option value={'medium'}></option>
              {/* <option value={'critical'}>Critical</option>
              <option value={'high'}>High</option>
              <option value={'low'}>Low</option> */}
            </select>
          </div>

          <div className="flex items-baseline">
            <div className="w-1/12">Link</div>
            <input
              onChange={e => setLink(e.target.value)}
              value={link}
              className="px-2 mr-2 py-1 w-8/12 outline-none rounded-md  "
              placeholder="Enter an url..."
              type="text"
            />
            <div className="w-1/12">Tags</div>
            <select
              // onChange={(e) => setTags(e.target.value)}
              // value={tags}
              className="w-2/12 px-2 py-1 outline-none  opacity-50  rounded-md"></select>
          </div>

          <div className="flex items-baseline w-full">
            <span className="w-1/12">Project</span>
            <select
              value={documentId === '0' ? projectName : project}
              onChange={e => setProject(e.target.value)}
              className="w-5/12 mr-2 px-2 py-1 outline-none rounded-md">
              {projects.map((i: any, k: number) => (
                <option key={k} value={i.project}>
                  {i.project}
                </option>
              ))}
            </select>

            <span className="w-1/12 text-right mr-2">Collabs</span>
            <select
              disabled
              className="px-2 w-5/12 py-1 outline-none rounded-md">
              <option value={'critical'}> </option>
              <option value={'high'}> </option>
              <option defaultValue={''} value={''}></option>
              <option value={'low'}> </option>
            </select>
          </div>
        </div>

        <div className="flex mt-2 w-full justify-between">
          {/* <div className="text-xs ">
            Use template
            <select
              onChange={e => handleTemplate(e.target.value)}
              className="ml-2 rounded-sm outline-none px-2 py-1">
              {daoTemplates.map((i: any, k: number) => (
                <>
                  <option key={k} value={i.id}>
                    {i.name}
                  </option>
                </>
              ))}
            </select>
          </div> */}

          {isSaving ? (
            <Loader />
          ) : (
            <Button
              variant="ghost"
              size={'sm'}
              // className="text-sm bg-black text-white px-3 py-1 rounded-md"
              onClick={handleSave}>
              Save
            </Button>
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
