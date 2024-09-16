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
  readSettings,
  upsertDocument,
} from '../../lib/utils';

import { ALL_DOCS_FOLDER } from '../../lib/constants';
import { Button } from './ui/Button';
import { EditorView } from 'prosemirror-view';
import Loader from './ui/Loader';
import { MenuItem } from 'prosemirror-menu';
import ReactMarkdown from 'react-markdown';
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
  const mySchema = new Schema({
    nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
    marks: schema.spec.marks,
  });

  const createEditorState = (content: string = '') => {
    const doc = defaultMarkdownParser.parse(content.trim());
    const menuItems = buildMenuItems(mySchema);
    const filteredMenu = menuItems.fullMenu
      .map(group =>
        // @ts-ignore
        group.filter((item: MenuItem) =>
          // @ts-ignore

          ['strong', 'em', 'code'].includes(item.spec?.markType?.name || ''),
        ),
      )
      .filter(group => group.length > 0);

    return EditorState.create({
      doc,
      schema: mySchema,
      plugins: exampleSetup({
        schema: mySchema,
        menuContent: filteredMenu,
      }),
    });
  };

  const initializeEditor = (content: string = '') => {
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

        if (documentId !== '0' && typeof daoTemplate?.id === 'undefined') {
          const data = await readDocument(`/${folder}/${documentId}`);
          setTitle(data.title);
          setLink(data.link || '');
          setPriority(data.priority);
          setProject(data.project || 'xxx');
          setTags(data.tags || []);
          setCollabs(data.collabs || []);
          setCont(data.content);
          initializeEditor(data.content);
        }

        if (documentId === '0' && typeof daoTemplate?.id === 'undefined') {
          setTitle('');
          setLink('');
          setPriority('medium');
          if (project === ALL_DOCS_FOLDER) {
            setProject('Unassigned');
          }

          setTags([]);
          setCollabs([]);
          initializeEditor();
          return;
        }

        if (documentId === '0' && typeof daoTemplate?.id !== 'undefined') {
          setTitle(`[${daoTemplate.name}]`);
          setLink('');
          setPriority('medium');
          if (project === ALL_DOCS_FOLDER) {
            setProject('Unassigned');
          }
          setTags([]);
          setCollabs([]);
          const contentPre = daoTemplate.markdown;
          console.log('nuevo CON TEMPLATE', daoTemplate.markdown);

          const content = preprocessMarkdown(contentPre);
          setCont(content);
          initializeEditor(content);
        }

        return;
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

  const handleSave = async () => {
    console.log('link, cont, title>>>> ', link, cont, title);

    if (
      typeof link !== 'undefined' ||
      cont.trim() !== '' ||
      title.trim() !== ''
    ) {
      console.log('saving!');

      let newTitle = title.trim();
      let newCont = cont.trim();

      if (newTitle === '') {
        newTitle = 'Untitled';
      }

      if (newCont.trim() === '') {
        newCont = ' ';
      }

      console.log('>>>> ', link.trim(), newCont, newTitle);

      setIsSaving(true);
      try {
        const pathName =
          documentId === '0'
            ? `/${folder}/${new Date().getTime().toString()}`
            : `/${folder}/${documentId}`;

        console.log('DDDD ', pathName, newCont, newTitle, link, project);
        await upsertDocument(
          pathName,
          newCont,
          newTitle,
          link,
          priority,
          project,
          tags,
          collabs,
        );

        afterSave();
        return;
      } catch (error) {
        console.error('Error saving document:', error);
      } finally {
        setIsSaving(false);
      }
    }
    console.log('not saving !');
    afterSave();
    return;
  };

  const handleClose = async () => {
    setCont('');
    setTitle('');
    setLink('');
    setIsSaving(false);
    afterSave();
  };

  return (
    <div className="w-full">
      <div className="text-xs gap-y-2 flex flex-col ">
        <div className="flex py-2 items-center justify-between">
          <span className="text-base  ">New draft</span>
          {isSaving ? (
            <Loader />
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size={'sm'} onClick={handleSave}>
                Save
              </Button>

              <Button variant="ghost" size={'sm'} onClick={handleClose}>
                Close
              </Button>
            </div>
          )}
        </div>
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
            className="w-2/12 px-2 py-1 outline-none  opacity-50  rounded-md">
            <option value={'medium'}></option>
          </select>
        </div>
        <div className="flex items-baseline">
          <div className="w-1/12">Link</div>
          <input
            onChange={e => setLink(e.target.value)}
            value={link}
            className="px-2 mr-2 py-1 w-8/12 outline-none rounded-md "
            placeholder="Enter an url..."
            type="text"
          />
          <div className="w-1/12">Tags</div>
          <select className="w-2/12 px-2 py-1 outline-none  opacity-50  rounded-md"></select>
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
          <select disabled className="px-2 w-5/12 py-1 outline-none rounded-md">
            <option value={'critical'}> </option>
            <option value={'high'}> </option>
            <option defaultValue={''} value={''}></option>
            <option value={'low'}> </option>
          </select>
        </div>
      </div>

      <div className="flex mt-2 w-full justify-between"></div>

      <div className="mt-3" ref={editorRef} />
    </div>
  );
};

export default MarkdownEditor;
