import { useState, useRef, useEffect } from "react";
import "./App.css";
import bg from "../src/assets/images/itsTooBadHighRes.jpg";
import bgMain from "../src/assets/images/lakepink.webp";
import { ButtonFold } from "./assets/buttons/buttonFold";
import Navbar from "./assets/navbar/navbar";
import ScrollDownButton from "./assets/buttons/scrollDownButton";

import song1 from "./assets/mp3/Its too bad youre leaving/01.Jannowitzbrucke.mp3";
import song2 from "./assets/mp3/Its too bad youre leaving/02.1641.mp3";
import song3 from "./assets/mp3/Its too bad youre leaving/03.Yellow trail.mp3";
import song4 from "./assets/mp3/Its too bad youre leaving/04.Esmeralda.mp3";
import song5 from "./assets/mp3/Its too bad youre leaving/05.See you.mp3";
import song6 from "./assets/mp3/Its too bad youre leaving/06.Five minutes.mp3";
import song7 from "./assets/mp3/Its too bad youre leaving/07.Maps & Squares.mp3";
import song8 from "./assets/mp3/Its too bad youre leaving/08.Mosquito.mp3";
import song9 from "./assets/mp3/Its too bad youre leaving/09.Aka Bil Pt 1+ Pt 2.mp3";
import song10 from "./assets/mp3/Its too bad youre leaving/10.Le Soleil Brille.mp3";

export default function ItsTooBad() {
  const originalButtonList = [
    { id: 1, title: "1. Jannowitzbrücke", song: song1 },
    { id: 2, title: "2. 16:41", song: song2 },
    { id: 3, title: "3. Yellow Trail", song: song3 },
    { id: 4, title: "4. Esmeralda", song: song4 },
    { id: 5, title: "5. See you", song: song5 },
    { id: 6, title: "6. Five Minutes", song: song6 },
    { id: 7, title: "7. Maps & Squares", song: song7 },
    { id: 8, title: "8. Mosquito", song: song8 },
    { id: 9, title: "9. Åka bil pt1, pt2", song: song9 },
    { id: 10, title: "10. Le Soleil Brille", song: song10 },
  ];

  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const [songIndex, setSongIndex] = useState<number>(-1);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  // ⭐ NEW: page loading state
  const [isAppLoading, setIsAppLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const divRef = useRef<HTMLDivElement>(null);
  const torchRef = useRef<HTMLDivElement>(null);
  const firstMoveRef = useRef(true);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const coverAttheEnd = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  // ⭐ NEW: preload main background
  useEffect(() => {
    const img = new Image();
    img.src = bgMain;

    const done = () => setIsAppLoading(false);

    img.onload = done;
    img.onerror = done;
  }, []);

  const handleSelectSong = (index: number) => {
    setActiveButton(originalButtonList[index].id);
    setSongIndex(index);
    setIsMusicPlaying(true);
    setAudioSource(originalButtonList[index].song);
  };

  const buttonList = originalButtonList.map((button, index) => (
    <li
      key={button.id}
      className="m-1 text-gray-900 hover:text-gray-200 transition duration-300 text-[17px]"
    >
      <button
        className={`radioButton ${
          songIndex === index ? "font-bold text-black" : ""
        } transition duration-100`}
        onClick={() => handleSelectSong(index)}
      >
        {button.title}
      </button>
    </li>
  ));

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMusicPlaying((prev) => !prev);
    }
  };

  const handleSongEnd = () => {
    const nextSongIndex = (songIndex + 1) % originalButtonList.length;
    const nextSong = originalButtonList[nextSongIndex]?.song;
    if (nextSong) {
      setSongIndex(nextSongIndex);
      setAudioSource(nextSong);
    }
  };

  useEffect(() => {
    if (audioSource && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
    }
  }, [audioSource]);

  const handleLoadStart = () => {
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    loadingTimeoutRef.current = setTimeout(() => {
      setIsAudioLoading(true);
    }, 200);
  };

  const handleCanPlayThrough = () => {
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    setIsAudioLoading(false);
  };

  const handleAudioError = () => {
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    setIsAudioLoading(false);
  };

  return (
    <>
      {/* ⭐ SOFT LOADING OVERLAY */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
          isAppLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="loading loading-ring loading-lg text-white"></div>
      </div>

      <div
        id="mainDiv"
        ref={divRef}
        className="w-full h-screen bg-[#f8f8f8] relative"
        style={{
          backgroundImage: `url(${bgMain})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        onMouseMove={(e) => {
          const div = divRef.current;
          if (!div) return;

          const rect = div.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (firstMoveRef.current) {
            firstMoveRef.current = false;
            setOpacity(0.3);
          }

          setPosition({ x, y });
        }}
        onMouseEnter={(e) => {
          const div = divRef.current;
          if (!div) return;

          const rect = div.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          setPosition({ x, y });
          setOpacity(0.3);
        }}
        onMouseLeave={() => {
          firstMoveRef.current = true;
          setOpacity(0);
        }}
      >
        {/* TORCH */}
        <div
          ref={torchRef}
          className="pointer-events-none absolute inset-0 transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px,
              rgba(255,255,255,0.8),
              rgba(255,255,255,0) 50%)`,
          }}
        />

        {/* NAV */}
        <div className="header flex justify-center items-center py-4">
          <Navbar
            isMusicPlaying={isMusicPlaying}
            onPlayPause={toggleAudio}
            audioSource={audioSource}
          />
        </div>

        {/* MAIN */}
        <div className="flex flex-col items-center h-full space-y-3 -mt-6">
          <div className="relative min-h-[290px] min-w-[290px] max-h-[290px] max-w-[290px] border-2 border-solid border-gray-800 p-4 mt-4 sm:mt-11 flex-shrink-0 shadow-md bg-[#fef8f2]">
            <div className="h-full w-full bg-cover" style={coverAttheEnd}></div>

            {isAudioLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#fef8f280] transition-opacity duration-300">
                <div className="loading loading-ring loading-lg text-black"></div>
              </div>
            )}
          </div>

          <div className="mt-2">
            <ButtonFold />
          </div>

          <div
            id="foldOut"
            className="flex flex-row items-start gap-2 max-h-[180px] overflow-y-auto px-6 min-w-[290px] p-2 mt-10 text-lg"
          >
            <div className="flex flex-row items-start">
              <ScrollDownButton />
              <ul className="radioButtons">{buttonList}</ul>
            </div>
          </div>
        </div>

        {/* AUDIO */}
        <footer className="h-0 bg-white">
          <div className="audio-player hidden fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
            <audio
              ref={audioRef}
              controls
              preload="metadata"
              src={audioSource || undefined}
              autoPlay={isMusicPlaying}
              onPlay={() => setIsMusicPlaying(true)}
              onPause={() => setIsMusicPlaying(false)}
              onEnded={handleSongEnd}
              onLoadStart={handleLoadStart}
              onCanPlayThrough={handleCanPlayThrough}
              onError={handleAudioError}
            />
          </div>
        </footer>
      </div>
    </>
  );
}
