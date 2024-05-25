import { Helmet } from "react-helmet";
import imageOne from "../../assets/Images/beachTwo.webp";
import imageTwo from "../../assets/Images/beachOne.webp";
import ContactSchema from "../../components/Containers/ContactContainer";
import BackToTopButton from "../../components/Buttons/BackToTop";

/**
 * AboutPage component that displays information about the Holidaze platform and a contact form.
 *
 * @returns {JSX.Element} The rendered AboutPage component.
 */
const AboutPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-1 items-stretch bg-white text-cedar">
      <Helmet>
        <title>About / Contact | Holidaze</title>
      </Helmet>
      <div className="col-span-6 bg-primary">
        <h2 className="text-4xl font-medium underline font-condensed text-center">
          About Us
        </h2>
        <p className="font-sans text-lg md:text-xl px-8 md:px-4 py-2 mx-auto md:max-w-72">
          Holidaze is an innovative and user-centric online platform that
          revolutionizes the way people plan and experience their vacations. At
          Holidaze, we believe that every holiday should be memorable,
          personalized, and seamless from start to finish. We offer an extensive
          selection of unique accommodations, from cozy mountain cabins and
          beachfront villas to urban apartments and countryside retreats,
          catering to every traveler`s taste and budget.
        </p>
        <div>
          <img
            src={imageOne}
            alt="Sunglasses in the sand"
            className="rounded-sm w-full h-998 object-cover mt-4 mb-4"
          />
        </div>
        <p className="font-sans text-lg md:text-xl px-8 md:px-4 py-2 mx-auto md:max-w-72">
          What sets Holidaze apart is our commitment to authenticity and local
          experiences. We partner with local hosts who not only provide a place
          to stay but also share insights into their community`s culture,
          cuisine, and hidden gems. This approach allows travelers to immerse
          themselves in the local culture, creating more meaningful and
          enriching experiences.
        </p>
        <p className="font-sans text-lg md:text-xl px-8 md:px-4 py-2 mx-auto md:max-w-72">
          Holidaze is not just about booking a place to stay; it is about
          crafting the entire holiday experience. Our platform offers intuitive
          planning tools, personalized recommendations, and exclusive deals on
          local attractions and activities. Whether you`re seeking adventure,
          relaxation, cultural immersion, or all of the above, Holidaze makes it
          easy to curate your perfect holiday.
        </p>
        <div>
          <img
            src={imageTwo}
            alt="Sunglasses in the sand"
            className="rounded-sm w-full h-998 object-cover mt-4 mb-4"
          />
        </div>
        <p className="font-sans text-lg md:text-xl px-8 md:px-4 py-2 mx-auto md:max-w-72 mb-4">
          People should choose Holidaze for our unparalleled blend of diverse
          accommodation options, local expertise, and personalized service.
          We`re committed to ensuring that every trip booked through our
          platform is not just a vacation but a collection of unforgettable
          experiences, making Holidaze the go-to destination for discerning
          travelers seeking more from their holidays.
        </p>
      </div>
      <div className="col-span-1 md:col-start-3 md:col-span-2 p-4 justify-center items-center">
        <h3 className="text-4xl font-condensed text-center">Contact</h3>
        <p className="font-sans text-lg md:text-xl px-8 md:px-4 py-2 mx-auto md:max-w-72">
          Have a question or need assistance? Reach out to us via the form
          below.
        </p>
        <ContactSchema />
      </div>
      <BackToTopButton />
    </div>
  );
};

export default AboutPage;
