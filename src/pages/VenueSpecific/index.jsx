import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchVenues } from "../../hooks/useFetchVenues";
import { fetchProfiles } from "../../utils/fetchProfiles";
import Carousel from "../../components/Carousel";
import { FaStar } from "react-icons/fa";
import DefaultButton from "../../components/Buttons/DefaultButton";
import defaultImage from "../../assets/Images/defaultProfile.webp";
import BookVenue from "../../components/Booking";

const StarIcon = () => <FaStar className="text-primary text-2xl " />;

const VenueSpecificPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { venues, isLoading, error } = useFetchVenues();
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [showBookings, setShowBookings] = useState(false);

  useEffect(() => {
    if (venues.length > 0) {
      const venue = venues.find((p) => p.id.toString() === id);
      if (venue) {
        document.title = venue.name + " | Holidaze";
        // console.log("Fetched venue data:", venue);
      }
    }
  }, [venues, id]);

  const navigateToOwnerProfile = async () => {
    try {
      const profileData = await fetchProfiles(
        encodeURIComponent(venue.owner.name)
      );
      setProfile(profileData);
      navigate(`/profiles/${encodeURIComponent(venue.owner.name)}`);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfileError(error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const venue = venues.find((p) => p.id.toString() === id);
  if (!venue) {
    return <div>Product not found</div>;
  }

  const venueImages = venue.media.map((img, index) => (
    <img
      key={index}
      src={img.url}
      alt={img.alt || "Venue image"}
      style={{ height: "400px", width: "100%", objectFit: "cover" }}
    />
  ));

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
    <div className="flex flex-col px-2 bg-white gap-2">
      <h1 className="text-4xl text-start font-condensed p-2">{venue.name}</h1>

      <Carousel>{venueImages}</Carousel>

      <div className="bg-primary p-4 text-cedar rounded-sm mt-2 grid grid-cols-1 md:grid-cols-6">
        <div className="col-span-1 md:col-span-3">
          <h2 className="text-2xl px-2 capitalize">{venue.description}</h2>
          <p className="text-lg px-2">
            {venue.location.city}, {venue.location.country}
          </p>
        </div>
        <div className="col-span-1 md:col-span-3">
          <p className="md:text-end text-lg px-2">
            Listed: {formattedDate(venue.created)}
          </p>
          <p className="md:text-end text-lg px-2">
            Updated: {formattedDate(venue.created)}
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
              <div className="capitalize">
                {venue.location.address}, {venue.location.city},{" "}
                {venue.location.country}
              </div>
            </li>
          </ul>
        </div>
        <div className="px-2 flex flex-col flex-grow">
          <div className=" p-4 shadow-sm shadow-cedar rounded-md flex-grow">
            <p className="text-4xl font-condensed mb-2 text-center py-2">
              Book Venue
            </p>
            <BookVenue venue={venue} />
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-sm px-2 text-start text-lg font-medium mb-8 ">
        <DefaultButton onClick={toggleBookings}>
          {showBookings ? "Hide" : "View"} Previous Bookings
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
    </div>
  );
};

export default VenueSpecificPage;
