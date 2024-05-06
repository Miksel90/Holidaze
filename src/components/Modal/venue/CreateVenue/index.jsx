import { useState, useEffect, useRef } from "react";
import DefaultButton from "../../../Buttons/DefaultButton";
import SubmitButton from "../../../Buttons/SubmitButton";
import PropTypes from "prop-types";

function ListNewVenueModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: [{ url: "", alt: "" }],
    price: "",
    maxGuests: "",
    rating: "",
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      country: "",
    },
  });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mouseup", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mouseup", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleAddImage = () => {
    if (formData.media.length < 8) {
      setFormData({
        ...formData,
        media: [...formData.media, { url: "", alt: "" }],
      });
    }
  };

  const handleRemoveImage = (index) => {
    if (formData.media.length > 1) {
      setFormData({
        ...formData,
        media: formData.media.filter((_, i) => i !== index),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 z-50  flex justify-center items-center overflow-auto">
      <div
        ref={modalRef}
        className="bg-white p-10 rounded-lg max-w-lg w-full  mx-auto border-2 border-cedar"
        style={{ maxHeight: "800vh" }}
      >
        <span className="absolute top-3 right-5 " onClick={onClose}>
          &times;
        </span>
        <h2 className="text-xl text-center py-4">List New Venue</h2>
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <input
            type="text"
            name="name"
            aria-label="Venue Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />
          <textarea
            name="description"
            aria-label="Venue Description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          ></textarea>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            aria-label="Price per night"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />
          <input
            type="number"
            name="maxGuests"
            aria-label="Max Guests"
            value={formData.maxGuests}
            onChange={handleChange}
            placeholder="Max Guests"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />
          <input
            type="number"
            name="rating"
            aria-label="Rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating"
            min="1"
            max="5"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />
          <div className="flex flex-col md:flex-row gap-2 justify-between p-4">
            <label className="">
              <input
                type="checkbox"
                name="meta.wifi"
                checked={formData.meta.wifi}
                onChange={handleChange}
                className="mr-2"
                aria-label="WiFi Available"
              />
              WiFi
            </label>
            <label>
              <input
                type="checkbox"
                name="meta.parking"
                checked={formData.meta.parking}
                onChange={handleChange}
                className="mr-2"
                aria-label="Parking Available"
              />
              Parking
            </label>
            <label>
              <input
                type="checkbox"
                name="meta.breakfast"
                checked={formData.meta.breakfast}
                onChange={handleChange}
                className="mr-2"
                aria-label="Breakfast Included"
              />
              Breakfast
            </label>
            <label>
              <input
                type="checkbox"
                name="meta.pets"
                checked={formData.meta.pets}
                aria-label="Pets Allowed"
                onChange={handleChange}
                className="mr-2"
              />
              Pets Allowed
            </label>
          </div>
          <input
            type="text"
            name="location.address"
            aria-label="Address"
            value={formData.location.address}
            onChange={handleChange}
            placeholder="Address"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />

          <input
            type="text"
            name="location.city"
            aria-label="City"
            value={formData.location.city}
            onChange={handleChange}
            placeholder="City"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />

          <input
            type="text"
            name="location.country"
            aria-label="Country"
            value={formData.location.country}
            onChange={handleChange}
            placeholder="Country"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />

          {formData.media.map((item, index) => (
            <div className="flex flex-row gap-2 mt-2" key={index}>
              <input
                type="text"
                name={`media.${index}.url`}
                value={item.url}
                onChange={handleChange}
                aria-label="Image URL"
                placeholder="Image URL"
                className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
              />

              {formData.media.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  aria-label="Remove Image"
                  className="bg-primary text-cedar px-2 py-1 rounded-md"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {formData.media.length < 5 && (
            <div className="text-sm flex flex-row gap-4 mt-2">
              <button
                type="button"
                aria-label="Add Image"
                onClick={handleAddImage}
                disabled={formData.media.length >= 5}
                className="bg-primary text-cedar px-2 py-1 rounded-md"
              >
                Add Image
              </button>
            </div>
          )}

          <div className="flex flex-row justify-between p-4">
            <DefaultButton onClick={onClose}>Cancel</DefaultButton>
            <SubmitButton>Create Venue</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}

ListNewVenueModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ListNewVenueModal;
