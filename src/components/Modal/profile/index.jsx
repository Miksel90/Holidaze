import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DefaultButton from "../../Buttons/DefaultButton";
import SubmitButton from "../../Buttons/SubmitButton";
import { useUpdateProfileInfo } from "../../../hooks/useUpdateProfileInfo";

const EditProfileModal = ({ isOpen, onClose, initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const modalRef = useRef(null);
  const { updateProfile, isLoading, error, isSuccess } = useUpdateProfileInfo();

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
        bio: value.slice(0, 100), // Enforce max 100 characters
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
  onSave: PropTypes.func.isRequired,
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
