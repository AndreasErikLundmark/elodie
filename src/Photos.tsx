import { useState, useRef, useEffect } from "react";
import "./App.css";
import bgMain from "../src/assets/images/lakedarkblue.webp";
import Navbar from "./assets/navbar/navbar";
import Gallery from "./assets/gallery/Gallery";
import Gallery2 from "./assets/gallery/Gallery2";

export default function Photos() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [activeGallery, setActiveGallery] = useState(1);

  const scrollRef = useRef<HTMLDivElement>(null);

  // ⭐ NEW: page loading state
  const [isAppLoading, setIsAppLoading] = useState(true);

  // ⭐ NEW: preload background
  useEffect(() => {
    const img = new Image();
    img.src = bgMain;

    const done = () => setIsAppLoading(false);

    img.onload = done;
    img.onerror = done;
  }, []);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const handleSongEnd = () => {};

  useEffect(() => {
    if (audioSource && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [audioSource]);

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
        className="w-full min-h-screen bg-[#f8f8f8] relative"
        style={{
          backgroundImage: `url(${bgMain})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        onMouseMove={(e) => {
          if (!divRef.current) return;
          const rect = divRef.current.getBoundingClientRect();
          setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        onMouseEnter={() => setOpacity(0.3)}
        onMouseLeave={() => setOpacity(0)}
      >
        {/* TORCH */}
        <div
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
            isMusicPlaying={false}
            onPlayPause={null}
            audioSource={null}
          />
        </div>

        {/* CONTENT */}
        <div
          ref={scrollRef}
          className="flex flex-col items-center overflow-y-auto h-screen"
        >
          {activeGallery === 1 && <Gallery />}
          {activeGallery === 2 && <Gallery2 />}

          <div className="fixed mt-6 w-full justify-center items-center join gap-3 p-1 rounded-lg z-10 text-gray-100">
            <button
              className={`join-item btn ${
                activeGallery === 1 ? "btn-active" : ""
              }`}
              onClick={() => {
                setActiveGallery(1);
                scrollToTop();
              }}
            >
              1
            </button>

            <button
              className={`join-item btn ${
                activeGallery === 2 ? "btn-active" : ""
              }`}
              onClick={() => {
                setActiveGallery(2);
                scrollToTop();
              }}
            >
              2
            </button>
          </div>
        </div>

        {/* AUDIO */}
        <footer className="bg-white w-full">
          <div className="audio-player hidden fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
            <audio
              ref={audioRef}
              controls
              src={audioSource || undefined}
              autoPlay={isMusicPlaying}
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
