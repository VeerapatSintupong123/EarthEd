"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import CourseCard from "@/components/courseCard";
import { Course, CourseStatus } from "../../../../interface";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import { getMe } from "@/libs/me";
import Link from "next/link";
import React from "react";
import { Geo } from "@/libs/orderUnit";

export default function SubLearn({ params }: { params: { sub: string } }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [courseStatus, setCourseStatus] = useState<CourseStatus>();
  const Sub = decodeURIComponent(params.sub);
  const unitOrder = Geo(Sub);

  useEffect(() => {
    const token = session?.user.token;
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/course`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          Swal.fire({
            title: "Fetch Failed",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = "/";
          });
          return;
        }

        const data = await response.json();
        setCourses(data.data);
      } catch (error) {
        Swal.fire({
          title: "Fetch Failed",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/";
        });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
      getMe(token).then((res) => setCourseStatus(res));
    }
  }, [session]);

  const groupedCourses = unitOrder.map((unit) => ({
    unit,
    courses: courses.filter((course) => course.unit === unit),
  }));

  return (
    <main className="flex flex-col items-center min-h-[100vh] p-3 bg-slate-200 overflow-hidden">
      <h1 className="text-3xl font-semibold mb-6 mt-5">Geography</h1>
      <small className="-mt-5 mb-6 text-lg">{Sub}</small>
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
          {loading ? (
            <div className="mt-5">
              <CircularProgress />
            </div>
          ) : courseStatus ? (
            groupedCourses.map(
              ({ unit, courses }) =>
                unit && (
                  <React.Fragment key={unit}>
                    <h1 className="text-lg font-semibold">{unit}</h1>
                    {courses.length > 0 ? (
                      <div className="grid grid-cols-1 gap-5 w-full md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                        {courses.map((course) => {
                          let subIndex = 0;
                          if (Sub.match("Human geography")) subIndex = 0;
                          if (Sub.match("Physical geography")) subIndex = 1;
                          if (Sub.match("Geography Techniques")) subIndex = 2;

                          const userSubChapter = courseStatus.chapter[subIndex];
                          const userSubCurrent = courseStatus.current[subIndex];

                          return (
                            <CourseCard
                              key={course._id}
                              id={course._id}
                              subject={course.subject}
                              title={course.title}
                              chapter={course.chapter}
                              description={course.description}
                              image={course.image}
                              sub={Sub}
                              current={
                                session?.user.role === "admin"
                                  ? ""
                                  : course.chapter.match(userSubChapter)
                                  ? userSubCurrent
                                  : parseInt(course.chapter) <
                                    parseInt(userSubChapter)
                                  ? "review"
                                  : ""
                              }
                            />
                          );
                        })}
                      </div>
                    ) : (
                      unit && (
                        <div className="text-center text-gray-500">
                          Coming soon
                        </div>
                      )
                    )}
                    <hr className="bg-gray-500 p-1 w-4/5 mt-5 rounded-xl" />
                  </React.Fragment>
                )
            )
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
