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
    { Component: FaFacebookF, url: "https://www.facebook.com" },
    { Component: FaTwitter, url: "https://www.twitter.com" },
    { Component: TiSocialGooglePlus, url: "https://plus.google.com" },
    { Component: FaInstagram, url: "https://www.instagram.com" },
    { Component: FaLinkedinIn, url: "https://www.linkedin.com" },
    { Component: FaTiktok, url: "https://www.tiktok.com" },
  ];
  const iconClasses =
    "text-white text-5xl border-2 border-white p-1 hover:text-cedar hover:border-cedar ";

  return (
    <div className="flex flex-wrap p-2 justify-center py-8">
      {icons.map((icon, index) => (
        <a
          key={index}
          href={icon.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Social media link"
        >
          <icon.Component className={iconClasses} />
        </a>
      ))}
    </div>
  );
};

export default SomeContainer;
