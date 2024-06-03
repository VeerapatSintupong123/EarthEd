"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CSVRecord } from "../../interface";
import { CircularProgress } from "@mui/material";

export default function QuestBox({
  type,
  name,
}: {
  type: string;
  name: string;
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const start = "2024-06-01"; //yyyy-mm-dd
  const targetDate = new Date(start);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - targetDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  useEffect(() => {
    const url = type.match("example")
      ? process.env.EXAMPLE_GG
      : process.env.MAIN_GG;

    const fetchData = async () => {
      const response = await fetch(url as string);
      const result = await response.json();
      const data: CSVRecord[] = result.data;

      let index = 0;
      if (type.match("example")) {
        index = daysDifference - 1;
      } else {
        const len = data.length;
        index = Math.floor(Math.random() * len);
      }

      let array: string[] = [];
      setQuestion(data[index].question);
      array.push(data[index].q1);
      array.push(data[index].q2);
      array.push(data[index].q3);
      array.push(data[index].q4);
      setOptions(array);
      setAnswer(data[index].answer);
      setReason(data[index].reason);

      setLoading(false);
    };

    fetchData();
  }, []);

  const saveAnswer = async (data: string) => {
    try {
      await fetch("/api/file/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const checkAnwser = (name: string) => {
    let data: string = "";
    const saveDate = Date.now();
    const date = new Date(saveDate);
    const domain = type.match("example") ? "example GG" : "main GG";

    //date,subject,sub,unit,chapter,type,question,correct,email,answer
    const answerData = [
      date,
      "",
      "",
      "",
      "",
      domain,
      question,
      answer,
      name,
      selectedOption,
    ].join(",");
    data += `\n${answerData}`;

    saveAnswer(data);

    if (selectedOption.match(answer)) {
      Swal.fire({
        title: "Correct!",
        text: "Yeah! Nice shot",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        if (type.match("example")) window.location.href = "/";
        else window.location.href = "/practice";
      });
    } else {
      Swal.fire({
        title: "Wrong!",
        text: `${reason}`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        if (type.match("example")) window.location.href = "/";
        else window.location.href = "/practice";
      });
    }
  };

  const submit = () => {
    if (selectedOption == "") {
      Swal.fire({
        title: "No answer",
        text: "Please select answer",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
      return null;
    }

    if (type.match("example")) {
      Swal.fire({
        icon: "info",
        input: "text",
        confirmButtonText: "Send",
        title: "Send Answer",
        inputLabel: "Anonymous name",
        inputValidator: (value) => {
          if (!value) {
            return "You need to enter an anonymous name!";
          }
        },
      }).then((res) => {
        if (res.isConfirmed) {
          checkAnwser(res.value as string);
        }
      });
    } else if (type.match("main")) {
      checkAnwser(name);
    }
  };

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div
      className="bg-slate-50 rounded-2xl w-full p-10"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      {loading ? (
        <div className="flex flex-col items-center mt-5">
          <CircularProgress></CircularProgress>
        </div>
      ) : (
        <>
          <h1 className="text-center font-bold text-2xl m-2">
            {type.match("example") ? "Example " : ""}Day {daysDifference}
          </h1>
          <h1 className="text-center font-semibold text-lg">{question}</h1>
          <div className="grid grid-cols-2 grid-rows-2 gap-2 m-3">
            {options.map((option, index) => (
              <div key={index} className="bg-orange p-2 rounded-xl text-white">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                    className="form-radio h-5 w-5"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={submit}
              className="bg-indigo-500 p-2 rounded-xl w-1/2 text-white"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
