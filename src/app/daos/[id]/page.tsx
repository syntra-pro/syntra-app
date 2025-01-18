'use client';

// the dao home

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { MoonIcon, PinBottomIcon, PinLeftIcon } from '@radix-ui/react-icons';
import { fetchAllDocuments, upsertDocument } from '../../../lib/utils';
import { useEffect, useState } from 'react';

import { ALL_DOCS_FOLDER } from '../../../lib/constants';
import ArbitrumAnn from '../../components/ArbitrumAnn';
import DaoEvent from '../../components/DaoEvents';
import { DaoLink } from '../../../types/DaoLink';
import DaoLinks from '../../components/DaoLinks';
import { DraftList } from '../../components/DraftList';
import Loader from '../../components/ui/Loader';
import PlatformLayout from '../../layouts/platformLayout';
import { ProjectList } from '../../components/ProjectList';
import { ProposalList } from '../../components/ProposalList';
import dynamic from 'next/dynamic';
import { getCalendar } from '../../../lib/calendar';
import { getDocument } from '../../../lib/firestore';
import { useAuth } from '../../components/contexts/AuthContext';
import { useDAO } from '../../components/contexts/DAOContext';
import { useMixpanel } from '../../components/contexts/mixpanelContext';

const CollaborativeEditor = dynamic(
  () => import('../../components/CollaborativeEditor'),
  { ssr: false },
);

// import { getLHUploads, getLHkey } from "../../../lib/storageLighthouse";

