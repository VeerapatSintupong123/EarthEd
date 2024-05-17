"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Swal from "sweetalert2";
import WelcomeBack from "@/components/welcomeBack";
import Link from "next/link";

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
    <main className="flex w-screen flex-col items-center min-h-[100vh] p-7 bg-slate-200 overflow-hidden">
      <h1 className="text-3xl font-semibold mb-6 mt-5">Login</h1>
      <small className="-mt-5 mb-6 text-lg">Welcome back.</small>
      <div
        className="z-10 px-7 py-6 shadow border border-gray-300 space-y-10 bg-white rounded-xl flex flex-col w-11/12 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3"
        style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">EarthEd</h1>
          <small className="text-red-500 font-bold">
            Exploring the world, One lesson at a time
          </small>
        </div>

        <div className="flex flex-row w-full ">
          <div className="flex flex-col space-y-1 w-full">
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
          <div className="flex flex-col space-y-1 w-full">
            <div className="flex flex-row items-baseline justify-between">
              <h1 className="font-bold text-xl">Password</h1>
              <Link
                href="https://www.instagram.com/earthed.education"
                className="text-sm text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>
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
          className="bg-indigo-500 text-white py-3 rounded-md w-full font-semibold active:scale-75"
        >
          LOGIN
        </button>
        <h1 className="text-lg">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-500 font-semibold">
            Join
          </Link>
        </h1>
      </div>
    </main>
  );
}
