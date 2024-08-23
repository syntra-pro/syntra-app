"use client";

import { Button } from "./components/ui/Button";
import { CubeIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import LandingLayout from "./layouts/landingLayout";
import Link from "next/link";

export default function Home() {
  return (
    <LandingLayout>
      <style jsx global>{`
        @keyframes colorChange {
          0%,
          100% {
            color: #e7e5e4;
          }
          25%,
          75% {
            color: #a8a29e;
          }
          50% {
            color: #1c1917;
          }
        }
      `}</style>

      {/* hero section  */}
      <div className="w-full  ">
        <div className="w-10/12 flex gap-4 mx-auto   py-6 ">
          <div className="w-7/12">
            <Image
              className="rounded-xl"
              src="/hero1.png"
              width={700}
              height={700}
              alt=""
              priority={true}
              loading={"eager"}
              objectFit={"cover"}
            />
          </div>

          <div className="w-5/12 flex flex-col justify-between">
            <div className="w-full bg-rose-300 flex flex-col justify-between gap-y-8 rounded-xl p-10">
              <div>
                <span className="rounded-full bg-black px-3 py-1 text-xs text-white">
                  Grow Fast
                </span>
              </div>
              <div className="text-7xl tracking-tighter">
                DAO
                <br />
                Management
                <br />
                for Everyone
              </div>
              <div className=" text-sm font-normal ">
                All-in-one tool to optimize the way you
                <br />
                create and collaborate.
              </div>
            </div>
            {/* <div className="rounded-full bg-rose-300 px-3 py-1 text-xs text-white">
              Grow Fast
            </div> */}
            <div className="flex justify-between ">
              <div className="rounded-full bg-rose-300 pl-4 pr-2 py-2 text-xs">
                <Link href={"/home"}>
                  Features
                  <span className="bg-black ml-2 rounded-full px-2 py-1 text-white ">
                    →
                  </span>
                </Link>
              </div>
              <div className="text-xs text-right font-light">
                Amplify your impact and unlock
                <br />
                insights with data-driven solutions.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* carousel  */}
      <div className="w-full overflow-hidden py-2 border-stone-300 border-y my-10">
        <div className="marquee whitespace-nowrap inline-block animate-scroll">
          <div className="flex align-middle gap-3">
            <span className="text-2xl mx-4">Your All-in-One Solution</span>
            <Image
              src="/seedLogo.png"
              width={32}
              height={32}
              alt=""
              priority={true}
              loading={"eager"}
              objectFit={"cover"}
            />
            <span className="text-2xl mx-4">Your All-in-One Solution</span>
            <Image
              src="/seedLogo.png"
              width={32}
              height={32}
              alt=""
              priority={true}
              loading={"eager"}
              objectFit={"cover"}
            />
            <span className="text-2xl mx-4">Your All-in-One Solution</span>
            <Image
              src="/seedLogo.png"
              width={32}
              height={32}
              alt=""
              priority={true}
              loading={"eager"}
              objectFit={"cover"}
            />
            <span className="text-2xl mx-4">Your All-in-One Solution</span>
          </div>
        </div>
      </div>

      {/* hero 2 section  */}
      <div className="w-full  ">
        <div className="w-10/12 flex gap-4 mx-auto   py-6 ">
          <div className="w-5/12 flex flex-col justify-between">
            <div className="w-full flex flex-col justify-between gap-y-8 p-10">
              <div>
                <span className="rounded-full bg-white border border-black px-3 py-1 text-xs text-black">
                  The Vision
                </span>
              </div>
              <div id="setting" className="text-7xl tracking-tighter">
                Setting
                <br />
                A New
                <br />
                Standard
              </div>
              <div className=" text-sm font-normal ">
                Streamline your DAO operations with our platform. Whether you
                are drafting proposals, coordinating community initiatives,
                managing funding allocation, overseeing treasury activities, our
                platform adapts to your unique processes, helping you achieve
                your goals every day. Built for DAO participants who prioritize
                efficient governance.
              </div>
            </div>
          </div>

          <div className="w-7/12">
            <Image
              className="rounded-xl"
              src="/hero2.png"
              width={700}
              height={500}
              alt=""
              priority={true}
              loading={"eager"}
              // objectFit={"cover"}
            />
          </div>
        </div>
      </div>

      {/* features section  */}
      <div className="w-full flex mx-auto justify-center py-6 text-center gap-2 ">
        <div className="bg-rose-300 rounded-xl items-center w-2/12 px-3 py-6 flex flex-col gap-6 justify-between">
          <p className="text-xl font-light">Integrated Workflow</p>
          <Image
            className="rounded-xl"
            src="/hero3.png"
            width={200}
            height={100}
            alt=""
            priority={true}
            loading={"eager"}
            objectFit={"cover"}
          />
          <p className="text-xs tracking-tight font-light">
            Work together with your team in real-time or asyncronously, no
            matter where they are.
          </p>
        </div>

        <div className="bg-rose-300 rounded-xl items-center w-2/12 px-3 py-6 flex flex-col  gap-6 justify-between">
          <p className="text-xl font-light">Collaboration</p>
          <Image
            className="rounded-xl"
            src="/hero4.png"
            width={200}
            height={100}
            alt=""
            priority={true}
            loading={"eager"}
            // objectFit={"cover"}
          />
          <p className="text-xs tracking-tight font-light">
            Explore and leverage best-in-class tools to create your unified DAO
            operations hub.
          </p>
        </div>

        <div className="bg-rose-300 rounded-xl items-center w-2/12 px-3 py-6 flex flex-col  gap-6 justify-between">
          <p className="text-xl font-light">Ecosystem Integrations</p>
          <Image
            className="rounded-xl"
            src="/hero5.png"
            width={200}
            height={100}
            alt=""
            priority={true}
            loading={"eager"}
            // objectFit={"cover"}
          />
          <p className="text-xs tracking-tight font-light">
            Our platform keeps everything you need at your fingertips. Create,
            organize, and track your projects with ease.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col mx-auto justify-center py-6 text-center gap-6 ">
        <div className="text-7xl tracking-tighter">
          Streamline Your Workflow with
          <br />
          Seamless Integration
        </div>
        Integrate our solution seamlessly
        <br />
        into your workflow for enhanced
        <br />
        efficiency and productivity.
      </div>

      <div className="flex justify-center gap-6 pb-10  border-b border-stone-400">
        <Link href={"/home"}>
          <div className="rounded-full bg-rose-300 pl-4 pr-2 py-2 text-sm">
            Get started
            <span className="bg-black ml-2 rounded-full px-2 py-1 text-white ">
              →
            </span>
          </div>
        </Link>

        <Link href={"/home"}>
          <div className="  pl-4 pr-2 py-2 text-sm">● Learn more</div>
        </Link>
      </div>
    </LandingLayout>
  );
}
