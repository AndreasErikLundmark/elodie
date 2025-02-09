import { useState, useRef, useEffect } from 'react';
import './App.css';
import bg from '../src/assets/images/atendbg.png';
import { ButtonFold } from './assets/buttons/buttonFold';
import Navbar from './assets/navbar/navbar';
import Birds from './assets/birds/birds';
import song1 from './assets/mp3/1 - élodie.mp3';
import song2 from './assets/mp3/2 - élodie.mp3';
import song3 from './assets/mp3/3 - élodie.mp3';
import song4 from './assets/mp3/4 - élodie.mp3';
import song5 from './assets/mp3/5 - élodie.mp3';

const App = () => {
  const originalButtonList = [
    { id: 1, title: "1. Be My Ghost", song: song1 },
    { id: 2, title: "2. At the End of the Line", song: song2 },
    { id: 3, title: "3. Mandarine #2", song: song3 },
    { id: 4, title: "4. Make-up killers", song: song4 },
    { id: 5, title: "5. Overload", song: song5 },
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
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  const buttonList = originalButtonList.map((button) => (
    <li key={button.id} className="m-2 text-gray-800 hover:text-gray-500 transition duration-300">
      <button
        className={`radioButton ${songIndex === button.id - 1 ? 'font-bold text-black' : ''} transition duration-300`}
        onClick={() => {
          setActiveButton(button.id); 
          setAudioSource(button.song);
          setSongIndex(button.id - 1); 
          setIsMusicPlaying(true);
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
      setAudioSource(nextSong);
    } else {
      console.error("Next song is undefined! Something went wrong with the song list.");
    }
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
      className="w-full h-screen bg-[#f8f8f8] relative"
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
        <Navbar isMusicPlaying={isMusicPlaying} onPlayPause={toggleAudio} audioSource={audioSource} />
      </div>
      <Birds isPlaying={isMusicPlaying} />

      <div className="flex flex-col items-center h-full space-y-3">
        <div className="min-h-[310px] min-w-[310px] max-h-[300px] max-w-[300px] border-3 border-solid border-gray-800 p-4 mt-11 flex-shrink-0 shadow-md">
          <div className="h-full w-full bg-cover" style={coverAttheEnd}></div>
        </div>

        <ButtonFold />

        <div id="foldOut">
          <ul className="radioButtons">
            {buttonList}
          </ul>
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
};

export default App;

