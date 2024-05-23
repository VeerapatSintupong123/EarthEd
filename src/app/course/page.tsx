"use client";

import React from "react";
import dynamic from "next/dynamic";

const DynamicVideo = dynamic(() => import("@/components/video"), {
  ssr: false,
});

export default function Course() {
  return (
    <main className="flex flex-col items-center min-h-screen p-3 bg-slate-200 overflow-hidden">
      <h1 className="text-3xl font-semibold mb-6 mt-5">Geography</h1>
      <small className="-mt-5 mb-6 text-lg">Study of Earth and relation</small>
      <div
        className="z-10 px-7 py-5 shadow border border-gray-300 space-y-10 bg-white rounded-xl flex flex-col w-11/12 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-2/3"
        style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        <div className="flex flex-col items-center -mb-4">
          <h1 className="text-3xl font-bold">EarthEd</h1>
          <small className="text-red-500 font-bold">
            Exploring the world, One lesson at a time
          </small>
          <hr className="w-4/5 h-1 bg-black mt-2 rounded-xl" />
        </div>
        <DynamicVideo url="https://www.youtube.com/watch?v=LXb3EKWsInQ" />
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold">Course Overview</h2>
          <p>
            The "Geography" course offers an in-depth exploration of Earth's
            physical features, environments, and the dynamic relationships
            between human societies and their surroundings. Through engaging
            video lessons and interactive content, you will gain a comprehensive
            understanding of geographical concepts, processes, and their
            real-world applications.
          </p>
          <h3 className="text-xl font-semibold">What You Will Learn</h3>
          <ul className="list-disc list-inside">
            <li>
              <strong>Physical Geography:</strong> Study of landforms, climates,
              and ecosystems.
            </li>
            <li>
              <strong>Human Geography:</strong> Examination of human
              populations, cultures, and economic activities.
            </li>
            <li>
              <strong>Cartography and Map Skills:</strong> Understanding maps,
              GIS technology, and spatial analysis.
            </li>
            <li>
              <strong>Environmental Geography:</strong> Insights into natural
              resources, conservation, and sustainable practices.
            </li>
            <li>
              <strong>Geographical Research Methods:</strong> Techniques for
              collecting, analyzing, and interpreting geographical data.
            </li>
          </ul>
          <button className="mt-6 px-9 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition duration-300 active:scale-75">
            Enroll Now
          </button>
        </div>
      </div>
    </main>
  );
}