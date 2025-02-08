import './App.css'
import bg from '../src/assets/images/atendbg.png'
import { ButtonFold } from './assets/buttons/buttonFold';
import { useState } from 'react';
import Navbar from './assets/navbar/navbar';
import Birds from './assets/birds/birds';

function App() {
  const [activeButton, setActiveButton] = useState(null);

  const coverAttheEnd = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  const buttonList = [
    { id: 1, title: "1. Be My Ghost" },
    { id: 2, title: "2. At the End of the Line" },
    { id: 3, title: "3. Mandarine #2" },
    { id: 4, title: "4. Make-up killers" },
    { id: 5, title: "5. Overload" },
  ].map((button) => (
    <li key={button.id} className="m-2 text-gray-800 hover:text-gray-500 transition duration-300">
      <button
        className={`radioButton ${activeButton === button.id ? 'font-bold text-black' : ''} transition duration-300`}
        onClick={() => {
          setActiveButton(button.id);
        }}
      >
        {button.title}
      </button>
    </li>
  ));

  return (
    <div className="w-full h-screen bg-white">
      {/* Header */}
      <div className="header flex justify-center items-center py-4">
        <Navbar />
      </div>
      <Birds />
      {/* Main content */}
      <div className="flex flex-col items-center h-full space-y-6">
        {/* Cover box */}
        <div className="min-h-[300px] min-w-[300px] max-h-[300px] max-w-[300px] border-4 border-solid border-black p-4 mt-12 flex-shrink-0">
          <div
            className="h-full w-full bg-cover"
            style={coverAttheEnd}
          >
            {/* Content inside the padded background */}
          </div>
        </div>
        <ButtonFold />

        <div className="" id="foldOut">
          <ul className="radioButtons">
            {buttonList}
          </ul>
        </div>
      </div>
    
    </div>
  );
}

export default App;
