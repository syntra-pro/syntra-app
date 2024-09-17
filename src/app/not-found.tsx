import Image from 'next/image';
import Link from 'next/link';
import PlainLayout from './layouts/PlainLayout';

export default function NotFound() {
  return (
    <PlainLayout>
      <div
        className="flex w-full  items-center justify-center min-h-screen 
          dark:bg-black text-black dark:text-white
          ">
        <div className="text-center">
          <h1 className="text-4xl font-thin mb-4">Empty room here...</h1>

          <div className="flex justify-center">
            <div className=" text-9xl">
              <Image
                className="dark:invert  invert-0"
                src="/404.jpg"
                alt="Page or resource not found, or mistyped"
                width={600}
                height={250}
                priority
              />
            </div>
          </div>
          <p className="text-xl   mb-6">Page or resource not found</p>

          <Link href="/">
            <span
              className="
              rounded-full
              bg-gray-700
              text-white
              dark:bg-gray-800
              dark:text-white py-2 px-6
              hover:bg-black dark:hover:bg-gray-700 
              transition">
              Back
            </span>
          </Link>
        </div>
      </div>
    </PlainLayout>
  );
}
