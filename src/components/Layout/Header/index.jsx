import HeaderNavigation from "/src/components/Navigation/Header/index.jsx";
import logo from "../../../assets/Logo/holidazeLogo.webp";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-30 w-full md:w-[200px] md:h-screen bg-primary shadow-lg">
      <div className="bg-primary py-4 px-4 md:px-10 flex md:flex-col  lg:flex-col justify-between md:items-center lg:items-center lg:justify-center md:space-y-4 lg:space-y-4">
        <Link to="/" className="flex md:flex-col justify-center items-center">
          <img
            src={logo}
            alt="The logo of Holidaze"
            className="rounded-full"
            style={{ width: "75px", height: "75px" }}
          />
          <span className="text-white font-condensed uppercase text-4xl  xxs:ml-4">
            Holidaze.
          </span>
        </Link>
        <div className="flex md:flex-col lg:flex-col justify-end md:justify-center lg:justify-center items-center">
          <HeaderNavigation />
        </div>
      </div>
    </header>
  );
};

export default Header;