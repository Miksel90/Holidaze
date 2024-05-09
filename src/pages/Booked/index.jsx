import { Helmet } from "react-helmet";
import ProfilesList from "../../components/Lists/ProfilesList";
import ReviewContainer from "../../components/Containers/ReviewsContainer";
import ImageOne from "../../assets/Images/bg1.webp";
import DefaultButton from "../../components/Buttons/DefaultButton";
import { useLocation } from "react-router-dom";

const BookedPage = () => {
  const location = useLocation();
  const {
    startDate,
    endDate,
    guestCount,
    totalPrice,
    venueName,
    venueLocation,
  } = location.state || {};

  return (
    <div>
      <Helmet>
        <title>Booking Successful | Holidaze</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-1 items-stretch">
        <div className="col-span-1 md:col-span-6  bg-primary">
          <h1 className="text-center font-condensed text-4xl p-4">
            Booking Successful
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 text-lg px-4 md:px-0">
            <h2 className=" col-span-1 md:col-span-2 md:col-start-2 font-condensed text-2xl font-medium">
              Booking Details
            </h2>
            <ul className="col-span-1 md:col-span-2 md:col-start-2 ">
              <li className="py-1">Name: {venueName}</li>
              <li>Location: {venueLocation}</li>
              <li>Start Date: {startDate && startDate.toLocaleDateString()}</li>
              <li>End Date: {endDate && endDate.toLocaleDateString()}</li>
              <li>Guest Count: {guestCount}</li>
              <li>Total Price: ${totalPrice}</li>
            </ul>
            <div className="col-span-1 md:col-span-4 py-4">
              <p className="text-center font-sans p-2 text-xl py-4  capitalize">
                Thank You For using Holidaze.
              </p>
              <div className="text-center">
                <DefaultButton to="/venues">Browse More</DefaultButton>
              </div>
            </div>
          </div>
          <img
            src={ImageOne}
            alt=" Sunset"
            className="w-full h-998 object-cover px-2 md:px-0"
          />
        </div>
      </div>
    </div>
  );
};

export default BookedPage;
