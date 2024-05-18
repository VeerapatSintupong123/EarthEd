"use client";

import React, { useState } from "react";
import ReactPlayer from "react-player";
import { CircularProgress } from "@mui/material";

export default function Video({ url }: { url: string }) {
  const [loading, setLoading] = useState(true);

  const handleReady = () => {
    setLoading(false);
  };

  return (
    <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        playing={true}
        controls={false}
        style={{ position: "absolute", top: "0", left: "0" }}
        onReady={handleReady}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              controls: 0,
              disablekb: 1,
              showinfo: 0,
            },
          },
        }}
      />
      {!loading && (
        <div className="absolute inset-0 bg-transparent cursor-not-allowed"></div>
      )}
    </div>
  );
}
