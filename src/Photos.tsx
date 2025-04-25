import { useState, useRef, useEffect } from "react";
import "./App.css";
// import bg from "../src/assets/images/its too bad youre leaving.png";
import bgMain from "../src/assets/images/lakedark.png";
import Navbar from "./assets/navbar/navbar";
import Gallery from "./assets/gallery/Gallery";
import Gallery2 from "./assets/gallery/Gallery2";
import Gallery3 from "./assets/gallery/Gallery3";

export default function Photos() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [activeGallery, setActiveGallery] = useState(1);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
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

  const handleSongEnd = () => {
    // handle song end logic if necessary
  };

  useEffect(() => {
    if (audioSource && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [audioSource]);

  return (
    <div
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
      <div
        ref={scrollRef}
        className="flex flex-col items-center overflow-y-auto h-screen"
      >
        {/* <div className="flex flex-col items-center overflow-y-auto max-h-[480px]"> */}
        {activeGallery === 1 && <Gallery />}
        {activeGallery === 2 && <Gallery2 />}
        {activeGallery === 3 && <Gallery3 />}
      </div>
      {/* Content section that is scrollable */}
      {/* <div className="flex flex-col items-center overflow-y-auto max-h-[480px] ">
        <Gallery />
        <Gallery2 />
      </div> */}
      <div className="fixed bottom-0 w-full justify-center items-center join gap-3 p-1 rounded-lg z-10 text-gray-100">
        <button
          className={`join-item btn ${activeGallery === 1 ? "btn-active" : ""}`}
          onClick={() => {
            setActiveGallery(1);
            scrollToTop();
          }}
        >
          1
        </button>
        <button
          className={`join-item btn ${activeGallery === 2 ? "btn-active" : ""}`}
          onClick={() => {
            setActiveGallery(2);
            scrollToTop();
          }}
        >
          2
        </button>
        <button
          className={`join-item btn ${activeGallery === 3 ? "btn-active" : ""}`}
          onClick={() => {
            setActiveGallery(3);
            scrollToTop();
          }}
        >
          3
        </button>
      </div>

      {/* Footer section */}
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
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      </footer>
    </div>
  );
}
