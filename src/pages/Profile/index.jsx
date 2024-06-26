import { useState, useEffect } from "react";
import { useFetchProfiles } from "../../hooks/useFetchProfiles";
import DefaultButton from "../../components/Buttons/DefaultButton";
import EditProfileModal from "../../components/Modal/profile";
import ListNewVenueModal from "../../components/Modal/venue/CreateVenue";
import { useDeleteBooking } from "../../hooks/useDeleteBooking";
import { Link, useParams } from "react-router-dom";
import EditVenueModal from "../../components/Modal/venue/EditVenue";
import BackToTopButton from "../../components/Buttons/BackToTop";
import FavoritesContainer from "../../components/Containers/FavoriteContainer";

/**
 * ProfilePage component that displays user profile details, their venues, bookings, and allows editing of profile and venues.
 *
 * @returns {JSX.Element} The rendered ProfilePage component.
 */
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
  const { isDeleting, isDeleted, deletingBookingId, removeBooking } =
    useDeleteBooking();
  const [isUserNameMatch, setIsUserNameMatch] = useState(false);

  /**
   * Opens the profile edit modal.
   */
  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  /**
   * Opens the modal to list a new venue.
   */
  const handleOpenListNewVenueModal = () => {
    setIsListNewVenueModalOpen(true);
  };

  /**
   * Opens the modal to edit a venue.
   *
   * @param {Object} venue - The venue data to edit.
   */
  const handleEditVenue = (venue) => {
    setEditingVenue(venue);
  };

  /**
   * Closes all modals.
   */
  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
    setIsListNewVenueModalOpen(false);
  };

  /**
   * Moves to the next page of venues.
   */
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  /**
   * Moves to the previous page of venues.
   */
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const username = localStorage.getItem("userName");
    if (username && username === decodedName) {
      setCanInteractOnProfile(true);
    }
  }, [decodedName]);

  useEffect(() => {
    const username = localStorage.getItem("userName");
    if (profiles?.data && username && username === profiles.data.name) {
      setIsUserNameMatch(true);
    }
  }, [profiles]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!profiles?.data || !Array.isArray(profiles.data.venues)) {
    return <div>No profile data found or data is in an unexpected format.</div>;
  }

  const profileData = profiles.data;
  const venueStartIndex = currentPage * venuesPerPage;
  const currentVenues =
    profileData.venues?.slice(
      venueStartIndex,
      venueStartIndex + venuesPerPage
    ) ?? [];
  const totalVenues = profileData.venues?.length ?? 0;
  const hasMoreVenues = venueStartIndex + venuesPerPage < totalVenues;

  /**
   * Saves the changes made to the profile.
   *
   * @param {Object} updatedData - The updated profile data.
   */
  const handleSaveChanges = (updatedData) => {
    console.log("Updated Profile Data:", updatedData);
    handleCloseModal();
  };

  /**
   * Deletes a booking.
   *
   * @param {Object} event - The event object.
   * @param {Object} booking - The booking data to delete.
   */
  const handleDelete = async (event, booking) => {
    event.preventDefault();
    if (booking?.id) {
      try {
        await removeBooking(booking.id);
      } catch (error) {
        console.error("Failed to delete the booking:", error);
      }
    }
  };

  const upcomingBookings = profileData.bookings.filter(
    (booking) => new Date(booking.dateTo) > new Date()
  );

  return (
    <div className="bg-white">
      <h1 className="text-cedar font-condensed p-4 text-2xl md:text-6xl">
        {profileData.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-1 items-stretch h-full">
        <div
          className="col-span-6 bg-primary bg-cover bg-center"
          style={{ backgroundImage: `url('${profileData.banner.url}')` }}
        >
          <div className="bg-black bg-opacity-50 p-4 flex flex-col px-8 md:flex-row flex-wrap w-full justify-between items-center gap-2 text-white">
            <div className="flex flex-col items-center gap-4 mb-10 md:mb-0">
              <div className="w-52 h-52">
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
            <div className="flex flex-col w-full md:w-auto">
              <h2 className="font-condensed text-2xl justify-start text-shadow">
                Intro
              </h2>
              <ul className="flex flex-col space-y-2">
                <li className="capitalize text-lg font-sans break-words">
                  {profileData.bio}
                </li>
                <li className="capitalize text-lg font-sans break-words">
                  <span className="font-medium">Contact: </span>
                  {profileData.email}
                </li>
                <li className="capitalize text-lg font-sans break-words">
                  <span className="font-medium">Venue Manager: </span>
                  {profileData.venueManager ? "Yes" : "No"}
                </li>
                <li className="capitalize text-lg font-sans break-words">
                  <span className="font-medium">Bookings: </span>
                  {profileData.bookings.length}
                </li>
                <li className="capitalize text-lg font-sans break-words">
                  <span className="font-medium">Active Venues: </span>
                  {profileData.venues.length}
                </li>
              </ul>
              {canInteractOnProfile && profileData.venueManager && (
                <div className="mt-4 text-lg">
                  <DefaultButton onClick={handleOpenListNewVenueModal}>
                    List New Venue
                  </DefaultButton>
                </div>
              )}
            </div>
          </div>
        </div>
        {isUserNameMatch && (
          <div className="col-span-6 bg-primary text-center rounded-sm p-4">
            <FavoritesContainer />
          </div>
        )}
        <div className="col-span-6 bg-primary flex-grow">
          <h3 className="text-2xl font-medium text-center py-4 text-cedar">
            {profileData.name}`s Registered Venues
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-2">
            {currentVenues.map((venue) => (
              <div
                key={venue.id}
                className="bg-white shadow rounded-lg hover:shadow-md transition-shadow p-4"
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
                    {canInteractOnProfile && profileData.venueManager ? (
                      <DefaultButton onClick={() => handleEditVenue(venue)}>
                        Edit Venue
                      </DefaultButton>
                    ) : (
                      canInteractOnProfile && (
                        <p className="text-danger text-lg font-condensed font-medium">
                          You need to be a venue manager to edit your venues.
                          You can change this in your profile settings.
                        </p>
                      )
                    )}
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
        <div className="col-span-6 bg-primary flex-grow text-cedar">
          <h3 className="mt-2 text-3xl font-medium text-center flex-grow font-condensed mx-auto">
            Upcoming Bookings
          </h3>
          {canInteractOnProfile &&
          profileData &&
          profileData.bookings &&
          upcomingBookings.length > 0 ? (
            <div>
              {upcomingBookings.map((booking) => (
                <Link
                  key={booking.id}
                  to={`/venues/${booking.venue.id}`}
                  className="text-center"
                >
                  <div className="px-8 py-4 flex flex-col md:flex-row flex-wrap gap-8 justify-center md:justify-evenly items-center border-b border-porsche">
                    <div>
                      {booking.venue.media &&
                        booking.venue.media.length > 0 && (
                          <img
                            src={booking.venue.media[0].url}
                            alt={booking.venue.media[0].alt}
                            className="w-60 h-52 max-h-52 object-cover rounded-lg shadow-cedar shadow-md"
                          />
                        )}
                    </div>
                    <div>
                      <h4 className="text-cedar font-normal text-2xl md:text-4xl mb-2 md:w-60">
                        {booking.venue.name}
                      </h4>
                      <div className="flex flex-row justify-center text-lg font-medium mt-2">
                        <p>
                          From:{" "}
                          {new Date(booking.dateFrom).toLocaleDateString()}
                        </p>
                        <div className="w-4"></div>
                        <p>
                          To: {new Date(booking.dateTo).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        className="bg-white px-4 py-2 rounded-md text-cedar border-2 border-porsche hover:bg-danger hover:text-white hover:border-cedar font-medium mt-2"
                        onClick={(e) => handleDelete(e, booking)}
                        disabled={
                          isDeleting && deletingBookingId === booking.id
                        }
                        aria-label="Delete Booking"
                      >
                        {isDeleting && deletingBookingId === booking.id
                          ? "Deleting..."
                          : isDeleted && deletingBookingId === booking.id
                          ? "Booking Deleted"
                          : "Delete Booking"}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center font-light text-xl py-8">
              {canInteractOnProfile
                ? "No upcoming bookings found."
                : "You can't see other people's bookings, jeez!"}
            </p>
          )}
        </div>
      </div>
      <BackToTopButton />
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
