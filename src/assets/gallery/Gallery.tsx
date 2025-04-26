import "react-photo-album/rows.css";
import p1 from "../images/elodie blue2.jpg";
import p11 from "../images/blue/17.jpg";
import p12 from "../images/blue/virvelbla.jpg";
import p2 from "../images/elodieblue.jpg";
import p13 from "../images/blue/evebla.jpg";
import p14 from "../images/blue/ee4.jpg";
import p4 from "../images/elodiePinkerton.jpg";
import p5 from "../images/elodiePinkerton2.jpg";
import p6 from "../images/elodieKvarnbyn.jpg";
import p7 from "../images/elodieDrums.jpg";
import p8 from "../images/elodieKvarn2.jpg";
import p9 from "../images/blue/egrill.jpg";
import p10 from "../images/kvarn/kvarnhenkp.jpg";
import p16 from "../images/kvarn/kvarnpeder.jpg";
import p17 from "../images/kvarn/kvarnpewalk.jpg";
import p18 from "../images/kvarn/kvarnsmoke.jpg";
import p19 from "../images/kvarn/kvarnlampa.jpg";

const images = [
  p1,
  p11,
  p12,
  p13,
  p2,
  p14,
  p4,
  p5,
  p6,
  p7,
  p8,
  p9,
  p10,
  p16,
  p17,
  p18,
  p19,
];

export default function Gallery() {
  return (
    <>
      <div className="flex flex-col gap-4 p-2 bg-slate-900 bg-opacity-50 shadow-md">
        {images.map((img, index) => (
          <div
            key={index}
            className="p-2 shadow-md bg-[#fef8f2] rounded h-[21rem] w-[21rem] overflow-hidden"
          >
            <img
              src={img}
              alt={`elodie-pic${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>
    </>
  );
}
