"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { CircularProgress, Slider } from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Pause from "@mui/icons-material/Pause";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeOff from "@mui/icons-material/VolumeOff";
import Fullscreen from "@mui/icons-material/Fullscreen";
import { styled } from "@mui/system";
import Swal from "sweetalert2";

const EmeraldSlider = styled(Slider)({
  color: "#50C878",
  "& .MuiSlider-thumb": {
    backgroundColor: "#50C878",
  },
  "& .MuiSlider-track": {
    backgroundColor: "#50C878",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#b3e5b3",
  },
});

export default function LearnPlay({ url }: { url: string }) {
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [alert, setAlert] = useState<boolean>(false);
  const videoRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReady = () => {
    setLoading(false);
    if (videoRef.current) {
      setDuration(videoRef.current.getDuration());
    }
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setProgress(state.played);
    // const targetTime = 5;
    // if (!alert && Math.floor(state.playedSeconds) === targetTime) {
    //   if (document.fullscreenElement) document.exitFullscreen();
    //   setPlaying(!playing);
    //   Swal.fire({ title: "ALERT" });
    //   setAlert(true);
    // }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const seekTo = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      const currentTime = videoRef.current.getCurrentTime();
      if (currentTime > duration * seekTo) videoRef.current.seekTo(seekTo);
    }
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handlePlaybackRateChange = (rate: string) => {
    setPlaybackRate(parseInt(rate));
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      containerRef.current.requestFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    setAlert(false);
  }, [url]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full pt-[56.25%] rounded-xl overflow-hidden"
      >
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <CircularProgress />
          </div>
        )}
        <ReactPlayer
          url={url}
          ref={videoRef}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          playbackRate={playbackRate}
          controls={false}
          style={{ position: "absolute", top: "0", left: "0" }}
          onReady={handleReady}
          onProgress={handleProgress}
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

      <div
        className="relative w-full h-2 bg-gray-300 cursor-pointer"
        onClick={handleSeek}
      >
        <div
          className="absolute h-full bg-emerald-500"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-row gap-x-2">
          <div
            className="bg-emerald-500 px-5 rounded-lg hover:bg-emerald-600 
            hover:cursor-pointer shadow-md border-2 active:scale-75 transition-all"
            onClick={handlePlayPause}
          >
            {playing ? (
              <Pause className="text-black mt-2" />
            ) : (
              <PlayArrow className="text-black mt-2" />
            )}
          </div>
          <div
            onClick={toggleMute}
            className="bg-emerald-500 px-5 rounded-lg hover:bg-emerald-600 
            hover:cursor-pointer shadow-md border-2 active:scale-75 transition-all"
          >
            {muted ? (
              <VolumeOff className="text-black mt-2" />
            ) : (
              <VolumeUp className="text-black mt-2" />
            )}
          </div>
          <div className="ml-1 mt-2">
            <EmeraldSlider
              value={volume}
              onChange={handleVolumeChange}
              min={0}
              max={1}
              step={0.01}
              style={{ width: 100 }}
              valueLabelDisplay="auto"
            />
          </div>
        </div>

        <div className="flex flex-row gap-x-2 items-baseline">
          <select
            value={playbackRate}
            onChange={(e) => {
              handlePlaybackRateChange(e.target.value);
            }}
            className="bg-emerald-500 p-1 rounded-lg cursor-pointer 
            shadow-md border-2 font-semibold "
          >
            <option value={0.5} className="font-semibold">
              0.5x
            </option>
            <option value={1.0} className="font-semibold">
              1x
            </option>
            <option value={1.5} className="font-semibold">
              1.5x
            </option>
            <option value={2.0} className="font-semibold">
              2x
            </option>
          </select>
          <h1>
            {formatTime(progress * duration)} / {formatTime(duration)}
          </h1>
          <div onClick={toggleFullscreen}>
            <Fullscreen
              className="text-emerald-500 hover:text-emerald-600 
            hover:cursor-pointer active:scale-75 transition-all"
            />
          </div>
        </div>
      </div>
    </>
  );
}
