import { useState, useRef, useEffect } from "react";
import "./App.css";
import bg from "../src/assets/images/its too bad youre leaving.png";
import bgMain from "../src/assets/images/lakeblue.png";
import Navbar from "./assets/navbar/navbar";
import Gallery from "./assets/gallery/Gallery";

export default function Photos() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const coverAttheEnd = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
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

      {/* Content section that is scrollable */}
      <div className="flex flex-col items-center overflow-y-auto max-h-[500px] ">
        <Gallery />
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
