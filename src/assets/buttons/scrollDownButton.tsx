import { RiScrollToBottomFill } from "react-icons/ri";

export default function ScrollDownButton() {
  const scrollFoldOut = (direction: string) => {
    const container = document.getElementById("foldOut");
    if (!container) return;

    const scrollAmount = 120; // Adjust this for more/less scroll per click

    if (direction === "down") {
      container.scrollBy({ top: scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ top: -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={() => scrollFoldOut("down")}
      className=" bg-transparent border-none text-gray-300 text-2xl p-2 rounded-full mt-20 hover:text-gray-600 transition duration-300 opacity-70"
    >
      <div className="flex flex-col gap-16">
        <RiScrollToBottomFill />
      </div>
    </button>
  );
}
