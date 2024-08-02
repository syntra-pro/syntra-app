"use client";

import { Button } from "./components/ui/Button";
import { HeightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import LandingLayout from "./layouts/landingLayout";

export default function Home() {
  return (
    <LandingLayout>
      <div className="py-32 text-white w-full bg-stone-600">
        <div className="flex gap-8 justify-center items-center">
          <div className="w-1/2 flex flex-col gap-y-8 ">
            <p className="text-7xl font-semibold">
              Manage your DAO with <br />
              ease and efficiency
            </p>
            <p className="text-xl pr-40 font-mono">
              Streamline your decentralized autonomous organization with our
              intuitive and feature-rich DAO Manager. <br />
              Simplify project management, collaborate seamlessly, and gain
              valuable insights.
            </p>
            <div className="flex gap-4">
              <Button className="bg-stone-700">Get started</Button>
              <Button>Learn more</Button>
            </div>
          </div>
          <Image
            // className="self-center"
            src="./index.svg"
            alt=""
            width={500}
            height={500}
          />
        </div>
      </div>

      <div className="py-12 w-full text-black bg-stone-50">
        <div id="titles" className="text-center mb-10 w-1/3 mx-auto">
          <p className="text-4xl font-semibold mb-4">
            Streamline your workflow with our powerful features
          </p>

          <p className="font-mono text-sm">
            Our Notion-like DAO Manager provides a comprehensive set of tools to
            help you manage your projects, collaborate with your team, and stay
            organized. With a sidebar with alerts, projects manager, drafts, and
            analytics collaboration, you can easily stay on top of your work and
            achieve your goals efficiently.
          </p>
        </div>
        <div className="grid grid-cols-3 px-32 gap-4">
          <div className="p-4 text-center">
            <div className="bg-stone-300 h-60 w-auto rounded-lg">item</div>

            <p className="text-2xl font-semibold my-2">
              Stay informed with Real-Time alerts
            </p>
            <p className="font-mono text-xs">
              Receive instant alerts ad notifications about important updates
              and changes in your projects and tasks.
            </p>
          </div>

          <div className="p-4 text-center">
            <div className="bg-stone-300 h-60 w-auto rounded-lg">item</div>

            <p className="text-2xl font-semibold my-2">
              Effortlessly manage your projects
            </p>
            <p className="font-mono text-xs">
              Our Projects Manager allows you to create, organize, and track
              your projects with ease.
            </p>
          </div>

          <div className="p-4 text-center">
            <div className="bg-stone-300 h-60 w-auto rounded-lg">item</div>

            <p className="text-2xl font-semibold my-2">
              Capture ideas and collaborate in real-time
            </p>
            <p className="font-mono text-xs">
              With our Drafts and Analytics collaboration features, you can
              capture ideas, collaborate with your team, and make data-driven
              decisions.
            </p>
          </div>
        </div>

        <div className="flex justify-center py-10 gap-4">
          <Button className="bg-transparent text-black border border-black">
            Learn more
          </Button>
          <Button className="bg-transparent text-black">Sign up {">"}</Button>
        </div>
      </div>

      <div className="py-32 w-full">
        <div className="flex gap-8 justify-center items-center">
          <div className="w-1/2 flex flex-col gap-y-8 ">
            <p className="text-4xl font-semibold">
              Efficient project management and collaboration with our DAO
              Manager
            </p>
            <p className="text-sm pr-40 font-mono">
              Our DAO Manager provides a Notion-like experience, empowering
              teams to efficiently manage projects and collaborate seamlessly.
            </p>
            <div className="grid grid-cols-2">
              <div>
                <p className="font-semibold text-xl mb-2">
                  Streamlined Workflow
                </p>
                <p className="font-mono text-sm">
                  Stay organized with a sidebar featuring alerts, projects
                  manager, drafts, and analytics.
                </p>
              </div>

              <div>
                <p className="font-semibold text-xl mb-2">
                  Enhanced Collaboration
                </p>
                <p className="font-mono text-sm">
                  Collaborate effectively with real-time editing, commenting,
                  and task assignment capabilities.
                </p>
              </div>
            </div>
          </div>

          <div className="h-80 w-96 bg-stone-500 rounded-lg">DAO Manager</div>
        </div>
      </div>
    </LandingLayout>
  );
}
