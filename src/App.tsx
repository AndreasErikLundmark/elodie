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
      {/* Header */}
      <div className="header flex justify-center items-center py-4">
        <h1 className="text-black">élodie</h1>
      </div>
  
      {/* Main content */}
      <div className="flex flex-col justify-center items-center h-full space-y-6">
        {/* Cover box */}
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
  
        {/* Buttons under the cover box */}
        <div className="join flex space-x-4 bg-white">
          <button className="join-item btn bg-white border-none p-4 hover:bg-gray-300 text-black">#1</button>
          <button className="join-item btn bg-white border-none p-4 hover:bg-gray-300 text-black">#2</button>
          <button className="join-item btn bg-white border-none p-4 hover:bg-gray-300 text-black">#3</button>
          <button className="join-item btn bg-white border-none p-4 hover:bg-gray-300 text-black">#4</button>
          <button className="join-item btn bg-white border-none p-4 hover:bg-gray-300 text-black">#5</button>
        </div>
      </div>
    </div>
  );
  

  
}

export default App
