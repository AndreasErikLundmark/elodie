import { useState } from "react";

export function ButtonFold() {
  const [buttonText, setButtonText] = useState(">");
  const fadeIn = () => {
    const element = document.getElementById("foldOut");
    if (element)
      if (element?.classList.contains("fade-in")) {
        element.classList.remove("fade-in");
        setButtonText(symbol);
      } else {
        element.classList.add("fade-in");
        setButtonText(symbolOut);
      }
  };
  const symbol = ">";
  const symbolOut = "v";
  return (
    <button
      className="ButtonFold shadow-md text-red-500 text-2xl font-bold hover:font-extrabold"
      onClick={fadeIn}
    >
      {buttonText}
    </button>
  );
}
