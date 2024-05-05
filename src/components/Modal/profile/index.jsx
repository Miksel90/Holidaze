import { useState, useEffect, useRef } from "react";
import DefaultButton from "../../Buttons/DefaultButton";
import SubmitButton from "../../Buttons/SubmitButton";

const EditProfileModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const modalRef = useRef(null);

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
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

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
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 flex items-center justify-center p-4">
      <div
        className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full"
        ref={modalRef}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            Bio:
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
            />
          </label>
          <label className="block">
            Profile Image URL:
            <input
              type="url"
              name="avatarUrl"
              value={formData.avatar.url}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
            />
          </label>
          <label className="block">
            Profile Image Description:
            <input
              type="text"
              name="avatarAlt"
              value={formData.avatar.alt}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
            />
          </label>
          <label className="block">
            Banner Image URL:
            <input
              type="url"
              name="bannerUrl"
              value={formData.banner.url}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
            />
          </label>
          <label className="block">
            Banner description:
            <input
              type="text"
              name="bannerAlt"
              value={formData.banner.alt}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
            />
          </label>
          <label className="block">
            Venue Manager:
            <input
              type="checkbox"
              name="venueManager"
              checked={formData.venueManager}
              onChange={(e) =>
                setFormData({ ...formData, venueManager: e.target.checked })
              }
              className="ml-2"
            />
          </label>
          <div className="flex justify-end space-x-4">
            <DefaultButton onClick={onClose}>Cancel</DefaultButton>
            <SubmitButton>Save Changes</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
