import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchSingleVenue } from "../../hooks/useFetchSingleVenue";
import BackToTopButton from "../../components/Buttons/BackToTop";
import Carousel from "../../components/Carousel";
import { FaStar } from "react-icons/fa";
import DefaultButton from "../../components/Buttons/DefaultButton";
import defaultImage from "../../assets/Images/defaultProfile.webp";
import BookVenue from "../../components/Booking";
import HeartIcon from "../../components/FavoriteIcon";

const StarIcon = () => <FaStar className="text-primary text-2xl " />;

/**
 * VenueSpecificPage component that displays detailed information about a specific venue.
 *
 * @returns {JSX.Element} The rendered VenueSpecificPage component.
 */
const VenueSpecificPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { venue, isLoading, error } = useFetchSingleVenue(id);
  const [showBookings, setShowBookings] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [canViewBookings, setCanViewBookings] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("userName"));
    setCanViewBookings(!!localStorage.getItem("userName"));
  }, []);

  const navigateToOwnerProfile = () => {
    if (!isLoggedIn) {
      navigate("/register");
      return;
    }
    if (!venue.owner) {
      console.error("No owner information available for this venue.");
      return;
    }
    navigate(`/profiles/${encodeURIComponent(venue.owner.name)}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!venue) {
    return <div>Loading venue information...</div>;
  }

  const venueImages =
    venue.media?.map((img, index) => (
      <img
        key={index}
        src={img.url || defaultImage}
        alt={img.alt || "Venue image"}
        style={{ height: "400px", width: "100%", objectFit: "cover" }}
        onError={(e) => (e.target.src = defaultImage)}
      />
    )) || [];

  const formattedDate = (created) => {
    return created
      ? new Date(created).toLocaleDateString()
      : "No date provided";
  };

  const ratingStars =
    venue.rating > 0 ? (
      Array.from({ length: venue.rating }, (_, index) => (
        <StarIcon key={index} />
      ))
    ) : (
      <span className="text-md">No Rating</span>
    );

  const toggleBookings = () => {
    setShowBookings(!showBookings);
  };

  return (
    <div className="flex flex-col px-2 bg-white gap-2 relative">
      <h1 className="text-4xl text-start font-condensed p-2 w-full break-words">
        {venue.name}
      </h1>
      <div className="absolute top-2 right-2 text-4xl p-2 flex flex-wrap gap-2 items-center">
        {isLoggedIn && (
          <>
            <p className="text-lg hidden md:block">Add to Favorites</p>
            <HeartIcon venue={venue} />
          </>
        )}
      </div>
      <Carousel>{venueImages}</Carousel>
      <div className="bg-primary p-4 text-cedar rounded-sm mt-2 grid grid-cols-1 md:grid-cols-6">
        <div className="col-span-1 md:col-span-3">
          <h2 className="text-2xl px-2 capitalize w-full break-words">
            {venue.description}
          </h2>
          <p className="text-lg px-2">
            {venue.location?.city || "City not available"},{" "}
            {venue.location?.country || "Country not available"}
          </p>
        </div>
        <div className="col-span-1 md:col-span-3">
          <p className="md:text-end text-lg px-2">
            Listed: {formattedDate(venue.created)}
          </p>
          <p className="md:text-end text-lg px-2">
            Updated: {formattedDate(venue.updated)}
          </p>
        </div>
        <div
          className="col-span-1 md:col-span-6 flex items-center gap-2 mt-4 hover:cursor-pointer hover:underline"
          onClick={navigateToOwnerProfile}
        >
          {venue.owner && venue.owner.avatar ? (
            <img
              src={venue.owner.avatar.url}
              alt={venue.owner.avatar.alt || "Owner avatar"}
              onError={(e) => (e.target.src = defaultImage)}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <img
              src={defaultImage}
              alt="Default avatar"
              className="w-10 h-10 rounded-full"
            />
          )}
          <p className="font-condensed text-xl capitalize">
            Managed by: {venue.owner.name}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-2">
        <div className="bg-white px-2 flex flex-col flex-grow">
          <p className="text-4xl font-condensed mb-2">Facilities</p>
          <ul className="text-lg flex-grow">
            <li className="border-b border-primary last:border-b-0 flex flex-row gap-4 py-1">
              <p className="font-medium">Price / Night:</p>
              <div>${venue.price}</div>
            </li>
            <li className="border-b border-primary last:border-b-0 flex flex-row gap-4 py-1">
              <p className="font-medium">Max Guests:</p>
              <div>{venue.maxGuests} Guests</div>
            </li>
            <li className="border-b border-primary last:border-b-0 flex flex-row gap-4 py-1">
              <p className="font-medium">Rating:</p>
              <div className="flex flex-wrap ">{ratingStars}</div>
            </li>
            <li className="border-b border-primary last:border-b-0 flex flex-row gap-4 py-1">
              <p className="font-medium">Booked:</p>
              <div className="">{venue._count.bookings}</div>
            </li>
            <li className="border-b border-primary last:border-b-0 flex flex-row gap-4 py-1">
              <p className="font-medium">Breakfast:</p>
              <div>
                {venue.meta.breakfast
                  ? "Breakfast Included"
                  : "Breakfast Not Included"}
              </div>
            </li>
            <li className="border-b border-primary last:border-b-0 flex flex-row gap-4 py-1">
              <p className="font-medium">Parking:</p>
              <div>
                {venue.meta.parking
                  ? "Parking Available"
                  : "No Parking Available"}
              </div>
            </li>
            <li className="border-b border-primary  last:border-b-0 flex flex-row gap-4 py-1">
              <p className="font-medium">Pets:</p>
              <div> {venue.meta.pets ? "Pets Allowed" : "No Pets Allowed"}</div>
            </li>
            <li className="border-b border-primary  flex flex-row gap-4 py-1">
              <p className="font-medium">Wifi:</p>
              <div>{venue.meta.wifi ? "Wifi Included" : "No Wifi"}</div>
            </li>
            <li className="border-b border-primary mb-4 flex flex-row gap-4 py-1">
              <p className="font-medium">Address:</p>
              <div className="capitalize w-full break-words overflow-hidden">
                {venue.location.address}, {venue.location.city},{" "}
                {venue.location.country}
              </div>
            </li>
          </ul>
        </div>
        <div className="px-2 flex flex-col flex-grow">
          <div className=" p-2 shadow-sm shadow-cedar rounded-md flex-grow">
            <p className="text-4xl font-condensed mb-2 text-center ">
              Book Venue
            </p>
            <BookVenue venue={venue} />
          </div>
        </div>
      </div>
      {isLoggedIn &&
      canViewBookings &&
      venue.owner.name === localStorage.getItem("userName") ? (
        <div className="mt-4 rounded-sm px-2 text-start text-lg font-medium mb-8 ">
          <DefaultButton onClick={toggleBookings}>
            {showBookings ? "Hide" : "View"} Bookings
          </DefaultButton>
          {showBookings && (
            <ul className="mt-2 text-left">
              {venue.bookings && venue.bookings.length > 0 ? (
                venue.bookings.map((booking, index) => (
                  <li key={index} className="border-b border-primary py-2">
                    <p>
                      <strong>Guest:</strong> {booking.customer.name}
                    </p>
                    <p>
                      <strong>From:</strong>
                      {new Date(booking.dateFrom).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>To:</strong>
                      {new Date(booking.dateTo).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Guests:</strong> {booking.guests}
                    </p>
                  </li>
                ))
              ) : (
                <li className="p-4 text-2xl">No bookings found.</li>
              )}
            </ul>
          )}
        </div>
      ) : (
        <div className="mt-4 rounded-sm px-2 text-start text-lg font-medium mb-8 ">
          <p className="text-center">
            You dont have permission to view these bookings
          </p>
        </div>
      )}
      <BackToTopButton />
    </div>
  );
};

export default VenueSpecificPage;
