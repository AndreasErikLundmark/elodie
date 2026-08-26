import { useState, useRef, useEffect } from "react";
import "./App.css";
import bgMain from "../src/assets/images/lakedarkblue.webp";
import Navbar from "./assets/navbar/navbar";

// Ivorie
import song1 from "./assets/mp3/Ivorie/01 Track 1.mp3";
import song2 from "./assets/mp3/Ivorie/02 Track 2.mp3";
import song3 from "./assets/mp3/Ivorie/03 Track 3.mp3";
import song4 from "./assets/mp3/Ivorie/04 Track 4.mp3";
import song5 from "./assets/mp3/Ivorie/05 Track 5.mp3";
import song6 from "./assets/mp3/Ivorie/06 Track 6.mp3";
import song7 from "./assets/mp3/Ivorie/07 Track 7.mp3";
import song8 from "./assets/mp3/Ivorie/08 Track 8.mp3";
import song9 from "./assets/mp3/Ivorie/09 Track 9.mp3";

// Rumble Road
import song10 from "./assets/mp3/elodie rumbleroad/rumble road/01 Track 1.mp3";
import song11 from "./assets/mp3/elodie rumbleroad/rumble road/02 Track 2.mp3";
import song12 from "./assets/mp3/elodie rumbleroad/rumble road/03 Track 3.mp3";

// PostLude
import song13 from "./assets/mp3/postlude/epilouge.wav";

const OtherTunes = () => {
  const originalButtonList = [
    { id: 1, title: "1. dsre ave", song: song1 },
    { id: 2, title: "2. Kill One More Day", song: song2 },
    { id: 3, title: "3. Jannowitzbrücke", song: song3 },
    { id: 4, title: "4. Timeless", song: song4 },
    { id: 5, title: "5. Bwana Tembo", song: song5 },
    { id: 6, title: "6. See you", song: song6 },
    { id: 7, title: "7. Marshmallow Man", song: song7 },
    { id: 8, title: "8. Mandarine", song: song8 },
    { id: 9, title: "9. Le Soleil Brille", song: song9 },
  ];

  const rumbleList = [
    { id: 10, title: "1. Marshmallow Man", song: song10 },
    { id: 11, title: "2. Jannowitzbrücke", song: song11 },
    { id: 12, title: "3. Cosmonaut", song: song12 },
  ];

  const lastList = [{ id: 13, title: "1. Epilogue", song: song13 }];

  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const [songIndex, setSongIndex] = useState<number>(-1);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const [isAppLoading, setIsAppLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const torchRef = useRef<HTMLDivElement>(null);
  const firstMoveRef = useRef(true);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  //preload bg
  useEffect(() => {
    const img = new Image();
    img.src = bgMain;

    const done = () => setIsAppLoading(false);

    img.onload = done;
    img.onerror = done;
    setActiveButton(10);
    setSongIndex(9);

    setAudioSource(song10);
    console.log("Andreas load print" + audioSource);
  }, []);

  const buttonList = originalButtonList.map((button) => (
    <li
      key={button.id}
      className="m-1 text-gray-900 hover:text-gray-200 transition duration-300"
    >
      <button
        className={`radioButton ${
          songIndex === button.id - 1 ? "font-bold text-black" : ""
        } transition duration-100`}
        onClick={() => {
          setActiveButton(button.id);
          setSongIndex(button.id - 1);
          setIsMusicPlaying(true);
          setAudioSource(button.song);
        }}
      >
        {button.title}
      </button>
    </li>
  ));

  const buttonList2 = rumbleList.map((button) => (
    <li
      key={button.id}
      className="m-1 text-gray-900 hover:text-gray-200 transition duration-300"
    >
      <button
        className={`radioButton ${
          songIndex === button.id - 1 ? "font-bold text-black" : ""
        } transition duration-100`}
        onClick={() => {
          setActiveButton(button.id);
          setSongIndex(button.id - 1);
          setIsMusicPlaying(true);
          setAudioSource(button.song);
        }}
      >
        {button.title}
      </button>
    </li>
  ));

  const buttonList3 = lastList.map((button) => (
    <li
      key={button.id}
      className="m-1 text-gray-700 hover:text-gray-200 transition duration-300 text-base"
    >
      <button
        className={`radioButton ${
          songIndex === button.id - 1 ? "font-bold text-black" : ""
        } transition duration-100`}
        onClick={() => {
          setActiveButton(button.id);
          setSongIndex(button.id - 1);
          setIsMusicPlaying(true);
          setAudioSource(button.song);
        }}
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
      setIsMusicPlaying((prevState) => !prevState);
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
      audioRef.current.play();
    }
  }, [audioSource]);

  const handleLoadStart = () => {
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    loadingTimeoutRef.current = setTimeout(() => {
      setIsAudioLoading(true);
    }, 2000);
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
      {/* ⭐ SOFT PAGE LOADER */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
          isAppLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="loading loading-ring loading-lg text-white"></div>
      </div>

      <div
        id="mainDiv"
        className="w-full h-screen bg-[#f8f8f8] relative "
        style={{
          backgroundImage: `url(${bgMain})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        onMouseMove={(e) => {
          const rect = (
            e.currentTarget as HTMLDivElement
          ).getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (firstMoveRef.current) {
            firstMoveRef.current = false;
            setOpacity(0.3);
          }

          setPosition({ x, y });
        }}
        onMouseEnter={(e) => {
          const rect = (
            e.currentTarget as HTMLDivElement
          ).getBoundingClientRect();
          setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
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
          className="pointer-events-none absolute inset-0 transition duration-300 "
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

        {/* CONTENT */}
        <div className="flex flex-col items-center h-full space-y-3 -mt-6 z-10">
          <div>
            <h2 className="text-black text-lg font-bold p-2 flex items-center">
              Rumble Road
              {isAudioLoading && (
                <div className="ml-2">
                  <div className="loading loading-ring loading-xs text-gray-300" />
                </div>
              )}
            </h2>
            <ul className="radioButtons">{buttonList2}</ul>
          </div>

          <div>
            <h2 className="text-black text-lg font-bold p-2 flex items-center">
              Ivorie
              {isAudioLoading && (
                <div className="ml-2">
                  <div className="loading loading-ring loading-xs text-gray-300" />
                </div>
              )}
            </h2>
            <ul className="radioButtons">{buttonList}</ul>
          </div>

          <div>
            <h2 className="text-black text-lg font-bold p-2 flex items-center">
              Postlude
            </h2>
            <ul className="radioButtons">{buttonList3}</ul>
          </div>
        </div>

        {/* AUDIO */}
        <footer className="bg-white w-full hidden">
          <div className="audio-player hidden fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
            <audio
              ref={audioRef}
              controls
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
};

export default OtherTunes;
