import { useState, useEffect } from "react";
import { useFetchProfiles } from "../../hooks/useFetchProfiles";
import DefaultButton from "../../components/Buttons/DefaultButton";
import EditProfileModal from "../../components/Modal/profile";
import ListNewVenueModal from "../../components/Modal/venue/CreateVenue";
import Carousel from "../../components/Carousel";
import { Link, useParams } from "react-router-dom";
import EditVenueModal from "../../components/Modal/venue/EditVenue";

function ProfilePage() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const { profiles, isLoading, error } = useFetchProfiles(decodedName);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isListNewVenueModalOpen, setIsListNewVenueModalOpen] = useState(false);
  const [canInteractOnProfile, setCanInteractOnProfile] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const venuesPerPage = 4;

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleOpenListNewVenueModal = () => {
    setIsListNewVenueModalOpen(true);
  };

  const handleEditVenue = (venue) => {
    setEditingVenue(venue);
  };

  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
    setIsListNewVenueModalOpen(false);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const username = localStorage.getItem("userName");
    if (username && username === decodedName) {
      setCanInteractOnProfile(true);
    }
  }, [decodedName]);

  const handleSaveChanges = (updatedData) => {
    console.log("Updated Profile Data:", updatedData);
    handleCloseModal();
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!profiles || !profiles.data) return <div>No profile data found.</div>;

  const profileData = profiles.data;
  const venueStartIndex = currentPage * venuesPerPage;
  const currentVenues = profileData.venues.slice(
    venueStartIndex,
    venueStartIndex + venuesPerPage
  );
  const totalVenues = profileData.venues.length;
  const hasMoreVenues = venueStartIndex + venuesPerPage < totalVenues;

  return (
    <div className="bg-white">
      <h1 className="text-cedar font-condensed p-4 text-2xl md:text-6xl">
        {profileData.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-1 items-stretch h-full">
        <div
          className="col-span-1 md:col-span-6 bg-primary bg-cover bg-center"
          style={{ backgroundImage: `url('${profileData.banner.url}')` }}
        >
          <div className="bg-black bg-opacity-50 p-4 flex flex-col px-8 md:flex-row w-full justify-between items-center gap-2 text-white">
            <div className="flex flex-col items-center gap-4 mb-10 md:mb-0">
              <div className="w-52 h-52 ">
                <img
                  src={profileData.avatar.url}
                  alt={profileData.avatar.alt || "Profile avatar"}
                  className="object-cover w-full h-full rounded-full shadow-cedar shadow-md"
                />
              </div>
              {canInteractOnProfile && (
                <div className="text-lg">
                  <DefaultButton onClick={handleOpenProfileModal}>
                    Edit Profile
                  </DefaultButton>
                </div>
              )}
            </div>
            <div>
              <h2 className="font-condensed text-2xl justify-start text-shadow">
                Intro
              </h2>
              <ul>
                <li className="capitalize text-lg font-sans  text-wrap">
                  {profileData.bio}
                </li>
                <li className="capitalize text-lg font-sans  text-wrap">
                  <span className="font-medium">Contact: </span>
                  {profileData.email}
                </li>
                <li className="capitalize text-lg font-sans text-wrap">
                  <span className="font-medium">Venue Manager: </span>
                  {profileData.venueManager ? "Yes" : "No"}
                </li>
                <li className="capitalize text-lg font-sans text-wrap">
                  <span className="font-medium">Bookings: </span>
                  {profileData.bookings.length}
                </li>
                <li className="capitalize text-lg font-sans text-wrap">
                  <span className="font-medium">Active Venues: </span>
                  {profileData.venues.length}
                </li>
              </ul>
              {canInteractOnProfile && (
                <div className="mt-4 text-lg">
                  <DefaultButton onClick={handleOpenListNewVenueModal}>
                    List New Venue
                  </DefaultButton>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-6 bg-primary flex-grow">
          <h3 className="text-2xl font-medium text-center py-4">
            Registered Venues
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4 px-4 py-2">
            {currentVenues.map((venue) => (
              <div
                key={venue.id}
                className="bg-white shadow rounded-lg hover:shadow-md transition-shadow p-4 "
              >
                <Link to={`/venues/${venue.id}`} className="block">
                  <h4 className="text-cedar font-medium text-xl mb-2 text-center">
                    {venue.name}
                  </h4>
                  {venue.media && venue.media.length > 0 && (
                    <img
                      src={venue.media[0].url}
                      alt={venue.media[0].alt}
                      className="w-full h-52 object-cover rounded"
                    />
                  )}
                </Link>
                <div className="text-center mt-4">
                  <div className="text-center mt-4">
                    <DefaultButton onClick={() => handleEditVenue(venue)}>
                      Edit Venue
                    </DefaultButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 mb-4">
            {currentPage > 0 && (
              <DefaultButton onClick={previousPage}>Previous</DefaultButton>
            )}
            {hasMoreVenues && (
              <DefaultButton onClick={nextPage}>Next</DefaultButton>
            )}
          </div>
        </div>
        <div className="col-span-1 md:col-span-6 bg-primary flex-grow">
          <h3 className="mt-2 text-2xl font-medium text-center flex-grow">
            Booked Venues
          </h3>
          {canInteractOnProfile &&
          profileData &&
          profileData.bookings &&
          profileData.bookings.length > 0 ? (
            <Carousel>
              {profileData.bookings.map((booking) => (
                <Link
                  key={booking.id}
                  to={`/venues/${booking.venue.id}`}
                  className="text-center "
                >
                  <div className=" py-4">
                    <h4 className="text-cedar font-normal text-2xl md:text-4xl mb-2 ">
                      {booking.venue.name}
                    </h4>
                    {booking.venue.media && booking.venue.media.length > 0 && (
                      <img
                        src={booking.venue.media[0].url}
                        alt={booking.venue.media[0].alt}
                        className="w-full h-auto max-h-52 object-cover px-10"
                      />
                    )}
                    <div className=" flex flex-row justify-center text-lg font-medium mt-2">
                      <p>
                        From: {new Date(booking.dateFrom).toLocaleDateString()}
                      </p>
                      <div className="w-4"></div>
                      <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </Carousel>
          ) : (
            <p className="text-center font-light text-xl py-8">
              {canInteractOnProfile
                ? "No bookings found."
                : "You cant see other peoples bookings, jeez!"}
            </p>
          )}
        </div>
      </div>
      <ListNewVenueModal
        isOpen={isListNewVenueModalOpen}
        onClose={handleCloseModal}
      />
      <EditProfileModal
        isOpen={isProfileModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveChanges}
        initialData={profileData}
      />
      <EditVenueModal
        isOpen={!!editingVenue}
        onClose={() => setEditingVenue(null)}
        venueData={editingVenue}
        onSave={handleSaveChanges}
      />
    </div>
  );
}

export default ProfilePage;
