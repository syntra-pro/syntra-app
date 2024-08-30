"use client";
// the dao home

// import { getLHUploads, getLHkey } from "../../../lib/storageLighthouse";
import { useEffect, useState } from "react";

import ArbitrumAnn from "../../components/ArbitrumAnn";
import { Button } from "../../components/ui/Button";
import CollaborativeEditor from "../../components/CollaborativeEditor";
import DaoEvent from "../../components/DaoEvents";
import { DaoLink } from "../../../types/DaoLink";
import DaoLinks from "../../components/DaoLinks";
import Link from "next/link";
import PlatformLayout from "../../layouts/platformLayout";
import { getCalendar } from "../../../lib/calendar";
import { getDocument } from "../../../lib/firestore";
import { localTime } from "../../../lib/utils";
import { useAuth } from "../../components/contexts/AuthContext";
import { useParams } from "next/navigation";
import { useWallets } from "@privy-io/react-auth";

// import { Breadcrumb } from "@/components/ui/Breadcrumb";
// import Chip from "@/components/ui/Chip";
// import { usePrivy } from "@privy-io/react-auth";

export default function TokenPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const par = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [calendar, setCalendar] = useState([]);
  const { authenticated, user, ready } = useAuth();

  const [tokenB, setTokenB] = useState("No token");

  useEffect(() => {
    async function exe() {
      const events = await getCalendar();
      setCalendar(events);
    }

    if (!id) {
      return;
    }

    exe();
  }, [id]);

  const handleNewDraft = () => {
    // assign new file name
    // create folder?
    //
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log("Auth state in component:", { authenticated, user, ready });
  }, [authenticated, ready, user]);

  const [daoLinks, setDaoLinks] = useState<DaoLink[]>([]);
  const [daoTemplates, setDaoTemplates] = useState<DaoLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { wallets } = useWallets();

  useEffect(() => {
    async function fetchDAOLinks() {
      try {
        const docs = await getDocument("DAOS", id);

        setDaoLinks(docs?.links as DaoLink[]);
        setDaoTemplates(docs?.templates as DaoLink[]);
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

    if (!id || !user) return;
    fetchDAOLinks();
    // fetchLHUploads();
  }, [id, user]);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center bg-transparent">
        <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-rose-500"></div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <PlatformLayout>
      <div className="flex flex-row  w-full  relative">
        {/* dashboard  */}
        <div className="flex flex-col w-full pt-14 px-6">
          <div
            id="sector1"
            className="flex mt-6 flex-col sm:flex-row w-full gap-4"
          >
            <div className="w-full">
              {/* resources  */}
              <div
                className="flex flex-col rounded-t-lg px-3 py-2 transition-colors
                bg-stone-100 dark:bg-stone-700
                text-stone-600 dark:text-stone-300"
              >
                <button
                  onClick={() => {
                    setIsResourcesOpen(!isResourcesOpen);
                    setIsTemplatesOpen(false);
                    setIsActivityOpen(false);
                    setShowCalendar(false);
                  }}
                  className="self-start text-sm"
                >
                  {isResourcesOpen ? "↑ " : "↓ "} DAO resources
                </button>
              </div>
            </div>

            {/* templates  */}
            <div className="w-full">
              <div
                className="flex flex-col rounded-t-lg px-3 py-2 transition-colors
                bg-stone-100 dark:bg-stone-700
                text-stone-600 dark:text-stone-300"
              >
                <button
                  onClick={() => {
                    setIsTemplatesOpen(!isTemplatesOpen);
                    setShowCalendar(false);
                    setIsResourcesOpen(false);
                    setIsActivityOpen(false);
                  }}
                  className="self-start text-sm"
                >
                  {isTemplatesOpen ? "↑ " : "↓ "} Templates
                </button>
              </div>

              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isTemplatesOpen ? "max-h-96" : "max-h-0"}
                `}
              >
                <div className="dark:bg-stone-600 bg-stone-100 p-4 text-xs">
                  Coming Soon™
                </div>
              </div>
            </div>

            {/* activity feed  */}
            <div className="w-full">
              <div
                className="flex flex-col rounded-t-lg px-3 py-2 transition-colors
                bg-stone-100 dark:bg-stone-700
                text-stone-600 dark:text-stone-300"
              >
                <button
                  onClick={() => {
                    setIsActivityOpen(!isActivityOpen);
                    setShowCalendar(false);
                    setIsResourcesOpen(false);
                    setIsTemplatesOpen(false);
                  }}
                  className="self-start text-sm"
                >
                  {isActivityOpen ? "↑ " : "↓ "} Activity feed
                </button>
              </div>

              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isActivityOpen ? "max-h-96" : "max-h-0"}
                `}
              >
                <div className="dark:bg-stone-600 bg-stone-100 p-4 text-xs">
                  {/* <DaoLinks arrayLinks={daoTemplates} /> */}
                  Coming Soon™
                </div>
              </div>
            </div>
          </div>

          <div
            className={`overflow-hidden 
                  transition-all duration-300 ease-in-out
                    ${isResourcesOpen ? "max-h-96" : "max-h-0"}
                  `}
          >
            <div className="flex justify-between dark:bg-stone-600 bg-stone-100 py-2 px-4 text-xs">
              <DaoLinks arrayLinks={daoLinks} />
              <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-400">
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="rounded-sm p-2 w-full flex font-bold justify-between
                     hover:bg-rose-200 dark:hover:bg-rose-400 hover:dark:text-stone-800 "
                >
                  <div>✦ Calendar</div>
                  <div className="text-stone-600">↓</div>
                </button>
              </div>
            </div>
          </div>

          <div
            className={`
          overflow-hidden transition-all duration-300 ease-in-out 
          ${showCalendar ? "max-h-full" : "max-h-0"}
        `}
          >
            {showCalendar && (
              <div className="w-full bg-gradient-to-b from-stone-100 to-gray-200 rounded-b-lg rounded-tr-lg">
                <div id="sector2" className="flex  flex-col sm:flex-row w-full">
                  {id === "arbitrum" && <ArbitrumAnn />}
                </div>

                {/* das kalender  */}
                <div className="mx-4 mt-4 text-stone-600 text-centers  mb-4 border-t pt-3 text-sm ">
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

          <div
            id="sector2"
            className="flex my-6 flex-col sm:flex-row w-full gap-4 "
          >
            <div
              className="bg-transparent w-full border p-4 rounded-md
            text-stone-600 dark:text-stone-300 shadow-md
            border-stone-200 dark:border-stone-700"
            >
              <div className="flex justify-between">
                <p className="text-xl font-semibold">Projects</p>
                <Button variant={"ghost"} size={"sm"}>
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
              className="bg-transparent w-full border p-4 rounded-md
              text-stone-600 dark:text-stone-300 shadow-md
              border-stone-200 dark:border-stone-700"
            >
              <div className="flex items-baseline justify-between">
                <p className="text-xl font-semibold">Drafts</p>
                <button
                  className="bg-rose-300 rounded-md px-3 py-2 text-xs text-black"
                  onClick={handleNewDraft}
                  // variant={"ghost"}
                  // size={"sm"}
                >
                  + New draft
                </button>
              </div>
              <span className="text-xs">Access to your draft proposals.</span>

              {/* the list  */}
              <div className="flex flex-col mt-2 gap-1">
                {/* {
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
                {list.map((i) => (
                  <>
                    <Link
                      target="_blank"
                      href={`https://ipfs.io/ipfs/${i.cid}`}
                    >
                      <div
                        className="hover:bg-rose-200 dark:hover:bg-rose-400 hover:dark:text-stone-800
                          px-2 py-1 rounded-md
                          text-xs font-mono grid grid-cols-2"
                      >
                        <div>{i.Filename || i.cid}</div>
                        <div className="text-right">
                          {localTime(i.lastUpdate, "America/Montevideo")}
                        </div>
                      </div>
                    </Link>
                  </>
                ))}
              </div>
            </div>
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
              {user?.wallet?.address && id && (
                <CollaborativeEditor
                  // TODO next iteration
                  // username={user?.wallet?.address}
                  folder={`${id}/${user?.wallet?.address}`}
                  documentId={`doc-${user?.wallet?.address}`}
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
