import { useState } from "react";
// import { IoIosPause, IoIosPlay } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaCirclePlay } from "react-icons/fa6";
import { FaPauseCircle } from "react-icons/fa";
import { PiVinylRecord } from "react-icons/pi";

import { HiOutlinePhotograph } from "react-icons/hi";
import { LuInfo } from "react-icons/lu";
import { NavLink } from "react-router-dom";
// import { RiFolderDownloadLine } from "react-icons/ri";

interface NavbarProps {
  isMusicPlaying: boolean;
  onPlayPause: (() => void) | null;
  audioSource: string | null;
}

export default function Navbar({
  isMusicPlaying,
  onPlayPause,
  audioSource,
}: NavbarProps) {
  const [isFoldoutOpen, setFoldoutOpen] = useState(false);

  return (
    <div className="w-full bg-transparent text-white text-lg z-50">
      {/* Navbar div */}
      <div className="relative flex justify-between items-center py-4 px-8">
        {/* Play/Pause Button */}
        {onPlayPause && (
          <button
            onClick={onPlayPause}
            className={`text-xl ${
              audioSource === null
                ? "text-white opacity-80 cursor-not-allowed"
                : ""
            }`}
            disabled={audioSource === null}
          >
            {isMusicPlaying ? <FaPauseCircle /> : <FaCirclePlay />}
          </button>
        )}

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
            <summary className="cursor-pointer text-2xl text-white list-none font-bold opacity-80">
              <span className="ml-2 ">
                {/* Custom arrow */}

                {isFoldoutOpen ? ".." : "!..."}
              </span>
            </summary>

            {/* Foldout Menu */}
            <ul
              className={`bg-gray-950 bg-opacity-90 text-2xl gap-4 rounded-md z-100 text-gray-300 p-4 shadow-none border-solid border-1 border-black z-50 transition-opacity duration-500 ease-in-out ${
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
              <li className="m-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-black font-bold" : "text-gray-300"
                  }
                >
                  <PiVinylRecord />
                </NavLink>
              </li>
              <li className="m-2">
                <NavLink
                  to="/ItsTobadYoureLeaving"
                  className={({ isActive }) =>
                    isActive ? "text-black font-bold" : "text-gray-300"
                  }
                >
                  <PiVinylRecord />
                </NavLink>
              </li>
              <li className="m-2">
                <NavLink
                  to="/OtherTunes"
                  className={({ isActive }) =>
                    isActive ? "text-black font-bold" : "text-gray-300"
                  }
                >
                  <PiVinylRecord />
                </NavLink>
              </li>
              <li className="m-2">
                <Link to="/photos">
                  <HiOutlinePhotograph />
                </Link>
                {/* <a href="#">Gallery</a> */}
              </li>
              <li className="m-2">
                <NavLink
                  to="/Info"
                  className={({ isActive }) =>
                    isActive ? "text-black font-bold" : "text-gray-300"
                  }
                >
                  <LuInfo />
                </NavLink>
              </li>
              {/* <li className="m-2">
                <a
                  href="https://sv.wikipedia.org/wiki/%C3%89lodie"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiFolderDownloadLine />
                </a>
              </li> */}
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
