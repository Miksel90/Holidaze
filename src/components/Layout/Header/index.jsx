import HeaderNavigation from "/src/components/Navigation/Header/index.jsx";
import logo from "../../../assets/Logo/holidazeLogo.webp";
import ProfileIcon from "../../ProfileIcon";
import SomeContainer from "../../Containers/SomeContainer/index.jsx";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-30 w-full md:w-[180px] md:h-screen bg-primary shadow-lg ">
      <div className=" py-4 px-4 gap-8 md:px-10 flex md:flex-col justify-between items-center lg:justify-center md:space-y-4  ">
        <Link to="/" className="flex md:flex-col justify-center items-center">
          <img
            src={logo}
            alt="The logo of Holidaze"
            className="rounded-full shadow-cedar shadow-lg"
            style={{ width: "75px", height: "75px" }}
          />
          <span className="text-cedar font-condensed uppercase text-4xl font-semibold xxs:ml-4">
            Holidaze.
          </span>
        </Link>
        <div>
          <ProfileIcon />
        </div>
        <div className="flex md:flex-col  justify-end md:justify-center  items-center">
          <HeaderNavigation />
        </div>
      </div>
      <div className="hidden lg:block mt-15">
        <SomeContainer />
      </div>
    </header>
  );
};

export default Header;
