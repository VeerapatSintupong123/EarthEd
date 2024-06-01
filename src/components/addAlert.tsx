import { ValidAddAlert } from "@/libs/validInput";
import { Alert, Course } from "../../interface";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AddAlert({
  courses,
  token,
}: {
  courses: Course[];
  token: string;
}) {
  const [chapters, setChapters] = useState<Array<string>>([]);
  const [id, setId] = useState<string>("");
  const [alerts, setAlerts] = useState<Array<Alert>>([]);

  const [time, setTime] = useState("");
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("");
  const handleSelect = (tran: string) => {
    return tran === type ? "" : "hidden";
  };

  const [double1, setDouble1] = useState("");
  const [double2, setDouble2] = useState("");

  const [four1, setFour1] = useState("");
  const [four2, setFour2] = useState("");
  const [four3, setFour3] = useState("");
  const [four4, setFour4] = useState("");

  const [answer, setAnswer] = useState("");
  const [reason, setReason] = useState("");

  const addAlert = async () => {
    if (!id) {
      Swal.fire({
        title: "Invalid Input",
        text: "Please select chapter",
        icon: "error",
        timer: 2000,
      });
      return null;
    }

    const res = ValidAddAlert(
      alerts,
      time,
      question,
      type,
      double1,
      double2,
      four1,
      four2,
      four3,
      four4,
      answer,
      reason
    );

    if (!res) return null;
    else alerts.push(res);

    try {
      const response = await fetch("/api/course/updateAlert", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alert: alerts,
          id: id,
          token: token,
        }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Update Successful",
          text: "Add Alert",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => (window.location.href = "/admin"));
      } else {
        Swal.fire({
          title: "Fail to Update",
          text: "Something went wrong",
          timer: 2000,
          icon: "error",
          showConfirmButton: false,
        });
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

  return (
    <div className="flex flex-col gap-y-3 items-center">
      {/* Subject and Chapter */}
      <div className="w-full flex flex-row justify-center items-center gap-x-3">
        <label htmlFor="subject" className="font-bold text-xl">
          Subject
        </label>
        <select
          id="subject"
          className="text-xl text-black font-semibold placeholder:text-xl border-2 
          focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
          onChange={(e) => {
            const subject = e.target.value;
            var temp: Array<string> = [];
            courses.forEach((course) => {
              if (course.subject.match(subject)) temp.push(course.chapter);
            });
            temp.sort();
            setChapters(temp);
          }}
        >
          <option value="" disabled selected>
            Select Subject
          </option>
          <option value="Geography">Geography</option>
        </select>
        <label htmlFor="chapter" className="font-bold text-xl">
          Chapter
        </label>
        <select
          id="chapter"
          className="text-xl text-black font-semibold placeholder:text-xl border-2 
          focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
          onChange={(e) => {
            const chapter = e.target.value;
            courses.forEach((course) => {
              if (course.chapter.match(chapter)) {
                setAlerts(course.alert);
                setId(course._id);
              }
            });
          }}
        >
          <option value="" disabled selected>
            Select Chapter
          </option>
          {chapters.map((chapter, index) => (
            <option key={index} value={chapter}>
              {chapter}
            </option>
          ))}
        </select>
      </div>

      {/* Time and Question */}
      <div className="w-full flex flex-row justify-center items-center gap-x-3">
        <label htmlFor="time" className="font-bold text-xl">
          Time
        </label>
        <input
          id="time"
          placeholder="00:00"
          className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500
              w-1/4"
          type="text"
          autoComplete="off"
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
        <label htmlFor="question" className="font-bold text-xl">
          Question
        </label>
        <input
          id="question"
          placeholder="How are you?"
          className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500
              w-1/2"
          type="text"
          autoComplete="off"
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
      </div>

      {/* Type */}
      <div className="w-full flex flex-row justify-center items-center gap-x-3">
        <label htmlFor="Type" className="font-bold text-xl">
          Type
        </label>
        <select
          id="Type"
          className="text-xl text-black font-semibold placeholder:text-xl border-2 
          focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="" disabled selected>
            Select Type
          </option>
          <option value="Answering">Answering</option>
          <option value="2MCQ">2MCQ</option>
          <option value="4MCQ">4MCQ</option>
        </select>
      </div>

      {/* 2MCQ */}
      <div className={`flex flex-col gap-y-3 ${handleSelect("2MCQ")}`}>
        <div className="w-full flex flex-row justify-center items-center gap-x-3">
          <label htmlFor="q1" className="font-bold text-xl">
            Q1
          </label>
          <input
            id="q1"
            placeholder="I am ok"
            className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500 w-1/2"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              setDouble1(e.target.value);
            }}
          />
          <label htmlFor="q2" className="font-bold text-xl">
            Q2
          </label>
          <input
            id="q2"
            placeholder="I am sick"
            className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500 w-1/2"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              setDouble2(e.target.value);
            }}
          />
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-x-3">
          <label htmlFor="answer" className="font-bold text-xl">
            Answer
          </label>
          <select
            id="answer"
            className="text-xl text-black font-semibold placeholder:text-xl border-2 
          focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
          >
            <option value="" disabled selected>
              Select Answer
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <label htmlFor="reason" className="font-bold text-xl">
            Reason
          </label>
          <input
            id="reason"
            placeholder="I am sick"
            className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500 w-1/2"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              setReason(e.target.value);
            }}
          />
        </div>
      </div>

      {/* 4MCQ */}
      <div className={`flex flex-col gap-y-3 ${handleSelect("4MCQ")}`}>
        <div className="w-full flex flex-row justify-center items-center gap-x-3">
          <label htmlFor="q1" className="font-bold text-xl">
            Q1
          </label>
          <input
            id="q1"
            placeholder="Q1"
            className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500 w-1/2"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              setFour1(e.target.value);
            }}
          />
          <label htmlFor="q2" className="font-bold text-xl">
            Q2
          </label>
          <input
            id="q2"
            placeholder="Q2"
            className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500 w-1/2"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              setFour2(e.target.value);
            }}
          />
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-x-3">
          <label htmlFor="q3" className="font-bold text-xl">
            Q3
          </label>
          <input
            id="q3"
            placeholder="Q3"
            className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500 w-1/2"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              setFour3(e.target.value);
            }}
          />
          <label htmlFor="q4" className="font-bold text-xl">
            Q4
          </label>
          <input
            id="q4"
            placeholder="Q4"
            className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500 w-1/2"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              setFour4(e.target.value);
            }}
          />
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-x-3">
          <label htmlFor="answer" className="font-bold text-xl">
            Answer
          </label>
          <select
            id="answer"
            className="text-xl text-black font-semibold placeholder:text-xl border-2 
          focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
          >
            <option value="" disabled selected>
              Select Answer
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <label htmlFor="reason" className="font-bold text-xl">
            Reason
          </label>
          <input
            id="reason"
            placeholder="Reason"
            className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500 w-1/2"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              setReason(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Button */}
      <button
        className="bg-indigo-500 text-white py-3 rounded-md w-full font-semibold 
        active:scale-75 transition-all hover:bg-indigo-600"
        onClick={addAlert}
      >
        Add
      </button>
    </div>
  );
}
