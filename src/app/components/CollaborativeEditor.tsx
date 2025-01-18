'use client';

import '../../../src/app/EditorStyle.css';

import { ArrowLeft, ArrowLeftIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  escapeMD,
  preprocessMarkdown,
  readDocument,
  readSettings,
  upsertDocument,
} from '../../lib/utils';

import { ALL_DOCS_FOLDER } from '../../lib/constants';
import { ForwardRefEditor } from './ForwardRefEditor';
import { MDXEditorMethods } from 'mdx-float';
import MetadataBar from './MetadataBar';
import { useDAO } from './contexts/DAOContext';

const MarkdownEditor: React.FC<{
  backToProposals: boolean;
  proposalURL: string;
  daoTemplate: any;
  folder: string;
  documentId: string;
  afterSave: () => void;
  afterSave2: () => void;
  projectName: string;
  projects: any[];
}> = ({
  backToProposals,
  proposalURL,
  daoTemplate,
  folder,
  documentId,
  afterSave,
  afterSave2,
  projectName,
  projects,
}: any) => {
  const [cont, setCont] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState(proposalURL);
  const [priority, setPriority] = useState('medium');
  const [project, setProject] = useState(projectName);
  const [tags, setTags] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const dn = new Date().getTime().toString();
  const [docName, setDocName] = useState(documentId === '0' ? dn : documentId);
  const ref = React.useRef<MDXEditorMethods>(null);

  const { setShowBack } = useDAO();

  const isAlreadyEscaped = (text: string) => {
    return /\\[\\`*_{}\[\]()#+\-.!]/.test(text);
  };

  useEffect(() => {
    setShowBack(false);
  }, []);

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
          console.log('loaded unescaped!', data.content);
          ref.current?.setMarkdown(
            data.content.replace(/\\([\\`*_{}\[\]()#+\-.!])/g, '$1'),
          );
          // ref.current?.insertMarkdown(data.content);
          // initializeEditor(data.content);
        }

        if (documentId === '0' && typeof daoTemplate?.id === 'undefined') {
          setTitle('');
          setLink(proposalURL);
          setPriority('medium');
          if (project === ALL_DOCS_FOLDER) {
            setProject('Unassigned');
          }

          setTags([]);
          setCollabs([]);
          // initializeEditor();
          return;
        }

        // with template
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
          // initializeEditor(content);
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocument();
  }, [documentId, folder]);

  const handleSave = async (donde: string) => {
    console.log('donde ', donde);
    console.log('link, cont, title ', link, cont, title);

    let save = false;

    if (!link || link.trim() !== '') {
      console.log('link:', link);
      save = true;
    }

    if (!cont || cont.trim() !== '') {
      console.log('cont:', cont);
      save = true;
    }
    if (!title || title.trim() !== '') {
      console.log('title:', title);
      save = true;
    }

    const save2 = ![link, cont, title].every(
      item => item || item.trim() !== '',
    );

    console.log('donde,save,save2 ', donde, save, save2);

    if (!save) {
      console.log('not saving: no link, cont, nor title');
      return;
    }
    console.log('saving! ', typeof link, cont.trim(), title.trim());

    let newTitle = title.trim();
    let newCont = cont.trim();

    if (newTitle === '') {
      newTitle = 'Untitled';
    }

    if (newCont.trim() === '') {
      newCont = ' ';
    }

    setIsSaving(true);

    try {
      const pathName = `/${folder}/${docName}`;

      // const pathName =
      //   documentId === '0' ? `/${folder}/${dn}` : `/${folder}/${documentId}`;

      // FIXME
      // const escapedContent = escapeMD(newCont);
      // let newCont = cont.trim();

      let escapedContent;
      // const escapedContent = escapeMD(newCont);

      // Asegúrate de que el contenido no esté escapado antes de aplicar escapeMD
      if (!isAlreadyEscaped(newCont)) {
        escapedContent = escapeMD(newCont);
      } else {
        escapedContent = newCont;
      }

      // console.log('escapedContent ', escapedContent);
      // return;
      await upsertDocument(
        pathName,
        escapedContent,
        newTitle,
        link,
        priority,
        project,
        tags,
        collabs,
      );

      setDocName(dn);
    } catch (error) {
      console.error('Error saving document:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = async () => {
    try {
      await handleSave('handleclose');
      setCont('');
      setTitle('');
      setLink('');
      setIsSaving(false);
      if (backToProposals) {
        setShowBack(true);
        afterSave2();
      } else {
        setShowBack(false);
        afterSave();
      }
    } catch (error) {
      console.error('Error saving document:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // const handleClose2 = async () => {
  //   try {
  //     await handleSave('handleclose');
  //     setCont('');
  //     setTitle('');
  //     setLink('');
  //     setIsSaving(false);
  //   } catch (error) {
  //     console.error('Error saving document:', error);
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      handleClose();
      e.preventDefault();
    };

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'hidden') {
        await handleSave('hiddensave');
      }
    };

    const saveInterval = setInterval(async () => {
      await handleSave('autosave');
    }, 30000);

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(saveInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [cont, title, link, priority, project, tags, collabs]);

  return (
    <div id="main" className="w-full my-4 flex flex-grow  overflow-y-auto">
      {/* editor  */}
      {/* HACK button to close editor */}
      {/* { 
        backToProposals ? (      <button
          style={{ top: '10px' }}
          className="text-xl absolute z-40 opacity-40"
          onClick={handleClose2}>
                         <ArrowLeftIcon width={16} height={16} />

        </button>) 
        : 
         (      */}
      <button
        style={{ top: '16px' }}
        className="text-xl px-2 absolute z-40 opacity-50"
        onClick={handleClose}>
        <ArrowLeftIcon width={16} height={16} />
      </button>
      {/*   )
      } */}
      <div
        className="w-9/12 p-4 relative mb-2
          dark:bg-stone-700 rounded-md shadow-md flex flex-col flex-grow overflow-auto
          bg-white border-stone-200 dark:border-stone-700">
        <input
          onChange={e => setTitle(e.target.value)}
          value={title}
          className="text-2xl w-full 
            placeholder:dark:text-stone-600 
            placeholder:text-stone-300
            bg-transparent 
            outline-none"
          placeholder="Draft title..."
          type="text"
        />

        <ForwardRefEditor
          onChange={(e: any) => {
            console.log('onchange ', e);
            setCont(e);
          }}
          markdown={cont}
          ref={ref}
        />
      </div>

      {/* metadata  */}
      <MetadataBar
        documentId={documentId}
        link={link}
        setLink={setLink}
        projectName={projectName}
        projects={projects}
        project={project}
        setProject={setProject}
      />
    </div>
  );
};

export default MarkdownEditor;
