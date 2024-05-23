"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";

const logOut = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to log out?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, log out",
    cancelButtonText: "No, cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      signOut();
    }
  });
};

export default function NavBar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const role = session?.user.role;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center w-full mx-auto py-2 border-2">
      <div className="ml-[10px]">
        <Link href="/">
          <h1 className="font-extrabold text-3xl">EarthEd</h1>
        </Link>
      </div>

      <div
        className={`z-50 nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[45vh] left-0 ${
          isMenuOpen ? "top-[9%]" : "-top-[100%]"
        } md:w-auto w-full flex items-center px-5 pl-0`}
      >
        <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 ml-[60px]">
          <li className=" rounded-xl">
            {role !== "admin" ? (
              <Link
                className="hover:text-gray-500 hover:underline"
                href="/profile"
              >
                Profile
              </Link>
            ) : (
              <Link
                className="hover:text-gray-500 hover:underline"
                href="/admin"
              >
                Admin
              </Link>
            )}
          </li>
          <li>
            <Link
              className="hover:text-gray-500 hover:underline"
              href="/course"
            >
              Course
            </Link>
          </li>
          <li>
            <Link className="hover:text-gray-500 hover:underline" href="/learn">
              Learn
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-gray-500 hover:underline"
              href="/practice"
            >
              Practice
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-2 mr-[10px]">
        <button
          onClick={toggleMenu}
          className="text-3xl cursor-pointer md:hidden"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
        {session ? (
          <>
            <button
              onClick={logOut}
              className="bg-orange text-white font-medium py-2 px-4 rounded transition-all hover:bg-orangeHover active:scale-75"
            >
              Log out
            </button>
            <span className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all">
              {session.user.name}
            </span>
          </>
        ) : (
          <>
            <Link
              href="/api/auth/signin"
              className="bg-orange text-white font-medium py-2 px-4 rounded transition-all hover:bg-orangeHover active:scale-75"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-75"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
