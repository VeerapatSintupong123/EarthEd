"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Swal from "sweetalert2";
import WelcomeBack from "@/components/welcomeBack";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();

  const submit = async () => {
    if (email && password) {
      const response = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      console.log(response);
      if (!response?.ok) {
        Swal.fire({
          title: "Invalid Credential",
          text: "Email or Password is invalid",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        window.location.href = "/";
      }
    } else {
      Swal.fire({
        title: "Invalid Input",
        text: "Please provide email and password",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return session ? (
    <WelcomeBack></WelcomeBack>
  ) : (
    <main className="flex w-screen flex-col items-center min-h-[100vh] p-7 bg-gradient-to-br from-indigo-500 to-purple-500 overflow-hidden">
      <div className="absolute left-[0vw] bottom-[40vh] sm:left-[10vw] sm:bottom-[45vh] md:left-[15vw] md:bottom-[45vh] lg:left-[20vw] lg:bottom-[50vh] xl:left-[25vw] xl:bottom-[45vh] w-64 h-64 rounded-full bg-emerald-600"></div>
      <div className="absolute right-[0vw] bottom-[10vh] sm:right-[5vw] sm:bottom-[10vh] md:right-[15vw] md:bottom-[10vh] lg:right-[20vw] lg:bottom-[10vh] xl:right-[25vw] xl:bottom-[10vh] w-64 h-64 rounded-full bg-orange"></div>
      <h1 className="text-3xl font-semibold mb-6 mt-10">Login</h1>
      <div
        className="z-10 px-7 py-10 shadow border border-gray-300 space-y-10 bg-white rounded-xl flex flex-col w-11/12 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3"
        style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        <div className="flex flex-row w-full ">
          <div className="flex flex-col space-y-3 w-full">
            <h1 className="font-bold text-xl">Email</h1>
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="text-xl text-blck font-semibold placeholder:text-xl border-2 focus:outline-none py-2 px-5 border-gray-300 h-full rounded-md focus:border-blue-500"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-row w-full ">
          <div className="flex flex-col space-y-3 w-full">
            <h1 className="font-bold text-xl">Password</h1>
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="text-xl text-blck font-semibold placeholder:text-xl border-2 focus:outline-none py-2 px-5 border-gray-300 h-full rounded-md focus:border-blue-500"
              type="password"
            />
          </div>
        </div>
        <button
          onClick={submit}
          className="bg-indigo-500 text-white py-3 rounded-md w-full font-semibold"
        >
          LOGIN
        </button>
      </div>
    </main>
  );
}
