import background from "../../assets/Images/hlidaze-3.webp";
import { Link } from "react-router-dom";
import DefaultButton from "../Buttons/DefaultButton";

function BrowseContainer() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "60vh",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col justify-between h-full p-4 gap-8 items-center">
        <h2 className="text-white text-shadow-black text-center font-condensed text-3xl capitalize font-bold rounded-sm py-5 underline">
          Find your paradise today
        </h2>
        <Link to="/venues">
          <DefaultButton>Browse</DefaultButton>
        </Link>
      </div>
    </div>
  );
}

export default BrowseContainer;
