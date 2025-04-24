import { useState } from "react";
// import { IoIosPause, IoIosPlay } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaCirclePlay } from "react-icons/fa6";
import { FaPauseCircle } from "react-icons/fa";
import { PiVinylRecord } from "react-icons/pi";
import { RxDividerVertical } from "react-icons/rx";




interface NavbarProps {
  isMusicPlaying: boolean;
  onPlayPause: () => void;
  audioSource: string | null;
}

export default function Navbar({
  isMusicPlaying,
  onPlayPause,
  audioSource,
}: NavbarProps) {
  const [isFoldoutOpen, setFoldoutOpen] = useState(false);

  return (
    <div className="w-full bg-transparent text-black text-lg">
      {/* Navbar div */}
      <div className="relative flex justify-between items-center py-4 px-8">
        {/* Play/Pause Button */}
        <button
          onClick={onPlayPause}
          className={`text-xl ${audioSource === null ? "text-gray-800 cursor-not-allowed" : ""}`}
          disabled={audioSource === null}
        >
          {/* {isMusicPlaying ? <IoIosPause /> : <IoIosPlay />} */}
          {isMusicPlaying ? <FaPauseCircle /> : <FaCirclePlay />}
      
        </button>
        <p className="text-2xl"><RxDividerVertical />
        </p>
        <button className="text-2xl"><Link to="/ItsTobadYoureLeaving"><PiVinylRecord />
        </Link> </button>
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1
            className="text-black text-2xl font-bold"
            style={{ letterSpacing: "0.1em" }}
          >
            <Link to="/">élodie</Link>
          </h1>
        </div>

        {/* Navbar menu */}
        <div className="flex-none ml-auto">
          {/* Foldout Menu with Details */}
          <details
            open={isFoldoutOpen}
            onToggle={() => setFoldoutOpen((prevState) => !prevState)}
            className="relative"
          >
            <summary className="cursor-pointer text-2xl text-black list-none font-bold">
              <span className="ml-2 ">
                {/* Custom arrow */}
                {isFoldoutOpen ? ".." : "..."}
              </span>
            </summary>

            {/* Foldout Menu */}
            <ul
              className={`bg-gray-950 bg-opacity-50 text-m rounded-md z-1 text-gray-300 p-4 shadow-none border-solid border-1 border-black z-50 transition-opacity duration-500 ease-in-out ${
                isFoldoutOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                width: "max-content",
                maxWidth: "100vw",
              }}
            >
              <li>
                <a
                  href="https://sv.wikipedia.org/wiki/%C3%89lodie"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About
                </a>
              </li>
              <li>
              <Link to="/photos">Gallery</Link>
                {/* <a href="#">Gallery</a> */}
              </li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
