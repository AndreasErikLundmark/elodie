import "react-photo-album/rows.css";
import p1 from "../images/elodie blue2.jpg";
import p2 from "../images/elodieblue.jpg";
import p3 from "../images/elodieguitar.jpg";
import p4 from "../images/elodiePinkerton.jpg";
import p5 from "../images/elodiePinkerton2.jpg";
import p6 from "../images/elodieKvarnbyn.jpg";
import p7 from "../images/elodieDrums.jpg";
import p8 from "../images/elodieKvarn2.jpg";

const images = [p1, p2, p3, p4, p5, p6, p7, p8];

export default function Gallery() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-900 bg-opacity-50 shadow-md">
      {images.map((img, index) => (
        <div
          key={index}
          className="p-2 shadow-md bg-[#fef8f2] rounded size-80 overflow-hidden"
        >
          <img
            src={img}
            alt={`elodie-pic${index + 1}`}
            className="w-full h-full object-cover rounded"
          />
        </div>
      ))}
    </div>
  );
}
