// "use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="md:text-5xl text-3xl lg:text-7xl font-bold text-center text-white relative z-20">
          Calcutta Football League
        </h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <Link href="/admin">
            <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
              Sign In to Admin
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-4 w-[50rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
