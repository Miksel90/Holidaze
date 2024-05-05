import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchProfiles } from "../../hooks/useFetchProfiles";
import DefaultButton from "../../components/Buttons/DefaultButton";
import EditProfileModal from "../../components/Modal/profile";

function ProfilePage() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const { profiles, isLoading, error } = useFetchProfiles(decodedName);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const username = localStorage.getItem("userName");
    if (username && username === decodedName) {
      setCanEdit(true);
    }
  }, [decodedName]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = (updatedData) => {
    console.log("Updated Profile Data:", updatedData);

    handleCloseModal();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!profiles || !profiles.data) return <div>No profile data found.</div>;

  const profileData = profiles.data;

  return (
    <div className="bg-white">
      <h1 className="text-cedar font-condensed p-4 text-2xl">
        {profileData.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-1 items-stretch">
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
              {canEdit && (
                <div className="text-md">
                  <DefaultButton onClick={handleOpenModal}>Edit</DefaultButton>
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
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 bg-primary bg-cover bg-center">
          <h3>My Venues</h3>
        </div>
        <div className="col-span-1 md:col-span-3 bg-primary bg-cover bg-center">
          <h3>My Bookings</h3>
        </div>
      </div>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveChanges}
        initialData={profileData}
      />
    </div>
  );
}

export default ProfilePage;
