import Logo from "../../../assets/Logo/holidazeLogo.webp";
import FooterNavigation from "/src/components/Navigation/Footer/index.jsx";

const Footer = () => {
  return (
    <footer className="bg-primary font-sans shadow-md w-full bottom-0 p-1 text-cedar text-sm md:text-md mt-1">
      <div className="bg-white p-4 rounded-sm">
        <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
          <img
            src={Logo}
            alt="The logo of Holidaze"
            style={{ width: "75px", height: "75px" }}
            className="rounded shadow-cedar shadow-lg hidden md:block"
          />
          <div className="px-2">
            <p>
              Welcome to Holidaze, the ultimate destination for finding the
              perfect holiday venue! We are a one-stop-site for all your holiday
              needs, offering a wide range of venues around the globe. Skiing,
              beaches, shopping and cabins.
            </p>
            <p className="mt-2">
              Thank you for choosing Holidaze, and we hope you enjoy your stay!
            </p>
          </div>
        </div>
        <div className="border-b-2 border-primary my-2 mt-4"></div>
        <div className="mt-5">
          <FooterNavigation />
        </div>
        <div className="border-b-2 border-primary my-2"></div>
        <div className=" flex justify-center">
          <p className="text-sm">Mikael Selstad 2024 | Powered by Noroff API</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
