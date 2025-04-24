export default function ScrollDownButton(){

    const scrollFoldOut = (direction:string) => {
        const container = document.getElementById("foldOut");
        if (!container) return;
      
        const scrollAmount = 60; // Adjust this for more/less scroll per click
      
        if (direction === "down") {
          container.scrollBy({ top: scrollAmount, behavior: "smooth" });
        } else {
          container.scrollBy({ top: -scrollAmount, behavior: "smooth" });
        }
      };

    return(
        <button
        onClick={() => scrollFoldOut("down")}
        className="bg-white p-1 rounded-full shadow"
      >
        scroll
      </button>
    );
}