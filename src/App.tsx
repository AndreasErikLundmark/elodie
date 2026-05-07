import { useState, useRef, useEffect } from "react";
import "./App.css";
import bg from "../src/assets/images/atendbg.png";
import bgMain from "../src/assets/images/lake.png";
import { ButtonFold } from "./assets/buttons/buttonFold";
import Navbar from "./assets/navbar/navbar";
import Birds from "./assets/birds/birds";

import song1 from "./assets/mp3/At the end of the line/01 - Be my ghost.mp3";
import song2 from "./assets/mp3/At the end of the line/02 - At the end of the line.mp3";
import song3 from "./assets/mp3/At the end of the line/03 - Mandarine2.mp3";
import song4 from "./assets/mp3/At the end of the line/04 Make up killers.mp3";
import song5 from "./assets/mp3/At the end of the line/05 - Overload.mp3";

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
      className="m-1 text-gray-900 hover:text-red-500 transition duration-300 text-[17px]"
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
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
      setIsMusicPlaying(true);
    } else {
      audio.pause();
      setIsMusicPlaying(false);
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

  // 🔥 ONLY FIX THAT MATTERS (this is the entire solution)
  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio || !audioSource) return;

  //   setIsAudioLoading(true);

  //   audio.pause();
  //   audio.src = audioSource;
  //   audio.load();

  //   const onCanPlay = () => {
  //     audio.play().catch(() => {});
  //     setIsMusicPlaying(true);
  //     setIsAudioLoading(false);
  //   };

  //   audio.addEventListener("canplay", onCanPlay, { once: true });

  //   return () => {
  //     audio.removeEventListener("canplay", onCanPlay);
  //   };
  // }, [audioSource]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSource) return;

    let cancelled = false;

    setIsAudioLoading(true);

    audio.pause();
    audio.src = audioSource;
    audio.load();

    const tryPlay = async () => {
      if (cancelled) return;

      try {
        await audio.play();
        setIsMusicPlaying(true);
      } catch (err) {
        // autoplay blocked or timing issue
        setIsMusicPlaying(false);
      } finally {
        setIsAudioLoading(false);
      }
    };

    const onCanPlay = () => {
      tryPlay();
    };

    audio.addEventListener("canplay", onCanPlay);

    return () => {
      cancelled = true;
      audio.removeEventListener("canplay", onCanPlay);
    };
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
      <div
        className="pointer-events-none absolute inset-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.8), rgba(255,255,255,0) 50%)`,
        }}
      />

      <div className="header flex justify-center items-center py-4">
        <Navbar
          isMusicPlaying={isMusicPlaying}
          onPlayPause={toggleAudio}
          audioSource={audioSource}
        />
      </div>

      <Birds isPlaying={isMusicPlaying} />

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

        <div id="foldOut">
          <ul className="radioButtons">{buttonList}</ul>
        </div>
      </div>

      <footer className="bg-white w-full">
        <div className="audio-player hidden fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
          <audio
            ref={audioRef}
            controls
            src={audioSource || undefined}
            preload="auto"
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
  );
};

export default App;
