import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import { TiSocialGooglePlus } from "react-icons/ti";

const SomeContainer = () => {
  const icons = [
    FaFacebookF,
    FaTwitter,
    TiSocialGooglePlus,
    FaInstagram,
    FaLinkedinIn,
    FaTiktok,
  ];
  const iconClasses = "text-white text-5xl border-2 border-white p-1";

  return (
    <div className="flex flex-wrap  p-2 justify-center py-8">
      {icons.map((Icon, index) => (
        <div key={index}>
          <Icon className={iconClasses} />
        </div>
      ))}
    </div>
  );
};
export default SomeContainer;
