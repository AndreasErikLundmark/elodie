import "react-photo-album/rows.css";
import p1 from "../images/elodie003.jpg";

const images = [p1];

export default function Gallery3() {
  return (
    <>
      <div className="flex flex-col gap-4 p-2 bg-slate-900 bg-opacity-50 shadow-md">
        {images.map((img, index) => (
          <div
            key={index}
            className="p-2 shadow-md bg-[#fef8f2] rounded overflow-hidden"
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
