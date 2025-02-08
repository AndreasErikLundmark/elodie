export default function Navbar() {
    return (
      <div className="w-full bg-transparent text-black text-lg">
        {/* Navbar container */}
        <div className="relative flex justify-between items-center py-4 px-8">
          
          {/* Centered "élodie" text with absolute positioning */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-black text-xl font-bold">élodie</h1>
          </div>
  
          {/* Navbar menu items (right aligned) */}
          <div className="flex-none ml-auto">
            <ul className="menu menu-horizontal shadow-none">
              {/* <li><a>Link</a></li> */}
              <li>
                <details>
                  <summary>menu</summary>
                  <ul className="bg-transparent text-black p-2 shadow-none border-solid border-1 border-black">
                    <li><a>About</a></li>
                    <li><a>Gallery</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  