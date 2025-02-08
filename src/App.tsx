import './App.css'
import bg from '../src/assets/images/atendbg.png'

function App() {
  const coverAttheEnd = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };
  
  return (
    <div className="w-full h-screen bg-white">
      <div className="header flex justify-center items-center">
        <h1 className="text-black">élodie</h1>
      </div>
      <div className="main flex justify-center items-center h-full w-full">
        {/* Box with background image, padding around the background, and border outside */}
        <div className="h-[300px] w-[300px] border-4 border-solid border-black p-4">
          <div
            className="h-full w-full bg-cover"
            style={coverAttheEnd}
          >
            {/* Content inside the padded background */}
            <div className="text-white p-4">
              <h2 className="text-5xl">At the End</h2>
              <p className="text-2xl">by élodie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}

export default App
