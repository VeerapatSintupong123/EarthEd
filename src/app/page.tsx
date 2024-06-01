"use client";

import ImageSlider from "@/components/imageSlider";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col items-center p-3 overflow-hidden">
      <div
        className="z-10 px-7 py-5 shadow border border-gray-300 space-y-5 bg-white rounded-xl 
        flex flex-col w-full md:w-4/5 lg:w-4/5 xl:w-2/3 mt-3"
        style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">EarthEd</h1>
          <small className="text-red-500 font-bold">
            Exploring the world, One lesson at a time
          </small>
          <hr className="w-4/5 h-1 bg-black mt-2 rounded-xl" />
        </div>

        <div className="flex flex-col items-center gap-y-3 ">
          <h1 className="text-2xl font-bold ">What is EarthEd?</h1>
          <p className="text-lg text-center">
            Explore our comprehensive online geography courses, taught by
            Olympiad students.
          </p>
          <p className="text-lg text-center -mt-3">
            Engage with interactive videos and participate in tests designed to
            enhance your learning experience.
          </p>
        </div>

        <div className="w-full">
          <ImageSlider
            images={[
              "https://drive.google.com/uc?export=download&id=1xteo9yqe829TtChXSv1f3MskQcw4C9R2",
              "https://drive.google.com/uc?export=download&id=1xteo9yqe829TtChXSv1f3MskQcw4C9R2",
              "https://drive.google.com/uc?export=download&id=1xteo9yqe829TtChXSv1f3MskQcw4C9R2",
            ]}
          />
        </div>
      </div>

      <div
        className="flex flex-col items-center mt-10 gap-y-5 w-full md:w-4/5 
      lg:flex-row lg:gap-x-5 xl:w-2/3"
      >
        <div
          className="bg-white w-full p-10 rounded-xl flex flex-col items-center"
          style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
        >
          <h1 className="text-xl font-bold text-center">Tutor</h1>
          <div className="w-[25vh] h-[25vh] relative mt-3">
            <Image
              src={
                "https://drive.google.com/uc?export=download&id=1l173vh5w36xmq79zD_zREJCq5juI-Brb"
              }
              alt={`Image Marut`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p>Marut Wongtapin</p>
          <div className="flex flex-row gap-x-2 mt-4 items-center justify-center">
            <p className="font-bold">Achievement:</p>
            <p>Geography Camp 3 (CMU)</p>
          </div>
          <div className="flex flex-row gap-x-2 mt-2 items-center justify-center">
            <p className="font-bold">Current: </p>
            <p>Medical Student CMU</p>
          </div>
          <div className="flex flex-row gap-x-2 mt-2 items-center justify-center">
            <p className="font-bold">Contacts: </p>
            <Link
              href="https://www.facebook.com/marut.wongtapin.3"
              className="text-blue-500"
            >
              Facebook
            </Link>
            <Link
              href="https://www.instagram.com/poemarxt_"
              className="text-rose-500"
            >
              Instagram
            </Link>
          </div>
        </div>
        <div
          className="bg-white w-full p-10 rounded-xl flex flex-col items-center"
          style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
        >
          <h1 className="text-xl font-bold text-center">Developer</h1>
          <div className="w-[25vh] h-[25vh] relative mt-3">
            <Image
              src={
                "https://drive.google.com/uc?export=download&id=1jVBTKEEisIOWutqOvo6Hld4yJz0Z_zEl"
              }
              alt={`Image Veerapat`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p>Veerapat Sintupong</p>
          <div className="flex flex-row gap-x-2 mt-4 items-center justify-center">
            <p className="font-bold">Achievement:</p>
            <p>Computer Camp 2 (CMU)</p>
          </div>
          <div className="flex flex-row gap-x-2 mt-2 items-center justify-center">
            <p className="font-bold">Current:</p>
            <p>CEDT Student CU</p>
          </div>
          <div className="flex flex-row gap-x-2 mt-2 items-center justify-center">
            <p className="font-bold">Contacts: </p>
            <Link
              href="https://www.facebook.com/veerapat.advanture"
              className="text-blue-500"
            >
              Facebook
            </Link>
            <Link
              href="https://www.instagram.com/advanture.exe"
              className="text-rose-500"
            >
              Instagram
            </Link>
            <Link
              href="https://github.com/VeerapatSintupong123"
              className="text-gray-500"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
