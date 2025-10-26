// import { useState, useRef, useEffect } from "react";
// import "./App.css";
// // import bg from "../src/assets/images/atendbg.png";
// import bgMain from "../src/assets/images/lakedarkblue.png";
// import Navbar from "./assets/navbar/navbar";
// import { useMutation } from "@tanstack/react-query";
// import { fetchSong } from "./assets/api/api";

// // const GET_URL = "https://audiostreamer-697604347968.us-central1.run.app/audio/";
// const OtherTunes = () => {
//   const originalButtonList = [
//     { id: 1, title: "1. Intro", song: "01%20Intro.mp3" },
//     {
//       id: 2,
//       title: "2. Kill One More Day",
//       song: "02%20Kill%20One%20More%20Day.mp3",
//     },
//     { id: 3, title: "3. Mandarine", song: "03%20Jannowitzbrücke%20first.mp3" },
//     { id: 4, title: "4. Timeless", song: "04%20Timeless.mp3" },
//     { id: 5, title: "5. Bwana Tembo", song: "05%20Bwana%20Tembo.mp3" },
//     { id: 6, title: "6. See you", song: "06%20See%20You.mp3" },
//     {
//       id: 7,
//       title: "7. Marshmallow Man",
//       song: "07%20Marshmallow%20Man%20first.mp3",
//     },
//     { id: 8, title: "8. Mandarine", song: "08%20Mandarine.mp3" },
//     {
//       id: 9,
//       title: "9. Le Soleil Brille",
//       song: "09%20Le%20Soleil%20Brille.mp3",
//     },
//   ];

//   const rumbleList = [
//     { id: 10, title: "1. Marshmallow Man", song: "01%20Marshmallow%20man.mp3" },
//     { id: 11, title: "2. Jannowitzbrücke", song: "02%20Jannowitzbrücke.mp3" },
//     { id: 12, title: "3. Cosmonaut", song: "03%20Cosmonaut.mp3" },
//   ];

//   const lastList = [{ id: 13, title: "1. Epilogue", song: "epilouge.wav" }];

//   const [activeButton, setActiveButton] = useState<number | null>(null);
//   const [isMusicPlaying, setIsMusicPlaying] = useState(false);
//   const [audioSource, setAudioSource] = useState<string | null>(null);
//   const [songIndex, setSongIndex] = useState<number>(-1);

//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const divRef = useRef<HTMLDivElement>(null);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [opacity, setOpacity] = useState(0);

//   const buttonList = originalButtonList.map((button) => (
//     <li
//       key={button.id}
//       className="m-1 text-gray-900 hover:text-gray-200 transition duration-300"
//     >
//       <button
//         className={`radioButton ${songIndex === button.id - 1 ? "font-bold text-black" : ""} transition duration-100`}
//         onClick={() => {
//           setActiveButton(button.id);
//           // setAudioSource(button.song);
//           setSongIndex(button.id - 1);
//           setIsMusicPlaying(true);
//           mutation.mutate({ song_name: button.song });
//         }}
//       >
//         {button.title}
//       </button>
//     </li>
//   ));

//   const buttonList2 = rumbleList.map((button) => (
//     <li
//       key={button.id}
//       className="m-1 text-gray-900 hover:text-gray-200 transition duration-300"
//     >
//       <button
//         className={`radioButton ${songIndex === button.id - 1 ? "font-bold text-black" : ""} transition duration-100`}
//         onClick={() => {
//           setActiveButton(button.id);
//           // setAudioSource(button.song);
//           setSongIndex(button.id - 1);
//           setIsMusicPlaying(true);
//           mutation.mutate({ song_name: button.song });
//         }}
//       >
//         {button.title}
//       </button>
//     </li>
//   ));

//   const buttonList3 = lastList.map((button) => (
//     <li
//       key={button.id}
//       className="m-1 text-gray-700 hover:text-gray-200 transition duration-300 text-base"
//     >
//       <button
//         className={`radioButton ${songIndex === button.id - 1 ? "font-bold text-black" : ""} transition duration-100`}
//         onClick={() => {
//           setActiveButton(button.id);
//           // setAudioSource(button.song);
//           setSongIndex(button.id - 1);
//           setIsMusicPlaying(true);
//           mutation.mutate({ song_name: button.song });
//         }}
//       >
//         {button.title}
//       </button>
//     </li>
//   ));

