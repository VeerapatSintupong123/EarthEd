"use client";

import { useState } from "react";

export default function QuestBox() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div
      className="bg-slate-50 rounded-2xl w-full p-12 2xl:p-6 2xl:w-2/5 lg:p-6"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <h1 className="text-center font-bold text-2xl m-2">Day 1</h1>
      <h1 className="text-center font-semibold text-lg">
        What is the capital of Thailand?
      </h1>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 m-3">
        <div className="bg-orange p-2 rounded-xl text-white">
          <label className="inline-flex items-center ">
            <input
              type="radio"
              value="Geneva"
              checked={selectedOption === "Geneva"}
              onChange={handleOptionChange}
              className="form-radio h-5 w-5"
            />
            <span className="ml-2">Geneva</span>
          </label>
        </div>
        <div className="bg-orange p-2 rounded-xl text-white">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Moscow"
              checked={selectedOption === "Moscow"}
              onChange={handleOptionChange}
              className="form-radio h-5 w-5"
            />
            <span className="ml-2">Moscow</span>
          </label>
        </div>
        <div className="bg-orange p-2 rounded-xl text-white">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="Bangkok"
              checked={selectedOption === "Bangkok"}
              onChange={handleOptionChange}
              className="form-radio h-5 w-5 "
            />
            <span className="ml-2">Bangkok</span>
          </label>
        </div>
        <div className="bg-orange p-2 rounded-xl text-white">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="France"
              checked={selectedOption === "France"}
              onChange={handleOptionChange}
              className="form-radio h-5 w-5"
            />
            <span className="ml-2">France</span>
          </label>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-indigo-500 p-2 rounded-xl w-1/2 text-white">
          Submit
        </button>
      </div>
    </div>
  );
}
