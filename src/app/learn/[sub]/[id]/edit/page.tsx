"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { Alert, CSVRecord, Course } from "../../../../../../interface";
import { CircularProgress } from "@mui/material";
import EditAlert from "@/components/editAlert";
import ExamFile from "@/components/uploadFile";
import { getExamfile } from "@/libs/getfile";
import Link from "next/link";
import Image from "next/image";
import { DriveURL } from "@/libs/driveURL";

export default function LearnEdit() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [course, setCourse] = useState<Course | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");

  const [menu, setMenu] = useState(1);
  const [alerts, setAlerts] = useState<Array<Alert>>([]);

  const [examFile, setExamFile] = useState("");
  const [exam, setExam] = useState<Array<CSVRecord>>([]);

  const { data: session } = useSession();
  const role = session?.user?.role;

  useEffect(() => {
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

    const token = session?.user?.token;
    const link = window.location.href;
    const paths = link.split("/");
    const fetchedId = paths[paths.length - 2];
    setId(fetchedId);

    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/course/${fetchedId}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const res = await response.json();
          const data: Course = res.data;
          setCourse(data);
          setTitle(data.title);
          setDescription(data.description);
          setImage(data.image);
          setVideo(data.video);
          setAlerts(data.alert);
        } else {
          throw new Error("Failed to fetch course");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          timer: 2000,
          text: "Something went wrong",
          title: "Failed to fetch",
        }).then(() => {
          window.location.href = "/";
        });
      }
    };

    if (token && fetchedId) {
      fetchCourse();
    }
  }, [session, role]);

  useEffect(() => {
    const checkFile = async () => {
      try {
        const response = await fetch(
          `/api/file/check?file=${course?.subject}_${course?.subsubject}_${course?.unit}_${course?.chapter}.csv`
        );
        const result = await response.json();
        if (response.ok && result.status === "success") {
          setExamFile(
            `${course?.subject}_${course?.subsubject}_${course?.unit}_${course?.chapter}.csv`
          );
        } else {
          setExamFile(`No exam`);
        }
      } catch (error) {
        Swal.fire({
          title: "Something went wrong",
          text: "Fail to fetch exam",
          timer: 2000,
          showConfirmButton: false,
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    checkFile();

    if (course) {
      const cs = course.subject as string;
      const ss = course.subsubject as string;
      const un = course.unit as string;
      const cc = course.chapter as string;
      const fileName = `${cs}_${ss}_${un}_${cc}.csv`;
      getExamfile(fileName).then((res: Array<CSVRecord>) => setExam(res));
    }
  }, [course]);

  const update = async () => {
    if (!title || !description || !image || !video) {
      Swal.fire({
        title: "Invalid Input",
        text: "Please provide information",
        icon: "error",
        timer: 2000,
      });
      return;
    }

    const token = session?.user?.token;
    try {
      const response = await fetch("/api/course/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image,
          video,
          id,
          token,
        }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Update Successful",
          text: "Updated course",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        throw new Error("Failed to update course");
      }
    } catch (error) {
      Swal.fire({
        title: "Fail to Update",
        text: "Something went wrong",
        timer: 2000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  const getMenuClass = (menuNumber: number) => {
    return menu === menuNumber ? "bg-slate-300" : "";
  };

  const getTranClass = (menuNumber: number) => {
    return menu === menuNumber ? "" : "hidden";
  };

  return (
    <main className="flex flex-col items-center min-h-[100vh] p-3 overflow-hidden bg-slate-200">
      {loading ? (
        <div className="m-5">
          <CircularProgress />
        </div>
      ) : (
        <h1 className="text-3xl font-semibold mb-6 mt-5">{course?.subject}</h1>
      )}
      <small className="-mt-5 mb-6 text-lg">Update chapter</small>
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

        {loading ? (
          <div className="mt-5 flex flex-col items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="w-1/2 mx-auto flex p-2 mb-5">
              <div
                className={`w-1/2 ${getMenuClass(
                  1
                )} text-l flex justify-center rounded-t-lg border-main-100 
                hover:bg-slate-300 hover:cursor-pointer font-semibold`}
                onClick={() => setMenu(1)}
              >
                Main
              </div>
              <div
                className={`w-1/2 ${getMenuClass(
                  2
                )} text-l flex justify-center rounded-t-lg border-main-100 
                hover:bg-slate-300 hover:cursor-pointer font-semibold`}
                onClick={() => setMenu(2)}
              >
                Alert
              </div>
              <div
                className={`w-1/2 ${getMenuClass(
                  3
                )} text-l flex justify-center rounded-t-lg border-main-100 
                hover:bg-slate-300 hover:cursor-pointer font-semibold`}
                onClick={() => setMenu(3)}
              >
                Exam
              </div>
            </div>

            <div className={`${getTranClass(1)}`}>
              <div className="flex flex-col space-y-3 mt-2">
                <div className="w-full flex flex-row justify-center items-center gap-x-3">
                  <label htmlFor="text" className="font-bold text-xl">
                    Sub:
                  </label>
                  <h1 className="text-xl">{course?.subsubject}</h1>
                </div>
                <div className="w-full flex flex-row justify-center items-center gap-x-3">
                  <label htmlFor="text" className="font-bold text-xl">
                    Unit:
                  </label>
                  <h1 className="text-xl">{course?.unit}</h1>
                  <label htmlFor="text" className="font-bold text-xl">
                    Chapter:
                  </label>
                  <h1 className="text-xl">{course?.chapter}</h1>
                </div>
                <div className="w-full flex flex-row justify-center items-center gap-x-3">
                  <label htmlFor="text" className="font-bold text-xl">
                    Title
                  </label>
                  <input
                    placeholder="Title of Subject"
                    className="text-xl text-black font-semibold placeholder:text-xl border-2 
                    focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-row justify-center items-center gap-x-3">
                  <label htmlFor="text" className="font-bold text-xl">
                    Description
                  </label>
                  <input
                    placeholder="Some Words"
                    className="text-xl text-black font-semibold placeholder:text-xl border-2 
                    focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                    type="text"
                    autoComplete="off"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-row justify-center items-center gap-x-3">
                  <label htmlFor="text" className="font-bold text-xl">
                    Image URL
                  </label>
                  <input
                    placeholder="Google Drive Url"
                    className="text-xl text-black font-semibold placeholder:text-xl border-2 
                    focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                    type="text"
                    autoComplete="off"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-row justify-center items-center gap-x-3">
                  <label htmlFor="text" className="font-bold text-xl">
                    Video URL
                  </label>
                  <input
                    placeholder="Youtube Url"
                    className="text-xl text-black font-semibold placeholder:text-xl border-2 
                    focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                    type="text"
                    autoComplete="off"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                  />
                </div>

                <button
                  className="bg-indigo-500 text-white py-3 rounded-md w-full font-semibold 
                  active:scale-75 transition-all hover:bg-indigo-600"
                  onClick={update}
                >
                  Update
                </button>
              </div>
            </div>

            <div className={`${getTranClass(2)}`}>
              <EditAlert
                alerts={alerts}
                id={id}
                token={session?.user.token as string}
              />
            </div>
            <div className={`${getTranClass(3)}`}>
              <h1 className="text-center font-semibold">Status: {examFile}</h1>
              <ExamFile chapter={examFile} />
              {exam.map((question, index) => (
                <div
                  key={index}
                  className="my-4 p-4 border rounded-md bg-gray-100"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {index + 1}. {question.question}{" "}
                    {question.image ? (
                      <Link
                        href={question.image}
                        className="font-normal text-md text-orange"
                      >
                        Image
                      </Link>
                    ) : (
                      ""
                    )}
                  </h2>
                  {question.image && (
                    <div className="w-full sm:w-1/2 relative p-24 my-3">
                      <Image
                        style={{ borderRadius: "9px" }}
                        src={DriveURL(question.image)}
                        fill={true}
                        objectFit="cover"
                        alt={question.question}
                      ></Image>
                    </div>
                  )}
                  <ul className="list-disc list-inside">
                    <li>{question.q1}</li>
                    <li>{question.q2}</li>
                    <li>{question.q3}</li>
                    <li>{question.q4}</li>
                  </ul>
                  <p className="mt-2 text-green-600">
                    <strong>Answer:</strong> {question.answer}
                  </p>
                  <p className="mt-1 text-gray-600">
                    <strong>Reason:</strong> {question.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
