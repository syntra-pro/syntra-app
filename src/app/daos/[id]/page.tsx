"use client";

// the dao home
import "@fileverse-dev/ddoc/styles";

import { useEffect, useState } from "react";

import { Button } from "../../components/ui/Button";
import DaoLinks from "../../components/DaoLinks";
import { DdocEditor } from "@fileverse-dev/ddoc";
import Link from "next/link";
import PlatformLayout from "../../layouts/platformLayout";
import { useParams } from "next/navigation";

// import "@fileverse-dev/ddoc/dist/style.css";

// import { Breadcrumb } from "@/components/ui/Breadcrumb";
// import Chip from "@/components/ui/Chip";

// import StyledIcon from "@/components/StyledIcon";
// import { usePrivy } from "@privy-io/react-auth";

const DUMMY = [
  {
    organization: "arbitrum",
    type: "resource",
    name: "Governance docs",
    url: "https://docs.arbitrum.foundation/gentle-intro-dao-governance",
  },
  {
    organization: "arbitrum",
    type: "resource",
    name: "Constitution",
    url: "https://docs.arbitrum.foundation/dao-constitution",
  },
  {
    organization: "arbitrum",
    type: "resource",
    name: "Delegates",
    url: "https://arbitrum.karmahq.xyz/",
  },
  {
    organization: "arbitrum",
    type: "resource",
    name: "Forum",
    url: "https://forum.arbitrum.foundation/",
  },
  {
    organization: "arbitrum",
    type: "resource",
    name: "Tally | Arbitrum",
    url: "https://www.tally.xyz/gov/arbitrum",
  },
  {
    organization: "arbitrum",
    type: "resource",
    name: "Snapshot",
    url: "https://snapshot.org/#/arbitrumfoundation.eth",
  },

  {
    organization: "arbitrum",
    type: "template",
    name: "AIP Template",
    url: "https://docs.fileverse.io/0x2d9703443fe89eC852c9c4C44C6BB857f19DfBc6/0#key=JJ6n1ena4SYaRv6ps0j63NjBBBRjnu_MAd01qMbiUSSlH6CWCjy3tZr8cQpmPCZi",
  },
  {
    organization: "arbitrum",
    type: "template",
    name: "Delegate statement template",
    url: "https://docs.fileverse.io/0x2d9703443fe89eC852c9c4C44C6BB857f19DfBc6/2#key=jy7ZFvdaLkdYSqZBYymxaEjcKDmvnpcoZMAkBkcCEFkQF5NDyIpz9ZencoTuWUnO",
  },
];

export default function TokenPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const par = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);

  // unset
  const [tokenB, setTokenB] = useState("No token");

  useEffect(() => {
    if (!id) {
      return;
    }
  }, [id]);

  const handleNewDraft = () => {
    setIsOpen(!isOpen);
  };

  return (
    <PlatformLayout>
      <main className="flex flex-row  w-full  relative">
        {/* dashboard  */}
        <div className="flex flex-col pt-20 px-8">
          <div className="dark:text-stone-100 flex  items-center gap-2">
            <Link className="text-2xl" href={"/dao-manager"}>
              ←
            </Link>

            {par.id.toString().charAt(0).toUpperCase() + par.id.slice(1)}
          </div>
          <div
            id="sector1"
            className="flex my-6 flex-col sm:flex-row w-full gap-4"
          >
            {/* <div className="">
              <div
                className="flex flex-col  rounded-t-lg border border-transparent px-5 py-4 transition-colors
                bg-stone-50 dark:bg-stone-700
                 text-stone-600 dark:text-stone-300"
              >
                <h2 className="mb-3 text-xl font-semibold">DAO Resources</h2>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Access important DAO resources and documents.
                </p>

                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="justify-end self-end "
                >
                  {isResourcesOpen ? "↑" : "↓"}
                </button>
              </div>
              {isResourcesOpen ? (
                <div className="dark:bg-stone-600 bg-stone-100 rounded-b-lg p-4 text-xs">
                  <DaoLinks filterBy={"resource"} arrayLinks={DUMMY} />
                </div>
              ) : (
                ""
              )}
            </div> */}

            <div className="">
              <div
                className="flex flex-col rounded-t-lg border border-transparent px-5 py-4 transition-colors
                bg-stone-50 dark:bg-stone-700
                text-stone-600 dark:text-stone-300"
              >
                <h2 className="mb-3 text-xl font-semibold">DAO Resources</h2>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Access important DAO resources and documents.
                </p>
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="justify-end self-end"
                >
                  {isResourcesOpen ? "↑" : "↓"}
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isResourcesOpen ? "max-h-96" : "max-h-0"}
                  `}
              >
                <div className="dark:bg-stone-600 bg-stone-100 rounded-b-lg p-4 text-xs">
                  <DaoLinks filterBy={"resource"} arrayLinks={DUMMY} />
                </div>
              </div>
            </div>

            {/* <div className="">
              <div
                className="flex flex-col  rounded-t-lg border border-transparent px-5 py-4 transition-colors
                bg-stone-50 dark:bg-stone-700
                 text-stone-600 dark:text-stone-300"
              >
                <h2 className="mb-3 text-xl font-semibold">Templates</h2>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Use pre-built templates for common DAO tasks.
                </p>

                <button
                  onClick={() => setIsTemplatesOpen(!isTemplatesOpen)}
                  className="justify-end self-end "
                >
                  {isTemplatesOpen ? "↑" : "↓"}
                </button>
              </div>
              {isTemplatesOpen ? (
                <div className="dark:bg-stone-600 rounded-b-lg p-4 text-xs">
                  <DaoLinks filterBy={"template"} arrayLinks={DUMMY} />
                </div>
              ) : (
                ""
              )}
            </div> */}
            <div className="">
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
                <div className="dark:bg-stone-600 bg-stone-100 rounded-b-lg p-4 text-xs">
                  <DaoLinks filterBy={"template"} arrayLinks={DUMMY} />
                </div>
              </div>
            </div>

            <a
              href="#"
              className="group rounded-t-lg border border-transparent px-5 py-4 
            transition-colors
          text-stone-600 dark:text-stone-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="mb-3 text-xl font-semibold">Calendar</h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                View upcoming DAO events and meetings.
              </p>
            </a>
          </div>

          <div
            id="sector2"
            className="flex  flex-col sm:flex-row w-full gap-8 "
          >
            <div
              className="bg-transparent w-full border p-4 rounded-md
          text-stone-600 dark:text-stone-300
          border-stone-300 dark:border-stone-700"
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
              <div className="flex flex-col mt-2 gap-1 ">
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
              text-stone-600 dark:text-stone-300
              border-stone-300 dark:border-stone-700"
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
              <span className="text-md mt-3 mr-6">New draft</span>
            </div>

            <DdocEditor
              disableBottomToolbar={false}
              isPreviewMode={false}
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
      </main>
    </PlatformLayout>
  );
}
