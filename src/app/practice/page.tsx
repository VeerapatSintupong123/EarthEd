"use client";

import QuestBox from "@/components/questBox";
import { useSession } from "next-auth/react";
import { getMe } from "@/libs/me";
import { useEffect, useState } from "react";
import { CourseStatus } from "../../../interface";
import Link from "next/link";

export default function Practice() {
  const { data: session } = useSession();
  const [cs, setCS] = useState<CourseStatus>();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const token = session?.user.token;
    if (token) {
      setEmail(session.user.email);
      getMe(token).then((res) => {
        setCS(res);
      });
    }
  }, [session]);

  return (
    <main className="flex flex-col items-center p-3 overflow-hidden">
      <h1 className="text-3xl font-semibold mb-6 mt-5">Practice</h1>
      <small className="-mt-5 mb-6 text-lg">Practice make perfect</small>
      <div
        className="z-10 px-7 py-5 shadow border border-gray-300 space-y-10 bg-white rounded-xl 
        flex flex-col w-full md:w-4/5 lg:w-4/5 xl:w-3/6"
        style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        <div className="flex flex-col items-center -mb-4">
          <h1 className="text-3xl font-bold">EarthEd</h1>
          <small className="text-red-500 font-bold">
            Exploring the world, One lesson at a time
          </small>
          <hr className="w-4/5 h-1 bg-black mt-2 rounded-xl" />
          {cs ? (
            <div className="w-full flex flex-col items-center my-5">
              <QuestBox type="main" name={email} />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 my-3">
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
