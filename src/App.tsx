import { useState, useRef, useEffect } from "react";
import "./App.css";
import bg from "../src/assets/images/atendbg.png";
import bgMain from "../src/assets/images/lake.png";
import { ButtonFold } from "./assets/buttons/buttonFold";
import Navbar from "./assets/navbar/navbar";
import Birds from "./assets/birds/birds";

import song1 from "./assets/mp3/1 - élodie.mp3";
import song2 from "./assets/mp3/2 - élodie.mp3";
import song3 from "./assets/mp3/3 - élodie.mp3";
import song4 from "./assets/mp3/4 - élodie.mp3";
import song5 from "./assets/mp3/5 - élodie.mp3";

const App = () => {
  const originalButtonList = [
    { id: 1, title: "1. Be My Ghost", song: song1 },
    { id: 2, title: "2. At the End of the Line", song: song2 },
    { id: 3, title: "3. Mandarine #2", song: song3 },
    { id: 4, title: "4. Make-up Killers", song: song4 },
    { id: 5, title: "5. Overload", song: song5 },
  ];

  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const [songIndex, setSongIndex] = useState<number>(-1);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const coverAtTheEnd = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const handleSelectSong = (index: number) => {
    setActiveButton(originalButtonList[index].id);
    setSongIndex(index);
    setIsMusicPlaying(true);
    setAudioSource(originalButtonList[index].song);
  };

  const buttonList = originalButtonList.map((button, index) => (
    <li
      key={button.id}
      className="m-1 text-gray-900 hover:text-white transition duration-300 text-[17px]"
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
      audioRef.current.play().catch(() => {});
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
        if (!divRef.current) return;
        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setOpacity(0.3)}
      onMouseLeave={() => setOpacity(0)}
    >
      {/* Mouse lighting effect */}
      <div
        className="pointer-events-none absolute inset-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.8), rgba(255,255,255,0) 50%)`,
        }}
      />

      {/* Navbar */}
      <div className="header flex justify-center items-center py-4">
        <Navbar
          isMusicPlaying={isMusicPlaying}
          onPlayPause={toggleAudio}
          audioSource={audioSource}
        />
      </div>

      <Birds isPlaying={isMusicPlaying} />

      {/* Album cover + loading spinner */}
      <div className="flex flex-col items-center h-full space-y-3 -mt-6">
        <div className="relative min-h-[290px] min-w-[290px] max-h-[290px] max-w-[290px] border-2 border-gray-800 p-4 mt-4 sm:mt-11 shadow-md ">
          <div className="h-full w-full bg-cover" style={coverAtTheEnd}></div>
          {isAudioLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#fef8f280] transition-opacity duration-300">
              <div className="loading loading-ring loading-lg text-black"></div>
            </div>
          )}
        </div>

        <ButtonFold />

        {/* Song List */}
        <div id="foldOut">
          <ul className="radioButtons">{buttonList}</ul>
        </div>
      </div>

      {/* Audio Player */}
      <footer className="bg-white w-full hidden">
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
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      </footer>
    </div>
  );
};

export default App;
