import { useState, useRef, useEffect } from "react";
import "./App.css";
import bg from "../src/assets/images/itsTooBadHighRes.jpg";
import bgMain from "../src/assets/images/lakepink.png";
import { ButtonFold } from "./assets/buttons/buttonFold";
import Navbar from "./assets/navbar/navbar";
import { useMutation } from "@tanstack/react-query";
import { fetchSong } from "./assets/api/api";
import ScrollDownButton from "./assets/buttons/scrollDownButton";

export default function ItsTooBad() {
  const originalButtonList = [
    { id: 1, title: "1. Jannowitzbrücke", song: "01%20Be%20My%20Ghost.mp3" },
    {
      id: 2,
      title: "2. 16:41",
      song: "02%20At%20The%20End%20Of%20The%20Line.mp3",
    },
    { id: 3, title: "3. Yellow Trail", song: "03%20Mandarine%20%232.mp3" },
    { id: 4, title: "4. Esmeralda", song: "04%20Make-up%20Killers.mp3" },
    { id: 5, title: "5. See you", song: "05%20Overload.mp3" },
    { id: 6, title: "6. Five Minutes", song: "01%20Be%20My%20Ghost.mp3" },
    {
      id: 7,
      title: "7. Maps & Squares",
      song: "02%20At%20The%20End%20Of%20The%20Line.mp3",
    },
    { id: 8, title: "8. Mosquito", song: "03%20Mandarine%20%232.mp3" },
    { id: 9, title: "9. Åka bil", song: "04%20Make-up%20Killers.mp3" },
    { id: 10, title: "10. Åka bil, pt2", song: "05%20Overload.mp3" },
    { id: 11, title: "11. Le Soleil Brille", song: "05%20Overload.mp3" },
  ];

  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const [songIndex, setSongIndex] = useState<number>(-1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const coverAttheEnd = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const buttonList = originalButtonList.map((button) => (
    <li
      key={button.id}
      className="m-1 text-gray-900 hover:text-gray-200 transition duration-300"
    >
      <button
        className={`radioButton ${songIndex === button.id - 1 ? "font-bold text-black" : ""} transition duration-100`}
        onClick={() => {
          setActiveButton(button.id);
          // setAudioSource(button.song);
          setSongIndex(button.id - 1);
          setIsMusicPlaying(true);
          mutation.mutate({ song_name: button.song });
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

    console.log("next song is:", nextSongIndex, nextSong);

    if (nextSong) {
      setSongIndex(nextSongIndex);
      // setAudioSource(nextSong);
      mutation.mutate({ song_name: nextSong });
    } else {
      console.error(
        "Next song is undefined! Something went wrong with the song list."
      );
    }
  };

  useEffect(() => {
    if (audioSource && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [audioSource]);

  const mutation = useMutation({
    mutationFn: async ({ song_name }: { song_name: string }) => {
      return await fetchSong(song_name);
    },
    onSuccess: (responseData) => {
      setAudioSource(responseData);
    },
    onError: (error) => {
      console.error("Error fetching song:", error);
    },
  });

  //   const scrollFoldOut = (direction) => {
  //     const container = document.getElementById("foldOut");
  //     if (!container) return;

  //     const scrollAmount = 60; // Adjust this for more/less scroll per click

  //     if (direction === "down") {
  //       container.scrollBy({ top: scrollAmount, behavior: "smooth" });
  //     } else {
  //       container.scrollBy({ top: -scrollAmount, behavior: "smooth" });
  //     }
  //   };

  return (
    <div
      ref={divRef}
      className="w-full h-screen bg-[#f8f8f8] relative "
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
        className="pointer-events-none absolute inset-0 transition duration-300 "
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

      <div className="flex flex-col items-center h-full space-y-3 -mt-6">
        {mutation.isPending ? (
          <div className="flex justify-center items-center min-h-[290px] min-w-[290px] max-h-[290px] max-w-[290px] border-3 border-solid border-gray-800 p-4 mt-4 sm:mt-11 flex-shrink-0 shadow-md bg-[#fef8f2]">
            <div className="absolute text-black loading loading-ring loading-lg z-10"></div>
            <div
              className="h-full w-full bg-cover "
              style={coverAttheEnd}
            ></div>

            {/* Loader Spinner */}
          </div>
        ) : (
          <div className="relative min-h-[290px] min-w-[290px] max-h-[290px] max-w-[290px] border-2 border-solid border-gray-800 p-4 mt-4 sm:mt-11 flex-shrink-0 shadow-md bg-[#fef8f2]">
            <div className="h-full w-full bg-cover" style={coverAttheEnd}></div>{" "}
            {/* Background */}
          </div>
        )}

        <div className="mt-2">
          <ButtonFold />
        </div>

        <div
          id="foldOut"
          className="flex flex-row items-start gap-2 max-h-[140px] overflow-y-auto px-6 min-w-[290px] p-2 mt-10"
        >
          <div>
            <ul className="radioButtons">{buttonList}</ul>
          </div>
          <ScrollDownButton />
        </div>
      </div>

      <footer className="h-0 bg-white">
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
