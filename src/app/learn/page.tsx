"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import CourseCard from "@/components/courseCard";
import { Course } from "../../../interface";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";

export default function Learn() {
  const [courses, setCourses] = useState<Course[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);

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
            title: "Fetch Faild",
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
          title: "Fetch Faild",
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
          {loading ? (
            <div className="mt-5">
              <CircularProgress />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 w-full md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  id={course._id}
                  subject={course.subject}
                  title={course.title}
                  chapter={course.chapter}
                  description={course.description}
                  image={course.image}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
