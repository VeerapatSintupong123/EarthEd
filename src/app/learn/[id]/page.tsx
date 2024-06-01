"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Alert, Course, CourseStatus } from "../../../../interface";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import { getMe } from "@/libs/me";

const DynamicVideo = dynamic(() => import("@/components/learnPlay"), {
  ssr: false,
});

export default function LearnId({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course>();
  const { data: session } = useSession();

  const [courseStatus, setCourseStatus] = useState<CourseStatus>();
  const [review, setReview] = useState(false);
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    const token = session?.user.token;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/course/${params.id}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

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
        setCourse(data.data);
      } catch (error) {
        Swal.fire({
          title: "Fetch Failed",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/";
        });
      }
    };

    if (token) {
      fetchData();
      getMe(token).then((res) => {
        setCourseStatus(res);
      });
    }
  }, [session, params.id]);

  useEffect(() => {
    if (course && courseStatus) {
      const chapterUser = parseInt(courseStatus.chapter as string);
      const chapterNow = parseInt(course.chapter as string);
      const current = (courseStatus.current as string) ?? "";

      if (!isNaN(chapterUser) && !isNaN(chapterNow)) {
        if (chapterNow !== chapterUser || !current.match("learn")) {
          if (chapterNow < chapterUser) {
            setReview(true);
          } else {
            Swal.fire({
              title: "Cannot go to this route",
              text: "Go to main",
              icon: "error",
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {
              window.location.href = "/";
            });
          }
        }
      }
    }
  }, [course, courseStatus]);

  const updateUser = async () => {
    const updatedStatus = { ...courseStatus, current: "post" };

    const token = session?.user.token;
    const id = session?.user._id;
    await fetch(`/api/updateUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        course: [updatedStatus],
        id: id,
      }),
    });
  };

  useEffect(() => {
    if (finish) {
      updateUser();
    }
  }, [finish]);

  const handleFinish = (status: boolean) => {
    setFinish(status);
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-3 bg-slate-200 overflow-hidden">
      <h1 className="text-3xl font-semibold mb-6 mt-5">
        {course?.subject} ,{course?.chapter}
      </h1>
      <small className="-mt-5 mb-6 text-lg">{course?.title}</small>
      <div
        className="z-10 px-7 py-5 shadow border border-gray-300 space-y-10 bg-white rounded-xl flex flex-col w-full 2xl:w-11/12"
        style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        <div className="flex flex-col items-center -mb-4">
          <h1 className="text-3xl font-bold">EarthEd</h1>
          <small className="text-red-500 font-bold">
            Exploring the world, One lesson at a time
          </small>
          <hr className="w-4/5 h-1 bg-black mt-2 rounded-xl" />
        </div>
        <div className="flex flex-col gap-y-4">
          <DynamicVideo
            url={course?.video as string}
            alerts={course?.alert as Array<Alert>}
            email={session?.user.email as string}
            subject={`${course?.subject} ${course?.chapter}`}
            review={review}
            finish={handleFinish}
          />
        </div>
      </div>
    </main>
  );
}
