export default function Birds({ isPlaying }) {
  return (
    <div>
      {/* Bird container 1 */}
      <div
        className={`bird-container bird-container-one ${isPlaying ? "animate" : ""}`}
      >
        <div className="bird bird-one"></div>
      </div>

      {/* Bird container 2 */}
      <div
        className={`bird-container bird-container-two ${isPlaying ? "animate" : ""}`}
      >
        <div className="bird bird-two"></div>
      </div>

      {/* Bird container 3 */}
      <div
        className={`bird-container bird-container-three ${isPlaying ? "animate" : ""}`}
      >
        <div className="bird bird-three"></div>
      </div>

      {/* Bird container 4 */}
      <div
        className={`bird-container bird-container-four ${isPlaying ? "animate" : ""}`}
      >
        <div className="bird bird-four"></div>
      </div>
    </div>
  );
}
