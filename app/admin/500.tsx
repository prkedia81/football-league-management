import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Custom404() {
  return (
    <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 flex justify-center">
          <Link href="/" className="inline-flex">
            <span className="sr-only">Calcutta Football League</span>
            <Image
              width={100}
              height={100}
              className="h-32 w-32"
              src="/logo.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
              500 error
            </p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Oops!.
            </h1>
            <p className="mt-2 text-base text-gray-500">
              {"There was some error. Please try again."}
            </p>
            <div className="mt-6">
              <a
                href="/admin"
                className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                Go back home<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      {/* <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-4">
          <a
            href="/contact-us"
            className="text-sm font-medium text-gray-500 hover:text-gray-600">
            Contact Support
          </a>
        </nav>
      </footer> */}
    </div>
  );
}
