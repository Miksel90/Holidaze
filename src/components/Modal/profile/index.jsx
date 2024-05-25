import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DefaultButton from "../../Buttons/DefaultButton";
import SubmitButton from "../../Buttons/SubmitButton";
import { useUpdateProfileInfo } from "../../../hooks/useUpdateProfileInfo";

/**
 * EditProfileModal component that allows users to edit their profile information.
 *
 * @component
 * @param {Object} props - The props for EditProfileModal.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {function} props.onClose - Function to call when the modal is closed.
 * @param {Object} props.initialData - The initial data for the form.
 * @param {string} [props.initialData.bio] - The user's bio.
 * @param {Object} props.initialData.avatar - The user's avatar information.
 * @param {string} props.initialData.avatar.url - The URL of the user's avatar.
 * @param {string} [props.initialData.avatar.alt] - The alt text for the user's avatar.
 * @param {Object} props.initialData.banner - The user's banner information.
 * @param {string} props.initialData.banner.url - The URL of the user's banner.
 * @param {string} [props.initialData.banner.alt] - The alt text for the user's banner.
 * @param {boolean} props.initialData.venueManager - Indicates if the user is a venue manager.
 * @example
 * return (
 *   <EditProfileModal
 *     isOpen={true}
 *     onClose={handleClose}
 *     initialData={{
 *       bio: "This is a bio",
 *       avatar: { url: "avatar.jpg", alt: "User's avatar" },
 *       banner: { url: "banner.jpg", alt: "User's banner" },
 *       venueManager: true,
 *     }}
 *   />
 * )
 */
const EditProfileModal = ({ isOpen, onClose, initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const modalRef = useRef(null);
  const { updateProfile, isLoading, error, isSuccess } = useUpdateProfileInfo();

  /**
   * Handles input changes and updates the form data.
   *
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "avatarUrl" ||
      name === "bannerUrl" ||
      name === "avatarAlt" ||
      name === "bannerAlt"
    ) {
      setFormData((prev) => ({
        ...prev,
        [name.includes("avatar") ? "avatar" : "banner"]: {
          ...prev[name.includes("avatar") ? "avatar" : "banner"],
          [name.endsWith("Url") ? "url" : "alt"]: value,
        },
      }));
    } else if (name === "bio") {
      setFormData((prev) => ({
        ...prev,
        bio: value.slice(0, 100),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
      window.location.reload();
    }
  }, [isSuccess, onClose]);

  /**
   * Handles clicks outside the modal to close it.
   *
   * @param {Object} event - The event object.
   */
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /**
   * Handles form submission to update the profile information.
   *
   * @param {Object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full border-2 border-cedar"
        ref={modalRef}
      >
        <form onSubmit={handleSubmit} className="py-4">
          <label className="block font-medium">
            Bio: (Max 100 characters)
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border font-normal border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
            />
            <p className="text-right text-sm text-cedar">
              {formData.bio.length}/100
            </p>
          </label>
          <label className="block font-medium">
            Profile Image URL:
            <input
              type="url"
              name="avatarUrl"
              value={formData.avatar.url}
              onChange={handleChange}
              className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
            />
          </label>
          <label className="block font-medium">
            Profile Image Description:
            <input
              type="text"
              name="avatarAlt"
              value={formData.avatar.alt}
              onChange={handleChange}
              className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
            />
          </label>
          <label className="block font-medium">
            Banner Image URL:
            <input
              type="url"
              name="bannerUrl"
              value={formData.banner.url}
              onChange={handleChange}
              className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
            />
          </label>
          <label className="block font-medium">
            Banner description:
            <input
              type="text"
              name="bannerAlt"
              value={formData.banner.alt}
              onChange={handleChange}
              className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
            />
          </label>

          <label className="font-medium flex items-center py-4">
            Sign up as a Venue Manager?
            <input
              type="checkbox"
              name="venueManager"
              checked={formData.venueManager}
              onChange={(e) =>
                setFormData({ ...formData, venueManager: e.target.checked })
              }
              className="w-full h-8"
            />
          </label>

          <div className="flex justify-end space-x-4">
            <DefaultButton onClick={onClose}>Cancel</DefaultButton>
            <SubmitButton>Save Changes</SubmitButton>
          </div>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error updating profile: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    bio: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string,
    }),
    banner: PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string,
    }),
    venueManager: PropTypes.bool,
  }).isRequired,
};

export default EditProfileModal;
