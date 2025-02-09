import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import img1 from "../images/brygga.jpg";
import img2 from "../images/brygga2.jpg";

export default function Gallery() {
  return (
    <div className="carousel w-[330px] h-[330px] mx-auto overflow-hidden rounded-lg">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full h-full">
        <img src={img1} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex justify-between items-center p-2">
          <a href="#slide4" className="btn btn-circle bg-gray-800 text-white">❮</a>
          <a href="#slide2" className="btn btn-circle bg-gray-800 text-white">❯</a>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full h-full">
        <img src={img2} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex justify-between items-center p-2">
          <a href="#slide1" className="btn btn-circle bg-gray-800 text-white">❮</a>
          <a href="#slide3" className="btn btn-circle bg-gray-800 text-white">❯</a>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full h-full">
        <img src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp" 
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex justify-between items-center p-2">
          <a href="#slide2" className="btn btn-circle bg-gray-800 text-white">❮</a>
          <a href="#slide4" className="btn btn-circle bg-gray-800 text-white">❯</a>
        </div>
      </div>

      {/* Slide 4 */}
      <div id="slide4" className="carousel-item relative w-full h-full">
        <img src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp" 
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex justify-between items-center p-2">
          <a href="#slide3" className="btn btn-circle bg-gray-800 text-white">❮</a>
          <a href="#slide1" className="btn btn-circle bg-gray-800 text-white">❯</a>
        </div>
      </div>
    </div>
  );
}
