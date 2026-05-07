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
      className="ButtonFold pulsing-text-red text-red-500 text-3xl font-semibold hover:font-bold 
      text-shadow-2xs "
      onClick={fadeIn}
    >
      {buttonText}
    </button>
  );
}
