import { useState, useEffect } from "react";
import bgMain from "../src/assets/images/lakeGold.webp";
import Navbar from "./assets/navbar/navbar";

export default function InfoPage() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = bgMain;

    const done = () => setIsAppLoading(false);

    img.onload = done;
    img.onerror = done;
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
          isAppLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="loading loading-ring loading-lg text-white"></div>
      </div>

      <div
        id="mainDiv"
        className="w-full h-screen relative flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${bgMain})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="header flex justify-center items-center py-4 absolute top-0 w-full overflow-visible">
          <Navbar
            isMusicPlaying={false}
            onPlayPause={null}
            audioSource={null}
          />
        </div>

        <div className="textBox w-[300px] h-[600] bg-gray-950 bg-opacity-90 text-sm gap-4 rounded-md text-gray-300 p-4 shadow-none border-solid border-1 border-black transition-opacity duration-500 ease-in-out">
          <p>
            élodie was an Indie-Jazz-Emo band from Skellefteå - Sweden. During
            their active years they released two records: "It's Too Bad You're
            Leaving" and "At The End Of The Line". The latter, a dark and mellow
            EP sold at their final concert, served as a kind of quiet farewell
            to the band's brief, intense, and haunting story.
          </p>
          <br />
          <p>
            There are also other recordings on here like 'Ivorie' and the
            'Rumble road' session; containing and pre productions and tunes
            never properly released.
          </p>
          <br />
          <p>Thank you for listening! now & then</p>
          <br />
          <ul>
            Members:
            <li>Henrik Wiklund - Bas Guitar</li>
            <li>Simon Jonsson - Keyboards</li>
            <li>Evelina Hägglund - Vocals</li>
            <li>Peder Zingmark - Drums</li>
            <li>Andreas Lundmark - Guitar</li>
          </ul>
        </div>
      </div>
    </>
  );
}
