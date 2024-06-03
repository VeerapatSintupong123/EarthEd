"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { CourseStatus } from "../../../interface";
import { getMe } from "@/libs/me";
import Link from "next/link";
import SubCard from "@/components/subCard";

export default function Learn() {
  const { data: session } = useSession();
  const [courseStatus, setCourseStatus] = useState<CourseStatus>();

  useEffect(() => {
    const token = session?.user.token;
    if (token) {
      getMe(token).then((res) => setCourseStatus(res));
    }
  }, [session]);

  return (
    <main className="flex flex-col items-center min-h-[100vh] p-3 bg-slate-200 overflow-hidden">
      <h1 className="text-3xl font-semibold mb-6 mt-5">Geography</h1>
      <small className="-mt-5 mb-6 text-lg">Study of Earth and relation</small>
      <div
        className="z-10 px-7 py-5 shadow border border-gray-300 space-y-10 bg-white rounded-xl flex flex-col w-11/12 sm:w-5/6 md:w-5/6 lg:w-4/5 xl:w-3/4"
        style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        <div className="flex flex-col items-center -mb-4">
          <h1 className="text-3xl font-bold">EarthEd</h1>
          <small className="text-red-500 font-bold">
            Exploring the world, One lesson at a time
          </small>
          <hr className="w-4/5 h-1 bg-black mt-2 rounded-xl" />
        </div>

        <div className="flex flex-col items-center gap-y-3">
          {courseStatus ? (
            <div className="grid grid-cols-1 gap-5 w-full md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              <SubCard
                sub="Human geography"
                url="https://drive.google.com/file/d/1xteo9yqe829TtChXSv1f3MskQcw4C9R2/view?usp=sharing"
              />
              <SubCard
                sub="Physical geography"
                url="https://drive.google.com/file/d/1xteo9yqe829TtChXSv1f3MskQcw4C9R2/view?usp=sharing"
              />
              <SubCard
                sub="Geography Techniques"
                url="https://drive.google.com/file/d/1xteo9yqe829TtChXSv1f3MskQcw4C9R2/view?usp=sharing"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <h1 className="font-semibold text-xl">Ready to begin?</h1>
              <h1>
                Visit the{" "}
                <Link href="/course" className="font-bold">
                  Course
                </Link>{" "}
                section to explore our offerings!
              </h1>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
