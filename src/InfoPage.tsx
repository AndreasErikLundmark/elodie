import bgMain from "../src/assets/images/lakeGold.png";
import Navbar from "./assets/navbar/navbar";

export default function InfoPage() {
  return (
    <div
      id="mainDiv"
      // ref={divRef}
      className="w-full h-screen bg-[#f8f8f8] relative "
      style={{
        backgroundImage: `url(${bgMain})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="header flex justify-center items-center py-4">
        <Navbar isMusicPlaying={false} onPlayPause={null} audioSource={null} />
      </div>
    </div>
  );
}
