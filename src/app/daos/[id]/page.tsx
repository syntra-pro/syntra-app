"use client";

// the dao home
import "@fileverse-dev/ddoc/styles";

import { useEffect, useState } from "react";

import ArbitrumAnn from "../../components/ArbitrumAnn";
import { Button } from "../../components/ui/Button";
import DaoEvent from "../../components/DaoEvents";
import { DaoLink } from "../../../types/DaoLink";
import DaoLinks from "../../components/DaoLinks";
import { DdocEditor } from "@fileverse-dev/ddoc";
import Link from "next/link";
import PlatformLayout from "../../layouts/platformLayout";
import { getCalendar } from "../../../lib/calendar";
import { getDocument } from "../../../lib/firestore";
import { useAuth } from "../../components/contexts/AuthContext";
import { useParams } from "next/navigation";

// import "@fileverse-dev/ddoc/dist/style.css";

// import { Breadcrumb } from "@/components/ui/Breadcrumb";
// import Chip from "@/components/ui/Chip";

// import StyledIcon from "@/components/StyledIcon";
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
    setIsOpen(!isOpen);
    // console.log("user ", user, authenticated);
  };

  useEffect(() => {
    console.log("Auth state in component:", { authenticated, user, ready });
  }, [authenticated, ready, user]);

  const [daoLinks, setDaoLinks] = useState<DaoLink[]>([]);
  const [daoTemplates, setDaoTemplates] = useState<DaoLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const docs = await getDocument("DAOS", id);
        console.log("-----++++dao result ", docs);

        setDaoLinks(docs?.links as DaoLink[]);
        setDaoTemplates(docs?.templates as DaoLink[]);
        setLoading(false);
      } catch (err) {
        console.log("err ", err);
        setError("Error fetching documents ");
        setLoading(false);
      }
    }
    if (!id) return;
    fetchDocuments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PlatformLayout>
      <div className="flex flex-row  w-full  relative">
        {/* dashboard  */}
        <div className="flex flex-col w-full pt-16 px-8">
          <div
            id="sector1"
            className="flex mt-6 flex-col sm:flex-row w-full gap-4"
          >
            <div className="w-full">
              <div
                className="flex flex-col rounded-t-lg border border-transparent px-5 py-4 transition-colors
                bg-stone-50 dark:bg-stone-700
                text-stone-600 dark:text-stone-300"
              >
                <h2 className="mb-3 text-xl font-semibold">
                  {id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()}{" "}
                  resources
                </h2>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Access important DAO resources and documents.
                </p>
                <button
                  onClick={() => {
                    setIsResourcesOpen(!isResourcesOpen);
                    setShowCalendar(false);
                  }}
                  className="justify-end self-end"
                >
                  {isResourcesOpen ? "↑" : "↓"}
                </button>
              </div>
              <div
                className={`overflow-hidden 
                  transition-all duration-300 ease-in-out
                    ${isResourcesOpen ? "max-h-96" : "max-h-0"}
                  `}
              >
                <div className="dark:bg-stone-600 bg-stone-100 py-2 px-4 text-xs">
                  <DaoLinks arrayLinks={daoLinks} />
                  <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-400">
                    <button
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="rounded-sm px-2 py-1 w-full flex font-bold justify-between
                     hover:bg-amber-400 dark:hover:bg-amber-400 hover:dark:text-stone-800 "
                    >
                      <p>✦ Calendar</p>
                      <p className="text-stone-600">↓</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* templates  */}
            <div className="w-full">
              <div
                className="flex flex-col rounded-t-lg border border-transparent px-5 py-4 transition-colors
                bg-stone-50 dark:bg-stone-700
                text-stone-600 dark:text-stone-300"
              >
                <h2 className="mb-3 text-xl font-semibold">Templates</h2>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Use pre-built templates for common DAO tasks.
                </p>
                <button
                  onClick={() => setIsTemplatesOpen(!isTemplatesOpen)}
                  className="justify-end self-end"
                >
                  {isTemplatesOpen ? "↑" : "↓"}
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
                className="flex flex-col rounded-t-lg border border-transparent px-5 py-4 transition-colors
                bg-stone-50 dark:bg-stone-700
                text-stone-600 dark:text-stone-300"
              >
                <h2 className="mb-3 text-xl font-semibold">Activity feed</h2>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  The latest DAO tasks.
                  <br /> &nbsp;
                </p>
                <button
                  onClick={() => setIsActivityOpen(!isActivityOpen)}
                  className="justify-end self-end"
                >
                  {isActivityOpen ? "↑" : "↓"}
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

          {showCalendar && (
            <div className="w-full bg-stone-200 rounded-b-lg rounded-tr-lg">
              {/* das kalender  */}
              <div
                className="flex gap-4 mx-3 mt-3 mb-2 overflow-x-hidden hover:overflow-x-scroll
              scrollbar-default"
              >
                {calendar.length > 0 ? (
                  calendar.map((item: any, key) => (
                    <div className="mb-2" key={key}>
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

          <div
            id="sector2"
            className="flex mt-3 flex-col sm:flex-row w-full gap-4 "
          >
            {id === "arbitrum" && <ArbitrumAnn />}
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
                    className="hover:bg-amber-100 dark:hover:bg-amber-400 hover:dark:text-stone-800
              px-2 py-1 rounded-md
              text-xs font-mono grid grid-cols-2"
                  >
                    <div>Project 1</div>
                    <div className="text-right">11 Collaborators</div>
                  </div>
                </Link>

                <Link href={"#"}>
                  <div
                    className="hover:bg-amber-100 dark:hover:bg-amber-400 hover:dark:text-stone-800
              px-2 py-1 rounded-md
              text-xs font-mono grid grid-cols-2"
                  >
                    <div>Project 2</div>
                    <div className="text-right">11 Collaborators</div>
                  </div>
                </Link>

                <Link href={"#"}>
                  <div
                    className="hover:bg-amber-100 dark:hover:bg-amber-400 hover:dark:text-stone-800
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
                <Button onClick={handleNewDraft} variant={"ghost"} size={"sm"}>
                  + New draft
                </Button>
              </div>
              <span className="text-xs">
                Access work on your draft proposals. New project
              </span>

              {/* the list  */}
              <div className="flex flex-col mt-2 gap-1 ">
                <Link href={"#"}>
                  <div
                    className="hover:bg-amber-100 dark:hover:bg-amber-400 hover:dark:text-stone-800
              px-2 py-1 rounded-md
              text-xs font-mono grid grid-cols-2"
                  >
                    <div>Proposal 1</div>
                    <div className="text-right">11 Collaborators</div>
                  </div>
                </Link>

                <Link href={"#"}>
                  <div
                    className="hover:bg-amber-100 dark:hover:bg-amber-400 hover:dark:text-stone-800
              px-2 py-1 rounded-md
              text-xs font-mono grid grid-cols-2"
                  >
                    <div>Proposal 1</div>
                    <div className="text-right">11 Collaborators</div>
                  </div>
                </Link>

                <Link href={"#"}>
                  <div
                    className="hover:bg-amber-100 dark:hover:bg-amber-400 hover:dark:text-stone-800
              px-2 py-1 rounded-md
              text-xs font-mono grid grid-cols-2"
                  >
                    <div>Proposal 1</div>
                    <div className="text-right">11 Collaborators</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* sliding editor  */}
        {isOpen ? (
          <div
            className="
            bg-slate-200 dark:bg-stone-700 dark:text-stone-400
            bg-opacity-90 backdrop-blur-sm rounded-xl
            absolute z-50 w-2/3 h-screen right-0 shadow-lg 
            transition-opacity duration-300 ease-in-out
            opacity-100"
          >
            <div className="flex pb-4 justify-between">
              <Button variant={"ghost"} onClick={() => setIsOpen(false)}>
                <span className="text-lg mt-2 font-thin">✕</span>
              </Button>
              <span className="text-md mt-3 mr-6">Creating draft</span>
            </div>

            <DdocEditor
              walletAddress={user?.wallet?.address}
              disableBottomToolbar={false}
              isPreviewMode={false}
              showCommentButton={true}
            ></DdocEditor>
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
