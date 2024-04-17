import { useState, useEffect } from "react";
import background1 from "../../assets/Images/bg1.webp";
import background2 from "../../assets/Images/bg2.webp";
import background3 from "../../assets/Images/bg3.webp";
import DefaultButton from "../Buttons/DefaultButton";

function BrowseContainer() {
  const backgrounds = [background1, background2, background3];
  const [currentBackground, setCurrentBackground] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground(
        (currentBackground) => (currentBackground + 1) % backgrounds.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgrounds[currentBackground]})`,
        height: "60vh",
        backgroundSize: "cover",
        transition: "background-image 3s ease-in-out",
      }}
    >
      <div className="flex flex-col justify-between h-full p-4 gap-8 items-center">
        <h2 className="text-white text-shadow-black text-center font-condensed text-3xl capitalize font-bold rounded-sm py-5 underline">
          Find your paradise today
        </h2>
        <DefaultButton to="/venues">Browse</DefaultButton>
      </div>
    </div>
  );
}

export default BrowseContainer;
