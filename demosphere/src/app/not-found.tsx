import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex w-full mt-4 items-center justify-center min-h-screen 
     dark:bg-black text-black dark:text-white
     "
    >
      <div className="text-center p-s4">
        <h1 className="text-4xl font-thin mb-4">Empty room here...</h1>
        <span className="text-xs mx-10">
          Teléfonos Que Suenan En Habitaciones Vacías
        </span>
        <div className="flex justify-center">
          <div className=" text-9xl">
            <Image
              style={{
                filter: "invert(1)",
                opacity: 0.65,
              }}
              src="/404.jpg"
              alt="Page or resource not found, or mistyped"
              width={600}
              height={250}
              priority
            />
          </div>
        </div>
        <p className="text-xl font-bold mb-6">Page or resource not found</p>

        <Link href="/">
          <span
            className="
              rounded-full
              bg-gray-700
              text-white
              dark:bg-gray-800
              dark:text-white py-2 px-6
              hover:bg-black dark:hover:bg-gray-700 
              transition"
          >
            Back to home
          </span>
        </Link>
      </div>
    </div>
  );
}
