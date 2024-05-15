"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import getShufflePic from "@/libs/getShufflePic";

const ShuffleHero: React.FC = () => {
  const { data: session } = useSession();
  const shuffle = (array: Array<number>) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const squareData: SquareData[] = getShufflePic();

  const generateSquares = () => {
    return shuffle(squareData.map((sq) => sq.id)).map((id) => (
      <motion.div
        key={id}
        layout
        transition={{ duration: 1.5, type: "spring" }}
        className="w-full h-full"
        style={{
          backgroundImage: `url(${squareData.find((sq) => sq.id === id)?.src})`,
          backgroundSize: "cover",
        }}
      ></motion.div>
    ));
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState<JSX.Element[]>(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  const fadeInleft = {
    initial: {
      opacity: 0,
      x: -25,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    transition: {
      delay: 0.5,
      duration: 2.0,
      ease: "easeOut",
    },
  };

  const fadeInright = {
    initial: {
      opacity: 0,
      x: 125,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    transition: {
      delay: 0.6,
      duration: 2.0,
      ease: "easeOut",
    },
  };

  return (
    <section className="w-full px-8 py-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto mt-5">
      <motion.div {...fadeInleft}>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Geology and Geography
        </span>
        <h3 className="text-3xl md:text-6xl  font-semibold">
          Let's Learn And See The World
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          Online course platform about{" "}
          <span className="underline">Geology</span> and{" "}
          <span className="underline">Geography</span> which are taught by an
          International Olympiad student.
        </p>
        {session ? (
          <Link href="/">
            <button className="bg-orange text-white font-medium py-2 px-4 rounded transition-all hover:bg-orangeHover active:scale-75">
              Let's learn !
            </button>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <button className="bg-orange text-white font-medium py-2 px-4 rounded transition-all hover:bg-orangeHover active:scale-75">
              Take course
            </button>
          </Link>
        )}
      </motion.div>
      <motion.div
        className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1"
        {...fadeInright}
      >
        {squares.map((sq) => sq)}
      </motion.div>
    </section>
  );
};

export default ShuffleHero;
