import "react-photo-album/rows.css";
import p1 from "../images/16.jpg";
import p11 from "../images/18.jpg";
import p12 from "../images/eboviken1.jpg";
import p2 from "../images/erun.jpg";
import p3 from "../images/eboviken3.jpg";
import p13 from "../images/eboviken4.jpg";
import p14 from "../images/eboviken5.jpg";
import p4 from "../images/eboviken6.jpg";
import p5 from "../images/eboviken7.jpg";
import p6 from "../images/promo1.jpg";
import p7 from "../images/elodieguitar.jpg";
import p20 from "../images/andguff3.jpg";
import p21 from "../images/andreasguffu.jpg";
import p22 from "../images/mullis1.jpg";
import p23 from "../images/mullis2.jpg";

const images = [
  p7,
  p20,
  p21,
  p1,
  p11,
  p12,
  p2,
  p3,
  p13,
  p14,
  p4,
  p5,
  p6,
  p22,
  p23,
];

export default function Gallery2() {
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
