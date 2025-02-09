import { useState } from 'react';
import { IoIosPause, IoIosPlay } from "react-icons/io";

interface NavbarProps {
    isMusicPlaying: boolean;
  onPlayPause: () => void;
  audioSource: string | null;
}

export default function Navbar({ isMusicPlaying, onPlayPause, audioSource }: NavbarProps) {
    const [isFoldoutOpen, setFoldoutOpen] = useState(false);

  return (
    <div className="w-full bg-transparent text-black text-lg">
      {/* Navbar container */}
      <div className="relative flex justify-between items-center py-4 px-8">
        {/* Play/Pause Button */}
        <button
  onClick={onPlayPause}
  className={`text-2xl ${audioSource === null ? 'text-gray-400 cursor-not-allowed' : ''}`}
  disabled={audioSource === null}
>
          {isMusicPlaying ? <IoIosPause /> : <IoIosPlay />}
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-black text-xl font-bold" style={{ letterSpacing: "0.1em" }}>élodie</h1>
        </div>

        {/* Navbar menu items (right aligned) */}
        <div className="flex-none ml-auto">
          {/* Foldout Menu with Details */}
          <details
            open={isFoldoutOpen}
            onToggle={() => setFoldoutOpen((prevState) => !prevState)}
            className="relative"
          >
            {/* Summary with custom arrow, no default arrow */}
            <summary className="cursor-pointer text-lg text-black list-none font-bold">
              <span className="ml-2">
                {/* Custom arrow */}
                {isFoldoutOpen ? '..' : '...'}
              </span>
            </summary>

            {/* Foldout Menu Content */}
            <ul
              className={`bg-[#f8f8f8] text-black p-2 shadow-none border-solid border-1 border-black z-50 transition-opacity duration-500 ease-in-out ${
                isFoldoutOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              style={{
                position: 'absolute', 
                top: '100%', 
                right: 0, 
                width: 'max-content', 
                maxWidth: '100vw', 
              }}
            >
<li><a href="https://sv.wikipedia.org/wiki/%C3%89lodie" target="_blank" rel="noopener noreferrer">About</a></li>
<li><a href="#">Gallery</a></li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