//   const toggleAudio = () => {
//     if (audioRef.current) {
//       if (audioRef.current.paused) {
//         audioRef.current.play();
//       } else {
//         audioRef.current.pause();
//       }
//       setIsMusicPlaying((prevState) => !prevState);
//     }
//   };

//   const handleSongEnd = () => {
//     const nextSongIndex = (songIndex + 1) % originalButtonList.length;
//     const nextSong = originalButtonList[nextSongIndex]?.song;

//     console.log("next song is:", nextSongIndex, nextSong);

//     if (nextSong) {
//       setSongIndex(nextSongIndex);
//       // setAudioSource(nextSong);
//       mutation.mutate({ song_name: nextSong });
//     } else {
//       console.error(
//         "Next song is undefined! Something went wrong with the song list."
//       );
//     }
//   };

//   useEffect(() => {
//     if (audioSource && audioRef.current) {
//       audioRef.current.load();
//       audioRef.current.play();
//     }
//   }, [audioSource]);

//   const mutation = useMutation({
//     mutationFn: async ({ song_name }: { song_name: string }) => {
//       return await fetchSong(song_name);
//     },
//     onSuccess: (responseData) => {
//       setAudioSource(responseData);
//     },
//     onError: (error) => {
//       console.error("Error fetching song:", error);
//     },
//   });

//   return (
//     <div
//       id="mainDiv"
//       ref={divRef}
//       className="w-full h-screen bg-[#f8f8f8] relative "
//       style={{
//         backgroundImage: `url(${bgMain})`,
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//       }}
//       onMouseMove={(e) => {
//         if (!divRef.current) return;
//         const div = divRef.current;
//         const rect = div.getBoundingClientRect();
//         setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
//       }}
//       onMouseEnter={() => setOpacity(0.3)}
//       onMouseLeave={() => setOpacity(0)}
//     >
//       <div
//         className="pointer-events-none absolute inset-0 transition duration-300 "
//         style={{
//           opacity,
//           background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.8), rgba(255,255,255,0) 50%)`,
//         }}
//       />

//       <div className="header flex justify-center items-center py-4">
//         <Navbar
//           isMusicPlaying={isMusicPlaying}
//           onPlayPause={toggleAudio}
//           audioSource={audioSource}
//         />
//       </div>

//       <div className="flex flex-col items-center h-full space-y-3 -mt-6 z-10">
//         <div className="flex flex-row gap-6">{/* <ButtonFold /> */}</div>

//         <div>
//           <h2 className="text-black text-lg font-bold p-2 flex items-center">
//             Rumble Road
//             {mutation.isPending && (
//               <div className="ml-2">
//                 <div className="loading loading-ring loading-xs text-gray-300" />
//               </div>
//             )}
//           </h2>
//           <ul className="radioButtons">{buttonList2}</ul>
//         </div>

//         <div>
//           <h2 className="text-black text-lg font-bold p-2 flex items-center">
//             Ivorie
//             {mutation.isPending && (
//               <div className="ml-2">
//                 <div className="loading loading-ring loading-xs text-gray-300" />
//               </div>
//             )}
//           </h2>
//           <ul className="radioButtons">{buttonList}</ul>
//         </div>

//         <div>
//           <h2 className="text-black text-lg font-bold p-2 flex items-center">
//             Postlude
//           </h2>
//           <ul className="radioButtons">{buttonList3}</ul>
//         </div>
//       </div>

//       <footer className="bg-white w-full hidden">
//         <div className="audio-player hidden fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
//           <audio
//             ref={audioRef}
//             controls
//             src={audioSource || undefined}
//             autoPlay={isMusicPlaying}
//             onPlay={() => setIsMusicPlaying(true)}
//             onPause={() => setIsMusicPlaying(false)}
//             onEnded={handleSongEnd}
//           >
//             Your browser does not support the audio element.
//           </audio>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default OtherTunes;