export default function DaoPage({ params }: { params: { id: string } }) {
  const { id: idDao } = params;
  // const par = useParams();
  const [isProposalsOpen, setIsProposalsOpen] = useState(true);
  const [isDraftsOpen, setIsDraftsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDiscussionsOpen, setIsDiscussionsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [template, setTemplate] = useState('');
  const [calendar, setCalendar] = useState([]);
  const { authenticated, user, ready } = useAuth();
  const [daoLinks, setDaoLinks] = useState<DaoLink[]>([]);
  const [daoSettings, setDaoSettings] = useState<DaoLink[]>([]);
  const [daoTemplates, setDaoTemplates] = useState<DaoLink[]>([]);
  const [daoTemplate, setDaoTemplate] = useState<any>();
  const [documentId, setDocumentId] = useState<any>();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [calendarId, setCalendarId] = useState('');
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any>([]);
  const [selectedProject, setSelectedProject] = useState(ALL_DOCS_FOLDER);
  const [showNew, setShowNew] = useState(false);
  const [newProject, setNewProject] = useState('untitled');
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [allDocuments, setAllDocuments] = useState<any[]>([]);
  const [isProjectsCollapsed, setIsProjectsCollapsed] = useState(false);
  const [isProjectsMinimized, setIsProjectsMinimized] = useState(false);
  const { trackEvent } = useMixpanel();
  const { setLogo, setColor, setColorDark, setName, name, setShowBack } =
    useDAO();

  // const { wallets } = useWallets();

  const handleNewProject = () => {
    setShowNew(true);
  };

  const handleSaveTemplate = async () => {
    const data = {
      title: 'Mission request',
      markdown: `
      # Mission Request Template
              _[For more information regarding concepts and requirements please check Mission Request Creation Guide](https://gov.optimism.io/t/season-6-mission-request-creation-guide/8123)_
              _Please note Missions must be completed within 12 months (i.e. marked as done)._

              **Delegate Mission Request Summary:** _Mission Requests should be tightly scoped and well-specified. You can see examples [here 9](https://github.com/ethereum-optimism/ecosystem-contributions/issues?q=is%3Aissue+is%3Aopen+RFP). You should describe your Mission Request in 1-2 sentences here._

              **S6 [Intent 39](https://gov.optimism.io/t/season-6-intents-ratification/8104):** _Please list the Intent your Request aligns with here_

              **Proposing Delegate/Citizen:** _Delegate name/pseudonym, linked to delegate profile_

              **Total grant amount:** _This amount should reflect the total amount required to execute the Mission. If a Request specifies multiple applicants, the grant amount should reflect the total OP required to support all qualified applicants. (e.g., if the Request is to make 50k OP grants to 4 applicants, you could specify the total grant amount as 200k OP.)_

              _We have suggested applicants request 80% of the amount of impact they believe they will generate, incentivizing the rest to be rewarded retroactively based on quality of execution in future Retro Funding Rounds._

              **For clarity, additional Retro Funding is never guaranteed and applicants should not submit applications on the assumption that they will receive more than the upfront grant.**

              **Should this Mission be fulfilled by one or multiple applicants:** _Select from: “One,” “Up to X” or “Multiple”_

              **How will this Mission Request help accomplish the above Intent?**

              - _Please explain alignment with the relevant Intent_

              **What is required to execute this Mission Request?**

              - _Please list responsibilities and/or expected deliverables_

              **How should governance participants measure impact upon completion of this Mission?**

              - **Milestones:** _These measures should measure progress towards completion, including expected completion dates for each is recommended_

              - **Metrics:** _In order to standardize evaluation, it is recommended that metrics for success and milestones tie back to the target metrics listed under each Intent as much as possible._

              - **Impact:** _These measures should be focused on performance and may be used to assess your Misson’s impact in the next round of Retro Funding_

              **Has anyone other than the proposer contributed to this Mission Request?** _If so, who, and what parts of this application did they contribute to? If you sponsored another community members idea, please credit them here._
                    
      `,

      timestamp: Date.now(),
    };

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error guardando el documento');
      }

      const result = await response.json();
      console.log('Documento guardado con éxito:', result);
    } catch (err) {
      setError('Ocurrió un error al guardar el documento.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async () => {
    const pathName = `${idDao}/${user?.wallet?.address}/0/${newProject}`;
    await upsertDocument(pathName, ' ', null, null, '', '', [], []);

    // refresh list of projects
    // then if i save a project that is in the new list, delete it ?

    setNewProject('untitled');
    setShowNew(false);
    await fetchDocuments();
  };

  const handleOpenDraft = (docId: string) => {
    setDocumentId(docId);
    setIsEditorOpen(!isEditorOpen);
  };

  async function fetchDocuments() {
    try {
      console.log('fetching documents');
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
      setIsEditorOpen(false);
      console.log('fetching ended.');
    } catch (error) {
      console.error('Failed to get documents:', error);
    }
  }

  const handleSelectProject = (pro: string) => {
    // console.log('allDocuments ', allDocuments);
    pro === ALL_DOCS_FOLDER
      ? setDocuments(allDocuments)
      : setDocuments(allDocuments.filter(d => d.project === pro));
    setSelectedProject(pro);
  };

  useEffect(() => {
    setName(idDao);
    setShowBack(true);
  }, [idDao, setName, setShowBack]);

  useEffect(() => {
    async function fetchDAOLinks() {
      try {
        const docs = await getDocument('DAOS', idDao);
        setDaoLinks(docs?.links as DaoLink[]);
        setDaoSettings(docs?.settings as DaoLink[]);
        setDaoTemplates(
          docs?.templates.filter((x: any) => x.enabled === true) as DaoLink[],
        );
        console.log(docs?.templates);
        setCalendarId(docs?.settings[0].google_calendar_id);
        setLogo(docs?.settings[0].logoSVG || '');
        setColor(docs?.settings[0].color || 'stone-100');
        setColorDark(docs?.settings[0].colorDark || 'stone-900');
        setLoading(false);
      } catch (err) {
        setError('Error fetching documents ');
        setLoading(false);
      }
    }

    // DEPRECATED
    // async function fetchLHUploads() {
    //   const wallet = wallets[0];
    //   if (!wallet) return;
    //   const provider = await wallet.getEthereumProvider();
    //   const address = wallet.address;
    //   if (!address) return;
    //   const data = await getLHkey(address, provider);

    //   if (!data) return;

    //   const response = await getLHUploads(data.key.data.apiKey);
    //   if (!response) return;
    //   setList(response?.data?.fileList);
    // }

    if (!idDao || !user) return;
    fetchDAOLinks();
    fetchDocuments();
    // fetchLHUploads();
  }, [idDao, user]);

  useEffect(() => {
    async function exe(id: string) {
      const events = await getCalendar(id);
      setCalendar(events);
    }

    if (!idDao) {
      return;
    }
    if (!calendarId || calendarId === '') return;
    exe(calendarId);
  }, [idDao, calendarId]);

  if (loading)
    return (
      <PlatformLayout>
        <Loader />
      </PlatformLayout>
    );

  if (error) return <div>Error: {error}</div>;

  const handleMinimizeProjects = () => {
    setIsProjectsMinimized(!isProjectsMinimized);
  };

  return (
    <PlatformLayout>
      <div className="flex flex-col flex-grow overflow-auto w-full">
        {!isEditorOpen ? (
          <div className="flex flex-col flex-grow overflow-auto w-full px-5">
            {/* dashboard  */}

            {/* tab buttons */}
            <div
              id="divButtons"
              className="flex mb-3 mt-6 flex-col sm:flex-row w-full gap-4 px-1 ">
              {/* proposals  */}
              <button
                onClick={() => {
                  setIsDiscussionsOpen(false);
                  setIsCalendarOpen(false);
                  setIsResourcesOpen(false);
                  setIsDraftsOpen(false);
                  setIsProposalsOpen(true);
                }}
                className={`flex flex-col rounded-lg px-3 py-2  outline-none
                    ${isProposalsOpen && ' bg-stone-100 dark:bg-stone-700 '}
                  text-stone-600 dark:text-stone-200 text-sm`}>
                Proposals
              </button>

              {/* drafts  */}
              <button
                onClick={async () => {
                  await fetchDocuments();
                  setIsDraftsOpen(true);
                  setIsResourcesOpen(false);
                  setIsCalendarOpen(false);
                  setIsDiscussionsOpen(false);
                  setIsProposalsOpen(false);
                  // refresh draft list
                }}
                className={`  rounded-lg px-3 py-2  outline-none
                  ${isDraftsOpen && ' bg-stone-100 dark:bg-stone-700 '}
                text-stone-600 dark:text-stone-300 text-sm`}>
                Drafts
              </button>

              {/* resources  */}
              <button
                onClick={() => {
                  setIsResourcesOpen(true);
                  setIsCalendarOpen(false);
                  setIsDiscussionsOpen(false);
                  setIsDraftsOpen(false);
                  setIsProposalsOpen(false);
                  trackEvent('dao-resources', { user: user?.wallet?.address });
                }}
                className={`  rounded-lg px-3 py-2  outline-none
                  ${isResourcesOpen && ' bg-stone-100 dark:bg-stone-700 '}
                text-stone-600 dark:text-stone-300 text-sm`}>
                DAO resources
              </button>

              {/* calendar  */}
              <button
                onClick={() => {
                  setIsCalendarOpen(true);
                  setIsDraftsOpen(false);
                  setIsResourcesOpen(false);
                  setIsDiscussionsOpen(false);
                  setIsProposalsOpen(false);
                  trackEvent('calendar', { user: user?.wallet?.address });
                }}
                className={`  rounded-lg px-3 py-2  outline-none
                      ${isCalendarOpen && ' bg-stone-100 dark:bg-stone-700 '}
                    text-stone-600 dark:text-stone-300 text-sm`}>
                Calendar
              </button>

              {/* Discussions */}
              <button
                onClick={() => {
                  setIsDiscussionsOpen(true);
                  setIsCalendarOpen(false);
                  setIsResourcesOpen(false);
                  setIsDraftsOpen(false);
                  setIsProposalsOpen(false);
                }}
                className={`flex flex-col rounded-lg px-3 py-2  outline-none
                    ${isDiscussionsOpen && ' bg-stone-100 dark:bg-stone-700 '}
                  text-stone-600 dark:text-stone-200 text-sm`}>
                Discussions
              </button>

              {/* dao settings */}
              {/* <button
                      onClick={() => {
                        setIsActivityOpen(false);
                        setIsCalendarOpen(false);
                        setIsResourcesOpen(false);
                        setIsDraftsOpen(false);
                        setIsSettingsOpen(true);
                      }}
                      className={`flex flex-col rounded-lg px-3 py-2  outline-none
                            ${isActivityOpen && ' bg-stone-100 dark:bg-stone-700 '}
                          text-stone-600 dark:text-stone-200 text-sm`}>
                      DAO Settings
                  </button> */}
            </div>
            {/* tabs contents  */}
            <div className="flex flex-col flex-grow overflow-auto pb-2 h-full">
              {/* proposals  */}
              <div
                className={` rounded-lg  
                  flex flex-col flex-grow overflow-auto h-full
                  transition-all duration-300 ease-in-out
                ${isProposalsOpen ? 'max-h-full' : 'max-h-0'}  `}>
                <div className="pb-2 h-full">
                  <ProposalList idDao={idDao} />
                </div>
              </div>

              {/* projects and drafts  */}
              <div
                className={` rounded-lg px-1 flex flex-col flex-grow overflow-auto
                    transition-all duration-300 ease-in-out h-full
                    ${isDraftsOpen ? 'max-h-full' : 'max-h-0'}
                  `}>
                <div className="flex flex-col flex-grow overflow-auto sm:flex-row w-full gap-4 pb-2 h-full">
                  {/* project area */}
                  {isProjectsMinimized ? (
                    <div className="sm:mt-[55px] w-9 relative sm:left-[-52px] ">
                      <button
                        onClick={() => setIsProjectsMinimized(false)}
                        className=" flex gap-x-4 items-center sm:transform
                            sm:-rotate-90 border dark:text-stone-300 dark:border-stone-700 px-3 py-2 rounded-lg">
                        <div className=" whitespace-nowrap">
                          Projects
                          <span className="ml-4 font-bold text-xs">
                            {projects.length - 1}
                          </span>
                        </div>
                        <PinBottomIcon />
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`border p-4 rounded-xl  text-stone-600 dark:text-stone-300
                          flex flex-col flex-grow overflow-auto border-stone-200 dark:border-stone-700 ${
                            isProjectsCollapsed ? 'w-1/4' : 'w-full'
                          }`}>
                      <div className="flex justify-between">
                        <div className="text-lg font-semibold">Projects</div>
                        <div className="relative">
                          <div className="flex gap-4 items-center">
                            <button
                              onClick={handleNewProject}
                              className="text-xs rounded-md px-3 py-2
                             dark:hover:bg-stone-700
                             hover:bg-stone-100
                             dark:text-stone-400 text-stone-900">
                              + New project
                            </button>

                            <button onClick={handleMinimizeProjects}>
                              <PinLeftIcon />
                            </button>
                          </div>
                          {showNew && (
                            <div className="absolute w-48 -left-20 p-3 rounded-md bg-stone-100  shadow-md dark:shadow-stone-800 dark:bg-stone-500">
                              <input
                                onChange={e => setNewProject(e.target.value)}
                                className="px-3 mr-2 py-2 w-full text-xs outline-none rounded-sm 
                              placeholder:dark:text-stone-800 dark:bg-stone-600 bg-white
                              "
                                placeholder="Enter a name..."
                                type="text"
                              />
                              <div className="flex pt-2 justify-between w-full gap-2">
                                <button
                                  onClick={handleSaveProject}
                                  className="text-xs w-20 rounded-md px-3 py-2
                                dark:hover:bg-stone-700
                                hover:bg-stone-200
                                dark:text-stone-700 hover:dark:text-stone-400 text-stone-900">
                                  Save
                                </button>

                                <button
                                  onClick={() => setShowNew(false)}
                                  className="text-xs  w-20 rounded-md px-3 py-2
                                dark:hover:bg-stone-700
                                hover:bg-stone-200
                                dark:text-stone-700 hover:dark:text-stone-400 text-stone-900">
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {!isProjectsCollapsed ? (
                        <div className="text-xs mb-4">
                          View and manage all active projects.
                        </div>
                      ) : (
                        <div className="py-4"> </div>
                      )}

                      <hr className="dark:border-stone-700" />
                      {/* the project list  */}
                      <div className="flex flex-col flex-grow overflow-auto mt-4 gap-1">
                        {projects && projects.length > 0 ? (
                          <ProjectList
                            handleSelect={e => handleSelectProject(e)}
                            projects={projects}
                          />
                        ) : (
                          <div className="flex gap-4 mt-4 flex-col items-center justify-center">
                            <MoonIcon width={40} height={40} />
                            No drafts to display
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* draft area  */}
                  <div
                    className="  w-full border p-4 rounded-xl h-full flex flex-col flex-grow overflow-auto
                    text-stone-600 dark:text-stone-300
                    border-stone-200 dark:border-stone-700">
                    <div className="flex items-baseline justify-between">
                      <div className="text-lg font-semibold">Drafts</div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setDocumentId('0');
                            setDaoTemplate('');
                            setIsEditorOpen(true);
                            trackEvent('new draft button', {
                              user: user?.wallet?.address,
                            });
                          }}
                          className="text-xs rounded-md px-3 py-2
                             dark:hover:bg-stone-700
                             hover:bg-stone-100
                             dark:text-stone-400 text-stone-900">
                          + New draft
                        </button>

                        <DropdownMenu>
                          <DropdownMenuTrigger
                            className="outline-none "
                            asChild>
                            <button
                              className="text-xs rounded-md px-3 py-2
                             dark:hover:bg-stone-700
                             hover:bg-stone-100
                             dark:text-stone-400 text-stone-900">
                              Use template
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="text-xs bg-stone-100 dark:bg-stone-700 p-3 outline-none z-50 relative   shadow rounded-md"
                            align="end">
                            <DropdownMenuItem
                              className="hover:bg-stone-200 
                               hover:dark:bg-stone-600 outline-none 
                               cursor-pointer rounded-md px-3 py-2">
                              Coming Soon™
                            </DropdownMenuItem>

                            {daoTemplates.map((i: any, k: number) => (
                              <button
                                key={k}
                                onClick={() => {
                                  setDocumentId('0');
                                  setDaoTemplate(i);
                                  setIsEditorOpen(true);
                                  trackEvent('new draft with template', {
                                    user: user?.wallet?.address,
                                  });
                                }}
                                className="hover:bg-stone-200  hover:dark:bg-stone-600  
                              outline-none cursor-pointer rounded-md px-3 py-2">
                                {i.name}
                              </button>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="text-xs mb-4">
                      Access to your draft proposals.
                    </div>
                    <hr className="dark:border-stone-700" />
                    {/* the draft list  */}
                    <div className="flex flex-col flex-grow overflow-auto mt-4 h-full gap-1">
                      {loading ? (
                        <Loader />
                      ) : documents && documents.length > 0 ? (
                        <DraftList
                          handleOpenDraft={(e: any) => handleOpenDraft(e)}
                          documents={documents}
                          afterOperation={fetchDocuments}
                        />
                      ) : (
                        <div className="flex gap-4 mt-4 flex-col items-center justify-center">
                          <MoonIcon width={40} height={40} />
                          No drafts to display
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* dao resources */}
              <div
                className={` rounded-lg flex
                  transition-all duration-300 ease-in-out h-full overflow-auto
                    ${isResourcesOpen ? 'max-h-full' : 'max-h-0'}
                  `}>
                <div className=" w-full">
                  <DaoLinks arrayLinks={daoLinks} />
                </div>
              </div>

              {/* discussions */}
              <div
                className={` rounded-lg  overflow-hidden transition-all duration-300 ease-in-out
                ${isDiscussionsOpen ? 'max-h-full' : 'max-h-0'}  `}>
                <div className="pb-2">
                  {/* <Discussions sss vssss s sss  /> */}
                </div>
              </div>

              {/* calendar  */}
              <div
                className={` rounded-lg h-full
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isCalendarOpen ? 'max-h-full' : 'max-h-0'}
                `}>
                <>
                  <div
                    className={` flex flex-col flex-grow overflow-auto
                transition-all duration-300 ease-in-out  h-full
                  ${isCalendarOpen ? 'max-h-full' : 'max-h-0'}
                `}>
                    {isCalendarOpen && (
                      <div
                        className="w-full h-full
                        flex flex-col flex-grow overflow-auto
                        rounded-lg border dark:border-stone-700 shadow  ">
                        <div
                          id="sector2"
                          className="flex  flex-col sm:flex-row w-full">
                          {idDao === 'arbitrum' && <ArbitrumAnn />}
                        </div>

                        {/* das kalender  */}
                        <div
                          className="mx-4 mt-2 text-stone-600
                          dark:text-stone-200 text-centers mb-4 pt-3 text-lg font-semibold ">
                          Upcoming Events
                        </div>
                        <div
                          className="flex flex-wrap justify-center pb-6 gap-4 h-full
                           flex-grow overflow-auto">
                          {calendar.length > 0 ? (
                            calendar.map((item: any, key) => (
                              // <div key={key}>
                              <DaoEvent
                                key={key}
                                id={item.id}
                                updated={item.updated}
                                summary={item.summary}
                                creatorEmail={item.creatorEmail}
                                htmlLink={item.htmlLink}
                                start={item.start}
                                startTimezone={item.startTimezone}
                                end={item.end}
                                endTimeZone={item.endTimeZone}
                                hangoutLink={item.hangoutLink}
                              />
                              // </div>
                            ))
                          ) : (
                            <>No events set for the next two weeks</>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              </div>

              {/* dao setting */}
              {/* <div
              className={` rounded-lg  overflow-hidden transition-all duration-300 ease-in-out
                ${isSettingsOpen ? 'max-h-full' : 'max-h-0'}  `}>
              <div className="pb-2">
                Template markdown
                <input
                  onChange={e => setTemplate(e.target.value)}
                  className="px-2 mr-2 py-1 w-8/12 outline-none rounded-md  "
                  placeholder="Enter a template markdown"
                  type="text"
                />
                <button
                  onClick={handleSaveTemplate}
                  className={`  rounded-lg px-3 py-2  outline-none
                  bg-stone-100 dark:bg-stone-700 '}
              text-stone-600 dark:text-stone-300 text-sm`}>
                  Upload template
                </button>
              </div>
            </div> */}
            </div>
          </div>
        ) : (
          // sliding editor
          <div
            className=" px-4
                bg-stone-100 dark:bg-stone-800 dark:text-stone-400
                shadow-lg w-full  
                transition-opacity duration-300 ease-in-out flex flex-col flex-grow overflow-auto
                opacity-100">
            {user?.wallet?.address && idDao && (
              <CollaborativeEditor
                afterSave2={() => true}
                proposalURL={''}
                backToProposals={false}
                daoTemplate={daoTemplate}
                folder={`${idDao}/${user?.wallet?.address}`}
                documentId={documentId}
                afterSave={fetchDocuments}
                projectName={selectedProject}
                projects={projects.filter(
                  (r: any) => r.project !== ALL_DOCS_FOLDER,
                )}
              />
            )}
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
