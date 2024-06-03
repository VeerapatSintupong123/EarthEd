"use client";

import { useSession } from "next-auth/react";
import WelcomeBack from "@/components/welcomeBack";
import { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import Link from "next/link";
import { ValidRegister } from "@/libs/validInput";

export default function Register() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [rePass, setRePass] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [schoolName, setschoolName] = useState("");
  const [schoolProvince, setSchoolProvince] = useState("");
  const [schoolLevel, setSchoolLevel] = useState("");
  const [policy, setPolicy] = useState<boolean>();
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const [menu, setMenu] = useState<number>(1);
  const selectMain = menu === 1 ? "bg-slate-300" : "";
  const selectExternal = menu === 2 ? "bg-slate-300" : "";
  const tranMain = menu === 1 ? "" : "hidden";
  const tranExternal = menu === 2 ? "" : "hidden";

  const register = async () => {
    if (
      !ValidRegister(
        email,
        name,
        tel,
        password,
        rePass,
        fullName,
        gender,
        age,
        schoolName,
        schoolProvince,
        schoolLevel
      )
    )
      return;

    if (!policy) {
      Swal.fire({
        title: "Privacy Policy",
        text: "Please read and agree Privacy Policy",
        icon: "error",
        timer: 2000,
      });
      return;
    }

    emailjs.init(process.env.EMAILJS_ID as string);
    try {
      const res = await emailjs.send(
        process.env.EMAILJS_SERVICE as string,
        process.env.EMAILJS_TEMPLATE as string,
        {
          to_name: name,
          code: code,
          to_email: email,
        }
      );

      if (res.status === 200) {
        const result = await Swal.fire({
          timer: 1000 * 60 * 10,
          timerProgressBar: true,
          title: "Verify code",
          inputLabel: "Your verify code from email (6 digits)",
          icon: "info",
          input: "number",
          confirmButtonText: "Submit",
        });

        if (result.value === code) {
          const regResponse = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              tel: tel,
              email: email,
              role: "user",
              password: password,
              fullName: fullName,
              gender: gender,
              age: age,
              schoolName: schoolName,
              schoolProvince: schoolProvince,
              schoolLevel: schoolLevel,
            }),
          });

          if (regResponse.ok) {
            Swal.fire({
              title: "Register success",
              text: "Yeah! you have account",
              icon: "success",
              timer: 2000,
            });
            window.location.href = "/api/auth/signin";
          } else {
            Swal.fire({
              title: "Register fail",
              text: "Some thing went wrong",
              icon: "error",
              timer: 2000,
            });
          }
        } else {
          Swal.fire({
            title: "Invalid Code",
            text: "Code does not match",
            icon: "error",
            timer: 2000,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Invalid Email",
        text: "Can not send verify code",
        icon: "error",
        timer: 2000,
      });
    }
  };

  return session ? (
    <WelcomeBack />
  ) : (
    <main className="flex flex-col items-center min-h-[100vh] p-3 overflow-hidden bg-slate-200">
      <h1 className="text-3xl font-semibold mb-6 mt-5">Register</h1>
      <small className="-mt-5 mb-6 text-lg">
        Already have an account?{" "}
        <Link href="/api/auth/signin" className="text-blue-500">
          Login
        </Link>
      </small>
      <div
        className="z-10 px-7 py-10 shadow border border-gray-300 space-y-3 bg-white rounded-xl 
        flex flex-col w-full md:w-4/5 lg:w-4/5 xl:w-3/6"
        style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        <div className="flex flex-col items-center -mt-4 mb-5">
          <h1 className="text-3xl font-bold">EarthEd</h1>
          <small className="text-red-500 font-bold">
            Exploring the world, One lesson at a time
          </small>
        </div>

        <div className="w-1/2 mx-auto flex p-2">
          <div
            className={`w-1/2 ${selectMain} text-l flex justify-center rounded-t-lg border-main-100 
            hover:bg-slate-300 hover:cursor-pointer font-semibold`}
            onClick={() => {
              setMenu(1);
            }}
          >
            Main
          </div>
          <div
            className={`w-1/2 ${selectExternal} text-l flex justify-center rounded-t-lg border-main-100 
            hover:bg-slate-300 hover:cursor-pointer font-semibold`}
            onClick={() => {
              setMenu(2);
            }}
          >
            External
          </div>
        </div>

        <div className={`${tranMain} space-y-3`}>
          <div className="flex flex-col space-y-3 w-full ">
            <label htmlFor="email" className="font-bold text-xl">
              Email
            </label>
            <input
              id="email"
              placeholder="example@gmail.com"
              className="text-xl text-black font-semibold placeholder:text-xl border-2 
            focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
              type="text"
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-5">
            <div className="flex flex-col space-y-3 w-full sm:w-1/3 md:w-2/5 lg:w-2/5">
              <label htmlFor="name" className="font-bold text-xl">
                Name
              </label>
              <input
                id="name"
                className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                type="text"
                autoComplete="off"
                placeholder="John"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-3 w-full">
              <label htmlFor="tel" className="font-bold text-xl">
                Telephone Number
              </label>
              <input
                id="tel"
                className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                type="tel"
                autoComplete="off"
                placeholder="1234567890"
                onChange={(e) => {
                  setTel(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-5">
            <div className="flex flex-col w-full space-y-3 sm:w-3/5 md:w-2/5 lg:w-3/5">
              <label htmlFor="password" className="font-bold text-xl">
                Password
              </label>
              <input
                id="password"
                placeholder="Password"
                className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                type="password"
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col mb-5 space-y-3 w-full sm:w-2/5 md:w-3/4 lg:w-3/5">
              <label htmlFor="confirm-password" className="font-bold text-xl">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                placeholder="Confirm Password"
                className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                type="password"
                autoComplete="off"
                onChange={(e) => {
                  setRePass(e.target.value);
                }}
              />
            </div>
          </div>

          <small className="text-red-700">
            Telephone Number must be 10 digits and password must be at least 8
            characters long.
          </small>
        </div>

        {/* external data */}
        <div className={`${tranExternal}`}>
          <div className="flex flex-col sm:flex-row sm:space-x-5">
            <div className="flex flex-col w-full space-y-3 sm:w-3/5 md:w-2/5 lg:w-3/5">
              <label htmlFor="text" className="font-bold text-xl">
                Personal Name
              </label>
              <input
                id="password"
                placeholder="Full Name"
                className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                type="text"
                autoComplete="off"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col mb-5 space-y-3 w-full sm:w-2/5 md:w-3/4 lg:w-3/5">
              <label htmlFor="school-name" className="font-bold text-xl">
                School Name
              </label>
              <input
                id="school-name"
                placeholder="School Name"
                className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                type="text"
                autoComplete="off"
                onChange={(e) => {
                  setschoolName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-5">
            <div className="flex flex-col w-full space-y-3 sm:w-3/5 md:w-2/5 lg:w-3/5">
              <label htmlFor="gender" className="font-bold text-xl">
                Gender
              </label>
              <select
                id="gender"
                className="text-xl text-black font-semibold placeholder:text-xl border-2 
                focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option defaultValue="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="flex flex-col mb-5 space-y-3 w-full sm:w-2/5 md:w-3/4 lg:w-3/5">
              <label htmlFor="school-province" className="font-bold text-xl">
                School Province
              </label>
              <input
                id="school-province"
                placeholder="School Province"
                className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                type="text"
                autoComplete="off"
                onChange={(e) => {
                  setSchoolProvince(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-5">
            <div className="flex flex-col w-full space-y-3 sm:w-3/5 md:w-2/5 lg:w-3/5">
              <label htmlFor="age" className="font-bold text-xl">
                Age
              </label>
              <input
                id="age"
                placeholder="Age"
                className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                type="number"
                autoComplete="off"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col mb-5 space-y-3 w-full sm:w-2/5 md:w-3/4 lg:w-3/5">
              <label htmlFor="school-level" className="font-bold text-xl">
                School Level
              </label>
              <input
                id="school-level"
                placeholder="School Level"
                className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                type="text"
                autoComplete="off"
                onChange={(e) => {
                  setSchoolLevel(e.target.value);
                }}
              />
            </div>
          </div>

          <small className="text-red-700">
            School Level: For example, Grade 11 or Mathayom 5
          </small>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <div>
            <input
              type="checkbox"
              name="Policy"
              id="policy"
              onClick={() => {
                setPolicy(!policy);
              }}
            />
            <label htmlFor="Policy" className="ml-3">
              I read and agree to Privacy Policy{" "}
              <Link
                className="text-blue-600"
                href={
                  "https://pdpa.pro/policies/view/th/FGVfSKJr97MT7Sg25Tiw1S4n"
                }
              >
                Thai{" "}
              </Link>
              <Link
                className="text-orange"
                href={
                  "https://pdpa.pro/policies/view/en/FGVfSKJr97MT7Sg25Tiw1S4n"
                }
              >
                Eng
              </Link>
            </label>
          </div>
          <button
            className="bg-indigo-500 text-white py-3 rounded-md w-full font-semibold active:scale-75
            transition-all hover:bg-indigo-600"
            onClick={register}
          >
            REGISTER
          </button>
        </div>
      </div>
    </main>
  );
}
