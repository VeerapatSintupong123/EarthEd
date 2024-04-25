"use client";

import ShuffleHero from "@/components/shuffle";
import { motion, useMotionTemplate } from "framer-motion";
import { useMotionValue, animate } from "framer-motion";
import React from "react";

const Home = () => {
  const fadeTop = {
    initial: {
      opacity: 0,
      y: -25,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      delay: 0.3,
      duration: 1.5,
      ease: "easeOut",
    },
  };

  const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
  const color = useMotionValue(COLORS_TOP[0]);

  React.useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #FFFFFF 30%, ${color} 90%)`;

  return (
    <motion.main
      style={{
        backgroundImage,
        overflow: "hidden",
        height: "115vh",
      }}
    >
      <motion.h1
        {...fadeTop}
        className="text-center mt-5 font-bold text-4xl md:text-5xl"
      >
        Welcome Geoger!
      </motion.h1>
      <ShuffleHero />
    </motion.main>
  );
};

export default Home;
