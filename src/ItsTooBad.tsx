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

  const [isAppLoading, setIsAppLoading] = useState(true);

  // ⭐ SAME AS REFERENCE
  const [isFoldOpen, setIsFoldOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const torchRef = useRef<HTMLDivElement>(null);
  const firstMoveRef = useRef(true);

  const coverAttheEnd = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  // preload bg load audio player
  useEffect(() => {
    const img = new Image();
    img.src = bgMain;
    const done = () => setIsAppLoading(false);
    img.onload = done;
    img.onerror = done;
    loadSongOnPageLoad(0);
  }, []);

  const toggleFold = () => {
    const element = document.getElementById("foldOut");
    if (!element) return;

    if (element.classList.contains("fade-in")) {
      element.classList.remove("fade-in");
      setIsFoldOpen(false);
    } else {
      element.classList.add("fade-in");
      setIsFoldOpen(true);
    }
  };

  const loadSongOnPageLoad = (index: number) => {
    setActiveButton(originalButtonList[index].id);
    setSongIndex(index);
    setIsMusicPlaying(false);
    setAudioSource(originalButtonList[index].song);
  };

  const handleSelectSong = (index: number) => {
    setActiveButton(originalButtonList[index].id);
    setSongIndex(index);
    setIsMusicPlaying(true);
    setAudioSource(originalButtonList[index].song);
  };

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
      setIsMusicPlaying(true);
    }
  };

  // handle loading audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSource || !isMusicPlaying) return;

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
      } catch {
        setIsMusicPlaying(false);
      } finally {
        setIsAudioLoading(false);
      }
    };

    const onCanPlay = () => tryPlay();

    audio.addEventListener("canplay", onCanPlay);

    return () => {
      cancelled = true;
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, [audioSource]);

  // ⭐ torch (same as reference)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = divRef.current;
    const torch = torchRef.current;
    if (!container || !torch) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (firstMoveRef.current) {
      firstMoveRef.current = false;
      torch.style.opacity = "0.3";
    }

    torch.style.background = `
      radial-gradient(450px circle at ${x}px ${y}px,
      rgba(255,255,255,0.85),
      rgba(255,255,255,0) 55%)
    `;
  };

  const handleMouseEnter = () => {
    if (torchRef.current) torchRef.current.style.opacity = "0.3";
  };

  const handleMouseLeave = () => {
    firstMoveRef.current = true;
    if (torchRef.current) torchRef.current.style.opacity = "0";
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

  return (
    <>
      {/* LOADING */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
          isAppLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="loading loading-ring loading-lg text-white"></div>
      </div>

      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full h-screen relative overflow-hidden"
      >
        <img
          src={bgMain}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          alt=""
        />

        <div
          ref={torchRef}
          className="pointer-events-none absolute inset-0 transition-opacity duration-150"
          style={{ opacity: 0 }}
        />

        <div className="header flex justify-center items-center py-4 relative">
          <Navbar
            isMusicPlaying={isMusicPlaying}
            onPlayPause={toggleAudio}
            audioSource={audioSource}
          />
        </div>

        <div className="flex flex-col items-center h-full space-y-3 -mt-6 relative z-10">
          {/* CLICKABLE COVER */}
          <div
            onClick={toggleFold}
            className="relative min-h-[290px] min-w-[290px] max-h-[290px] max-w-[290px] border-2 border-gray-800 p-4 mt-4 sm:mt-11 shadow-md cursor-pointer bg-[#fef8f2]"
          >
            <div className="h-full w-full bg-cover" style={coverAttheEnd}></div>

            {isAudioLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#fef8f280]">
                <div className="loading loading-ring loading-lg text-black"></div>
              </div>
            )}
          </div>

          {/* BUTTON */}
          <ButtonFold isOpen={isFoldOpen} onClick={toggleFold} />

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
            />
          </div>
        </footer>
      </div>
    </>
  );
}
