import Logo from "../../../assets/Logo/holidazeLogo.webp";
import FooterNavigation from "/src/components/Navigation/Footer/index.jsx";

const Footer = () => {
  return (
    <footer className="font-sans shadow-md w-full bottom-0 flex md-flex-row">
      <div>
        <div>
          <img
            src={Logo}
            alt="The logo of Holidaze"
            style={{ width: "75px", height: "75px" }}
            className="rounded-full"
          />
          <div className="">
            <p className=" ">
              Welcome to Holidaze, the ultimate destination for finding the
              perfect holiday venue! We are a one-stop-site for all your holiday
              needs, offering a wide range of venues around the globe. Skiiing,
              beaches, shopping and cabins.
            </p>
            <p className="">
              Thank you for choosing Holidaze, and we hope you enjoy your stay!
            </p>
          </div>
        </div>
        <div>
          <FooterNavigation />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
