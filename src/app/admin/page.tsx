"use client";

import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Course } from "../../../interface";
import { CircularProgress } from "@mui/material";
import { ValidAdd } from "@/libs/validInput";
import AddAlert from "@/components/addAlert";
import ExamFile from "@/components/uploadFile";

export default function Admin() {
  const [loading, setLoading] = useState<boolean>(true);
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [chapter, setChapter] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [menu, setMenu] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [last, setLast] = useState("0");

  const { data: session, status } = useSession();
  const role = session?.user.role;

  useEffect(() => {
    if (status === "loading") return;

    if (role !== "admin") {
      Swal.fire({
        title: "You are not Admin",
        text: "Go back",
        icon: "error",
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "/";
      });
      return;
    }

    const token = session?.user.token;

    const getCourses = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/course`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Fetch failed");
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

    getCourses();
  }, [session, status]);

  const add = async () => {
    const token = session?.user.token;
    if (ValidAdd(subject, title, chapter, description, last, image, video)) {
      try {
        const response = await fetch("/api/course/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject,
            title,
            chapter,
            description,
            image,
            video,
            token,
          }),
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            timer: 2000,
            text: "Add successful",
            title: "Add new chapter",
            showConfirmButton: false,
          }).then(() => {
            window.location.href = "/admin";
          });
        } else {
          throw new Error("Add failed");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          timer: 2000,
          text: "Something went wrong",
          title: "fail to add",
          showConfirmButton: false,
        });
      }
    }
  };

  const selectMenuClass = (menuNumber: number) =>
    menu === menuNumber ? "bg-slate-300" : "";
  const tranClass = (menuNumber: number) =>
    menu === menuNumber ? "" : "hidden";

  if (status === "loading" || loading) {
    return (
      <main className="flex flex-col items-center min-h-[100vh] p-3 overflow-hidden bg-slate-200">
        <CircularProgress />
      </main>
    );
  }

  if (role !== "admin") return null;

  return (
    <main className="flex flex-col items-center min-h-[100vh] p-3 overflow-hidden bg-slate-200">
      <h1 className="text-3xl font-semibold mb-6 mt-5">Admin</h1>
      <small className="-mt-5 mb-6 text-lg">Hello! you're Admin</small>
      <div
        className="z-10 px-7 py-5 shadow border border-gray-300 space-y-10 bg-white rounded-xl 
      flex flex-col w-full md:w-4/5 lg:w-4/5 xl:w-3/6"
        style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        <div className="flex flex-col items-center -mb-5">
          <h1 className="text-3xl font-bold">EarthEd</h1>
          <small className="text-red-500 font-bold">
            Exploring the world, One lesson at a time
          </small>
          <hr className="w-4/5 h-1 bg-black mt-2 rounded-xl" />
        </div>

        <div className="flex flex-col">
          <div className="w-1/2 mx-auto flex p-2 mb-5">
            <div
              className={`w-1/2 ${selectMenuClass(
                1
              )} text-l flex justify-center rounded-t-lg border-main-100 
            hover:bg-slate-300 hover:cursor-pointer font-semibold`}
              onClick={() => {
                setMenu(1);
              }}
            >
              Main
            </div>
            <div
              className={`w-1/2 ${selectMenuClass(
                2
              )} text-l flex justify-center rounded-t-lg border-main-100 
            hover:bg-slate-300 hover:cursor-pointer font-semibold`}
              onClick={() => {
                setMenu(2);
              }}
            >
              Alert
            </div>
            <div
              className={`w-1/2 ${selectMenuClass(
                3
              )} text-l flex justify-center rounded-t-lg border-main-100 
            hover:bg-slate-300 hover:cursor-pointer font-semibold`}
              onClick={() => {
                setMenu(3);
              }}
            >
              Exam
            </div>
          </div>

          <div className={`${tranClass(1)}`}>
            <div className="flex flex-col space-y-3 mt-2">
              <div className="w-full flex flex-row justify-center items-center gap-x-3">
                <label htmlFor="subject" className="font-bold text-xl">
                  Subject
                </label>
                <select
                  id="subject"
                  className="text-xl text-black font-semibold placeholder:text-xl border-2 
                focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                  onChange={(event) => {
                    const selectedSubject = event.target.value;
                    let maxChapter = 0;
                    courses.forEach((course) => {
                      if (
                        course.subject === selectedSubject &&
                        parseInt(course.chapter) > maxChapter
                      ) {
                        maxChapter = parseInt(course.chapter);
                      }
                    });
                    setLast(maxChapter.toString());
                    setSubject(selectedSubject);
                  }}
                >
                  <option value="" disabled selected>
                    Select Subject
                  </option>
                  <option value="Geography">Geography</option>
                </select>
                <label htmlFor="lastChapter" className="font-bold text-xl">
                  Last Chapter:
                </label>
                <h1 className="font-semibold text-xl">{last}</h1>
              </div>
              <div className="w-full flex flex-row justify-center items-center gap-x-3">
                <label htmlFor="title" className="font-bold text-xl">
                  Title
                </label>
                <input
                  id="title"
                  placeholder="Title of Subject"
                  className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                  type="text"
                  autoComplete="off"
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </div>
              <div className="w-full flex flex-row justify-center items-center gap-x-3">
                <label htmlFor="chapter" className="font-bold text-xl">
                  Chapter
                </label>
                <input
                  id="chapter"
                  placeholder="Chapter of Subject"
                  className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                  type="number"
                  autoComplete="off"
                  onChange={(event) => {
                    setChapter(event.target.value);
                  }}
                />
              </div>
              <div className="w-full flex flex-row justify-center items-center gap-x-3">
                <label htmlFor="description" className="font-bold text-xl">
                  Description
                </label>
                <input
                  id="description"
                  placeholder="Some Words"
                  className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                  type="text"
                  autoComplete="off"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </div>
              <div className="w-full flex flex-row justify-center items-center gap-x-3">
                <label htmlFor="imageUrl" className="font-bold text-xl">
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  placeholder="Google Drive Url"
                  className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                  type="text"
                  autoComplete="off"
                  onChange={(event) => {
                    setImage(event.target.value);
                  }}
                />
              </div>
              <div className="w-full flex flex-row justify-center items-center gap-x-3">
                <label htmlFor="videoUrl" className="font-bold text-xl">
                  Video URL
                </label>
                <input
                  id="videoUrl"
                  placeholder="Youtube Url"
                  className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                  type="text"
                  autoComplete="off"
                  onChange={(event) => {
                    setVideo(event.target.value);
                  }}
                />
              </div>

              <button
                className="bg-indigo-500 text-white py-3 rounded-md w-full font-semibold 
                active:scale-75 transition-all hover:bg-indigo-600"
                onClick={add}
              >
                Add
              </button>
            </div>
          </div>

          <div className={`${tranClass(2)}`}>
            <AddAlert courses={courses} token={session?.user.token as string} />
          </div>
          <div className={`${tranClass(3)}`}>
            <ExamFile chapter="example" />
          </div>
        </div>
      </div>
    </main>
  );
}
