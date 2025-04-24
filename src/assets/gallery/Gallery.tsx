import "react-photo-album/rows.css";
import p1 from "../images/elodie blue2.jpg";
import p2 from "../images/elodieblue.jpg";
import p3 from "../images/elodieguitar.jpg";

export default function Gallery() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-900 shadow-md border border-opacity-90">
      <div className="p-2 shadow-md bg-[#fef8f2] rounded size-80 overflow-hidden">
        <img
          src={p1}
          alt="elodie-pic1"
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="p-2 shadow-md bg-[#fef8f2] rounded size-80 overflow-hidden">
        <img
          src={p2}
          alt="elodie-pic2"
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="p-2 shadow-md bg-[#fef8f2] rounded size-80 overflow-hidden">
        <img
          src={p3}
          alt="elodie-pic3"
          className="w-full h-full object-cover rounded"
        />
      </div>
    </div>
  );
}
