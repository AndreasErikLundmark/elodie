import React from "react";

type ButtonFoldProps = {
  isOpen: boolean;
  onClick: () => void;
};

export function ButtonFold({ isOpen, onClick }: ButtonFoldProps) {
  return (
    <button
      className="
        ButtonFold
        pulsing-text-red
        text-red-500
        text-3xl
        font-semibold
        hover:font-bold
        text-shadow-2xs
      "
      onClick={onClick}
    >
      {isOpen ? "v" : ">"}
    </button>
  );
}
