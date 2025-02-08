import './App.css'
import bg from '../src/assets/images/atendbg.png'

function App() {
  const coverAttheEnd = {
    backgroundImage: `url(${bg})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
  };


  return (
    <>
     <div className="w-full h-screen bg-white"> 

  <div className="header flex justify-center items-center">
    <h1 className="text-black">élodie</h1> {/* Text is white to stand out on green background */}
  </div>
  <div className="main flex justify-center items-center h-full w-full">
    {/* The main content */}
  </div>
</div>


    </>
  )
}

export default App
