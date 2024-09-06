"use client";
// the dao home

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  fetchAllDocuments,
  localTime,
  toLocalShortDateTime,
} from "../../../lib/utils";
// import { getLHUploads, getLHkey } from "../../../lib/storageLighthouse";
import { useEffect, useState } from "react";

import ActivityFeed from "../../components/ActivityFeed";
import ArbitrumAnn from "../../components/ArbitrumAnn";
import { Button } from "../../components/ui/Button";
import CollaborativeEditor from "../../components/CollaborativeEditor";
import DaoEvent from "../../components/DaoEvents";
import { DaoLink } from "../../../types/DaoLink";
import DaoLinks from "../../components/DaoLinks";
import Link from "next/link";
import Loader from "../../components/ui/Loader";
import PlatformLayout from "../../layouts/platformLayout";
import { getCalendar } from "../../../lib/calendar";
import { getDocument } from "../../../lib/firestore";
import { useAuth } from "../../components/contexts/AuthContext";
import { useDAO } from "../../components/contexts/DAOContext";

export default function DaoPage({ params }: { params: { id: string } }) {
  const { id: idDao } = params;
  // const par = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isDraftsOpen, setIsDraftsOpen] = useState(true);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [calendar, setCalendar] = useState([]);
  const { authenticated, user, ready } = useAuth();
  const [daoLinks, setDaoLinks] = useState<DaoLink[]>([]);
  const [daoSettings, setDaoSettings] = useState<DaoLink[]>([]);
  const [daoTemplates, setDaoTemplates] = useState<DaoLink[]>([]);
  const [calendarId, setCalendarId] = useState("");
  const { logo, setLogo, color, setColor, colorDark, setColorDark } = useDAO();
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [documentId, setDocumentId] = useState<any>();

  // const { wallets } = useWallets();

  const handleNewDraft = () => {
    // assign new file name according to the list!

    //
    setDocumentId("0");
    setIsOpen(!isOpen);
  };

  const handleOpenDraft = (docId: string) => {
    setDocumentId(docId);
    setIsOpen(!isOpen);
    console.log("abierto el docid ", docId, documentId);
  };

  async function fetchDocuments() {
    try {
      const pathName = `/documents/${idDao}/${user?.wallet?.address}`;
      const documents = await fetchAllDocuments(pathName);
      console.log("Documents:", pathName, documents);
      setDocuments(documents);
      setIsOpen(false);

      // Puedes hacer lo que necesites con los documentos aquí
    } catch (error) {
      console.error("Failed to get documents:", error);
    }
  }

  useEffect(() => {
    async function fetchDAOLinks() {
      try {
        const docs = await getDocument("DAOS", idDao);
        setDaoLinks(docs?.links as DaoLink[]);
        setDaoSettings(docs?.settings as DaoLink[]);
        setDaoTemplates(docs?.templates as DaoLink[]);
        setCalendarId(docs?.settings[0].google_calendar_id);
        setLogo(docs?.settings[0].logoSVG || "");
        setColor(docs?.settings[0].color || "stone-100");
        setColorDark(docs?.settings[0].colorDark || "stone-900");
        setLoading(false);
      } catch (err) {
        setError("Error fetching documents ");
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
      console.log("loading calendar...");
      const events = await getCalendar(id);
      setCalendar(events);
      console.log("ee ", events);
    }

    if (!idDao) {
      return;
    }
    if (!calendarId || calendarId === "") return;
    exe(calendarId);
  }, [idDao, calendarId]);

  if (loading)
    return (
      <PlatformLayout>
        <Loader />
      </PlatformLayout>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <PlatformLayout>
      <div className="flex flex-row  w-full  relative">
        {/* dashboard  */}
        <div className="flex flex-col w-full pt-14s px-6">
          <div
            id="sector1"
            className="flex mb-3 mt-6 flex-col sm:flex-row w-full gap-4"
          >
            {/* drafts  */}
            <button
              onClick={() => {
                setIsDraftsOpen(!isDraftsOpen);
                setIsResourcesOpen(false);
                setIsCalendarOpen(false);
                setIsActivityOpen(false);
              }}
              className={`  rounded-lg px-3 py-2  outline-none
                  ${isDraftsOpen && " bg-stone-100 dark:bg-stone-700 "}
                text-stone-600 dark:text-stone-300 text-sm`}
            >
              Drafts
            </button>

            {/* resources  */}
            <button
              onClick={() => {
                setIsResourcesOpen(!isResourcesOpen);
                setIsCalendarOpen(false);
                setIsActivityOpen(false);
                setIsDraftsOpen(false);
              }}
              className={`  rounded-lg px-3 py-2  outline-none
                  ${isResourcesOpen && " bg-stone-100 dark:bg-stone-700 "}
                text-stone-600 dark:text-stone-300 text-sm`}
            >
              DAO resources
            </button>

            {/* calendar  */}
            <button
              onClick={() => {
                setIsCalendarOpen(!isCalendarOpen);
                setIsDraftsOpen(false);
                setIsResourcesOpen(false);
                setIsActivityOpen(false);
              }}
              className={`  rounded-lg px-3 py-2  outline-none
                      ${isCalendarOpen && " bg-stone-100 dark:bg-stone-700 "}
                    text-stone-600 dark:text-stone-300 text-sm`}
            >
              Calendar
            </button>

            {/* activity feed  */}
            <button
              onClick={() => {
                setIsActivityOpen(!isActivityOpen);
                setIsCalendarOpen(false);
                setIsResourcesOpen(false);
                setIsDraftsOpen(false);
              }}
              className={`flex flex-col rounded-lg px-3 py-2  outline-none
                    ${isActivityOpen && " bg-stone-100 dark:bg-stone-700 "}
                  text-stone-600 dark:text-stone-300 text-sm`}
            >
              Activity feed
            </button>
          </div>

          {/* tab contents  */}
          <div
            className={` rounded-lg 
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isActivityOpen ? "max-h-full" : "max-h-0"}
                `}
          >
            <ActivityFeed />
          </div>
          <div
            className={` rounded-lg
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isCalendarOpen ? "max-h-full" : "max-h-0"}
                `}
          >
            <>
              <div
                className={`
              overflow-hidden transition-all duration-300 ease-in-out 
              ${isCalendarOpen ? "max-h-full" : "max-h-0"}
            `}
              >
                {isCalendarOpen && (
                  <div
                    className="w-full rounded-lg 
               border dark:border-stone-700 shadow
              "
                  >
                    <div
                      id="sector2"
                      className="flex  flex-col sm:flex-row w-full"
                    >
                      {idDao === "arbitrum" && <ArbitrumAnn />}
                    </div>

                    {/* das kalender  */}
                    <div
                      className="mx-4 mt-4 text-stone-600
                 dark:text-stone-200 text-centers  mb-4 pt-3  text-lg font-semibold "
                    >
                      Upcoming Events
                    </div>
                    <div
                      //   className="flex gap-4 mx-3 mt-3 mb-2 overflow-x-hidden hover:overflow-x-scroll
                      // scrollbar-default"
                      className="flex flex-wrap justify-center pb-6 gap-4 "
                    >
                      {calendar.length > 0 ? (
                        calendar.map((item: any, key) => (
                          <div key={key}>
                            <DaoEvent
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
                          </div>
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

          <div
            className={` rounded-lg
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isDraftsOpen ? "max-h-96" : "max-h-0"}
                `}
          >
            <div
              id="sector2"
              className="flex flex-col sm:flex-row w-full gap-4 "
            >
              <div
                className="bg-transparent w-full border p-4 rounded-md
            text-stone-600 dark:text-stone-300 shadow-md
            border-stone-200 dark:border-stone-700"
              >
                <div className="flex justify-between">
                  <div className="text-lg font-semibold">Projects</div>
                  <Button
                    className="rounded-md px-2 py-1 text-xs dark:hover:bg-rose-900 dark:text-stone-400 text-black"
                    variant={"ghost"}
                    size={"sm"}
                  >
                    + New project
                  </Button>
                </div>
                <span className="text-xs">
                  View and manage all active subprojects.
                </span>

                {/* the list  */}
                <div className="flex flex-col mt-2 gap-1 hidden">
                  <Link href={"#"}>
                    <div
                      className="hover:bg-rose-200 dark:hover:bg-rose-400 hover:dark:text-stone-800
                  px-2 py-1 rounded-md
                  text-xs font-mono grid grid-cols-2"
                    >
                      <div>Project 1</div>
                      <div className="text-right">11 Collaborators</div>
                    </div>
                  </Link>

                  <Link href={"#"}>
                    <div
                      className="hover:bg-rose-200 dark:hover:bg-rose-400 hover:dark:text-stone-800
                px-2 py-1 rounded-md
                text-xs font-mono grid grid-cols-2"
                    >
                      <div>Project 2</div>
                      <div className="text-right">11 Collaborators</div>
                    </div>
                  </Link>

                  <Link href={"#"}>
                    <div
                      className="hover:bg-rose-200 dark:hover:bg-rose-400 hover:dark:text-stone-800
              px-2 py-1 rounded-md
              text-xs font-mono grid grid-cols-2"
                    >
                      <div>Project 3</div>
                      <div className="text-right">11 Collaborators</div>
                    </div>
                  </Link>
                </div>
              </div>

              <div
                className="bg-transparent w-full h-full border p-4 rounded-md
              text-stone-600 dark:text-stone-300 shadow-md
              border-stone-200 dark:border-stone-700"
              >
                <div className="flex items-baseline justify-between">
                  <div className="text-lg font-semibold">Drafts</div>
                  <div className="flex gap-1">
                    <Button
                      className="rounded-md px-2 py-1 text-xs dark:hover:bg-rose-900 dark:text-stone-400 text-black"
                      onClick={handleNewDraft}
                      variant={"ghost"}
                      size={"sm"}
                    >
                      + New draft
                    </Button>
                    {/* <Button
                      className="rounded-md px-2 py-1 text-xs text-black"
                      onClick={handleNewDraft}
                      variant={"ghost"}
                      size={"sm"}
                    >
                      + Use template
                    </Button> */}

                    {/* <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size={"sm"}
                          className="text-xs hover:bg-stone-100 border-0 text-black"
                        >
                          Use Template
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="text-xs bg-stone-100 p-3 shadow rounded-md"
                        align="end"
                      >
                        <DropdownMenuItem className="hover:bg-stone-200 rounded-md px-3 py-2">
                          AIP Template
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-stone-200 rounded-md px-3 py-2">
                          Delegate Statement
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </div>
                </div>
                <span className="text-xs">Access to your draft proposals.</span>

                {/* the list  */}
                <div className="flex flex-col mt-2 gap-1">
                  {/* { DEPRECATED
              publicKey: '0x4e6d5be93ab7c1f75e30dd5a7f574f42f675eed3',
              fileName: 'sample.txt',
              mimeType: 'text/plain',
              txHash: '',
              status: 'queued',
              createdAt: 1691087810426,
              fileSizeInBytes: '14',
              cid: 'QmQK9V46b4vpNUd7pe7EcCqihBEmcSLH4NVNWukLJhGzgN',
              id: '1b2623bd-64ca-4434-8619-24c9a1eca840',
              lastUpdate: 1691087810426,
              encryption: false
            }
             */}

                  {loading ? (
                    <Loader />
                  ) : (
                    documents.map((i, k) => (
                      <div key={k}>
                        <div
                          className="hover:bg-rose-200 dark:hover:bg-rose-400 hover:dark:text-stone-800
                          px-2 py-1 rounded-md  items-baseline
                          text-xs   flex justify-between"
                        >
                          <div>
                            <button
                              className="w-60 text-left "
                              style={{ fontSize: "7pt" }}
                              onClick={() => handleOpenDraft(i.id)}
                            >
                              {i.title || `#${i.id}`}
                            </button>
                          </div>

                          <div className=" flex gap-4">
                            {/* DEPRECATED  */}
                            {/* <div className=" items-baseline">
                              <div
                                style={{ fontSize: "7pt" }}
                                className=" whitespace-nowrap  w-20 text-center px-1 py-1 rounded-sm font-thin font-mono  "
                              >
                                {toLocalShortDateTime(parseInt(i.id))}
                              </div>
                            </div> */}

                            <div className=" items-baseline">
                              <div
                                style={{ fontSize: "7pt" }}
                                className={` ${
                                  i.priority === "critical" &&
                                  "dark:bg-red-600 bg-rose-500 text-white font-semibold"
                                } w-14 text-center px-1 py-0 rounded-sm`}
                              >
                                {i.priority?.toString() || "UNSET"}
                                {/* {localTime(i.lastUpdate, "America/Montevideo")} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`overflow-hidden  rounded-lg flex gap-4
                  transition-all duration-300 ease-in-out
                    ${isResourcesOpen ? "max-h-full" : "max-h-0"}
                  `}
          >
            <DaoLinks arrayLinks={daoLinks} />
          </div>
        </div>

        {/* sliding editor  */}
        {isOpen ? (
          <div
            className=" px-3 
            bg-slate-200 dark:bg-stone-700 dark:text-stone-400
            bg-opacity-90 backdrop-blur-sm rounded-xl
            absolute z-50 w-2/3 h-screen right-0 shadow-lg 
            transition-opacity duration-300 ease-in-out
            opacity-100"
          >
            <div className="flex pb-4 justify-between">
              <span className="text-md mt-3 ">Create draft</span>
              <button
                className="text-lg mt-3 font-thin"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="w-full " style={{ height: "100vh" }}>
              {user?.wallet?.address && idDao && (
                <CollaborativeEditor
                  // TODO next iteration
                  // username={user?.wallet?.address}
                  daoTemplates={daoTemplates}
                  folder={`${idDao}/${user?.wallet?.address}`}
                  documentId={documentId}
                  afterSave={fetchDocuments}
                />
              )}
            </div>
          </div>
        ) : (
          <div
            className="
            bg-slate-200 dark:bg-stone-700 dark:text-stone-400
            bg-opacity-90 backdrop-blur-sm rounded-xl
            absolute z-50 w-2/3 h-screen right-0 pt-10 shadow-lg
            transition-opacity duration-300 ease-in-out
            opacity-0 pointer-events-none"
          ></div>
        )}
      </div>
    </PlatformLayout>
  );
}
