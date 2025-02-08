import './App.css';
import bg from '../src/assets/images/atendbg.png';
import { ButtonFold } from './assets/buttons/buttonFold';
import { useState, useRef } from 'react';
import Navbar from './assets/navbar/navbar';
import Birds from './assets/birds/birds';

import song1 from './assets/mp3/1 - élodie.mp3';
import song2 from './assets/mp3/2 - élodie.mp3';
import song3 from './assets/mp3/3 - élodie.mp3';
import song4 from './assets/mp3/4 - élodie.mp3';
import song5 from './assets/mp3/5 - élodie.mp3';

function App() {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const [songIndex, setSongIndex] = useState<number>(0); 
  
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference to the audio player

  const coverAttheEnd = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  const buttonList = [
    { id: 1, title: "1. Be My Ghost", song: song1 },
    { id: 2, title: "2. At the End of the Line", song: song2 },
    { id: 3, title: "3. Mandarine #2", song: song3 },
    { id: 4, title: "4. Make-up killers", song: song4 },
    { id: 5, title: "5. Overload", song: song5 },
  ].map((button) => (
    <li key={button.id} className="m-2 text-gray-800 hover:text-gray-500 transition duration-300">
      <button
        className={`radioButton ${activeButton === button.id ? 'font-bold text-black' : ''} transition duration-300`}
        onClick={() => {
          setActiveButton(button.id);
          setAudioSource(button.song);
          setIsMusicPlaying(true); // Start playing the selected song immediately
        }}
      >
        {button.title}
      </button>
    </li>
  ));

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play(); // Play the audio
      } else {
        audioRef.current.pause(); // Pause the audio
      }
      setIsMusicPlaying((prevState) => !prevState); // Toggle play state
    }
  };

  const handleSongEnd = () => {
    const nextSongIndex = (songIndex + 1) % buttonList.length;
    setSongIndex(nextSongIndex); 
    setAudioSource(buttonList[nextSongIndex].song); 
    setIsMusicPlaying(true); 
  };

  return (
    <div className="w-full h-screen bg-white">
      <div className="header flex justify-center items-center py-4">
        <Navbar isMusicPlaying={isMusicPlaying} onPlayPause={toggleAudio} audioSource={audioSource} />
      </div>
      <Birds isPlaying={isMusicPlaying} />

      <div className="flex flex-col items-center h-full space-y-6">
        <div className="min-h-[300px] min-w-[300px] max-h-[300px] max-w-[300px] border-4 border-solid border-black p-4 mt-12 flex-shrink-0">
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
             {/* Audio player */}
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

export default App;
