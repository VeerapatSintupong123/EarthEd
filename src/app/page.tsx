"use client";

import React from "react";
import HeroQuest from "@/components/heroQuest";
import QuestBox from "@/components/questBox";
import GeniusHero from "@/components/geniusHero";
import BreakHero from "@/components/breakHero";

const Home = () => {
  return (
    <main className="overflow-hidden bg-slate-200">
      <HeroQuest />
      <BreakHero />
      <div
        className="w-full flex justify-center items-center flex-col gap-5 mt-0 
      md:flex-row md:mx-1"
      >
        <QuestBox />
        <GeniusHero />
      </div>
    </main>
  );
};

export default Home;
