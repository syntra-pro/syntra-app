'use client';

import Image from 'next/image';
import LandingLayout from './layouts/landingLayout';
import Link from 'next/link';

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
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      {/* Hero section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-7/12">
            <Image
              className="rounded-xl w-full h-auto"
              src="/hero1.png"
              width={700}
              height={700}
              alt="Hero image"
              priority
              layout="responsive"
            />
          </div>

          <div className="lg:w-5/12 flex flex-col justify-between">
            <div className="bg-rose-300 dark:bg-red-400 rounded-xl p-6 h-full lg:p-8 flex flex-col justify-between gap-y-6">
              <div>
                <span className="inline-block rounded-full bg-black px-3 py-1 text-xs text-white">
                  Grow Fast
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl tracking-tighter font-semibold">
                DAO Management for Everyone
              </h1>
              <p className="text-xl">
                All-in-one tool to optimize the way you create and collaborate.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
              <Link
                href="/home"
                className="rounded-full bg-rose-300 dark:bg-red-400 px-6 py-3 text-sm font-medium inline-flex items-center">
                Get Started
                <span className="bg-black ml-2 rounded-full px-2 py-1 text-white">
                  →
                </span>
              </Link>
              <p className="text-xs sm:text-sm text-right dark:text-stone-300 font-light">
                Amplify your impact and unlock
                <br />
                insights with data-driven solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <div className="w-full overflow-hidden py-4 border-y border-stone-300 dark:border-stone-500 my-10">
        <div className="whitespace-nowrap inline-block animate-[scroll_20s_linear_infinite]">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="inline-flex items-center">
              <span className="text-xl lg:text-2xl mx-4 dark:text-stone-400">
                Your All-in-One Solution
              </span>
              <Image
                src="/seedLogo.png"
                width={32}
                height={32}
                alt="Seed Logo"
                className="inline-block"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hero 2 section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <div className="lg:w-5/12 flex flex-col justify-between">
            <div className="flex flex-col gap-y-6">
              <div>
                <span className="inline-block rounded-full bg-white border border-black px-3 py-1 text-xs text-black">
                  Master DAO Ops
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl dark:text-stone-300 tracking-tighter font-semibold">
                Setting A New Standard
              </h2>
              <p className="text-xl dark:text-stone-300">
                Streamline your DAO operations with our platform. Whether you
                are drafting proposals, coordinating community initiatives,
                managing funding allocation, or overseeing treasury activities,
                our platform adapts to your unique processes, helping you
                achieve your goals every day. 
                <br />
                Built for DAO participants who
                prioritize efficient governance.
              </p>
            </div>
          </div>

          <div className="lg:w-7/12">
            <Image
              className="rounded-xl w-full h-auto"
              src="/hero2.svg"
              width={700}
              height={500}
              alt="Vision illustration"
              priority
              layout="responsive"
            />
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Integrated Workflow',
              image: '/hero3.png',
              description:
                'Work together with your team in real-time or asynchronously, no matter where they are.',
            },
            {
              title: 'Collaboration',
              image: '/hero4.png',
              description:
                'Explore and leverage best-in-class tools to create your unified DAO operations hub.',
            },
            {
              title: 'Ecosystem Integrations',
              image: '/hero5.png',
              description:
                'Our platform keeps everything you need at your fingertips. Create, organize, and track your projects with ease.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-rose-300 dark:bg-red-400 rounded-xl p-6 flex flex-col gap-4 justify-between h-full">
              <h3 className="text-xl font-medium">{feature.title}</h3>
              <Image
                className="rounded-xl w-full h-auto"
                src={feature.image}
                width={200}
                height={100}
                alt={feature.title}
                layout="responsive"
              />
              <p className="text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl lg:text-5xl xl:text-6xl dark:text-stone-300 tracking-tighter font-semibold mb-6">
          Improve Your Workflow
          <br />
          with Seamless Integration
        </h2>
        <p className="text-xl dark:text-stone-300 mb-8">
          Take Your DAO Operations 
          <br />
          to the Next Level.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/home"
            className="rounded-full bg-rose-300 dark:bg-red-400 px-6 py-3 text-sm font-medium inline-flex items-center">
            Get started
            <span className="bg-black ml-2 rounded-full px-2 py-1 text-white">
              →
            </span>
          </Link>
          <Link href="/home" className="text-sm dark:text-stone-300">
            ● Learn more
          </Link>
        </div>
      </section>
    </LandingLayout>
  );
}
