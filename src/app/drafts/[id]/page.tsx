'use client';

import { fetchAllDocuments, upsertDocument } from '../../../lib/utils';
import { useEffect, useState } from 'react';

import { ALL_DOCS_FOLDER } from '../../../lib/constants';
import CollaborativeEditor from '../../components/CollaborativeEditor';
import { DaoLink } from '../../../types/DaoLink';
import { useAuth } from '../../components/contexts/AuthContext';
import { useDAO } from '../../components/contexts/DAOContext';

// import { getLHUploads, getLHkey } from "../../../lib/storageLighthouse";

export default function DaoPage({ params }: { params: { id: string } }) {
  const { id: idDao } = params;
  // const par = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isDraftsOpen, setIsDraftsOpen] = useState(true);
  const [daoTemplate, setDaoTemplate] = useState<any>();
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [template, setTemplate] = useState('');

  const [calendar, setCalendar] = useState([]);
  const { authenticated, user, ready } = useAuth();

  const [daoLinks, setDaoLinks] = useState<DaoLink[]>([]);
  const [daoSettings, setDaoSettings] = useState<DaoLink[]>([]);
  const [daoTemplates, setDaoTemplates] = useState<DaoLink[]>([]);
  const [calendarId, setCalendarId] = useState('');
  const { setLogo, setColor, setColorDark, setName, name } = useDAO();
  setName(idDao);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any>([]);
  const [selectedProject, setSelectedProject] = useState(ALL_DOCS_FOLDER);

  const [showNew, setShowNew] = useState(false);
  const [newProject, setNewProject] = useState('untitled');

  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [allDocuments, setAllDocuments] = useState<any[]>([]);
  const [documentId, setDocumentId] = useState<any>();
  const [isProjectsCollapsed, setIsProjectsCollapsed] = useState(false);
  const [isProjectsMinimized, setIsProjectsMinimized] = useState(false);

  async function fetchDocuments() {
    try {
      setDaoTemplate(undefined);
      const docs = await fetchAllDocuments(
        `/documents/${idDao}/${user?.wallet?.address}`,
      );
      if (!docs) return;

      const folderedDocs = docs.filter((r: any) => r.id !== '0');
      const hasEmpties = docs.filter((r: any) => r.id === '0');
      let emptyProjectsFolder: any;

      if (hasEmpties.length === 0) {
        emptyProjectsFolder = [];
      } else {
        emptyProjectsFolder = Object.keys(
          docs.filter((r: any) => r.id === '0')[0],
        ).filter(t => t !== 'id');
      }

      const itemsByProject = Object.entries(
        folderedDocs.reduce(
          (acc: any, { project }: any) => ({
            ...acc,
            [project]: (acc[project] ?? 0) + 1,
          }),
          {},
        ),
      ).map(([project, drafts]) => ({ project, drafts }));

      const empty = emptyProjectsFolder.map((p: any) => ({
        project: p,
        drafts: 0,
      }));

      const all = [
        {
          project: ALL_DOCS_FOLDER,
          drafts: itemsByProject.reduce((acc, obj: any) => acc + obj.drafts, 0),
        },
      ];

      setDocuments(docs);
      setAllDocuments(
        docs
          .filter((i: any) => i.id !== '0')
          .sort((a: any, b: any) => a.project.localeCompare(b.project)),
      );

      // empty projects
      const allProjects = [...all, ...itemsByProject, ...empty];
      // console.log('allProjects ', allProjects);

      const nonZeroId = Object.values(
        allProjects.reduce((acc: any, { project, drafts }: any) => {
          acc[project] = acc[project] || { project, drafts: 0 };
          acc[project].drafts += drafts;
          return acc;
        }, {}),
      );

      setProjects(nonZeroId);

      setSelectedProject(ALL_DOCS_FOLDER);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to get documents:', error);
    }
  }

  return <>WIP</>;
}
