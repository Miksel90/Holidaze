import { useState, useEffect, useRef } from "react";
import DefaultButton from "../../../Buttons/DefaultButton";
import SubmitButton from "../../../Buttons/SubmitButton";
import PropTypes from "prop-types";
import { useCreateNewVenue } from "../../../../hooks/useCreateNewVenue";

/**
 * ListNewVenueModal component that allows users to list a new venue.
 *
 * @component
 * @param {Object} props - The props for ListNewVenueModal.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {function} props.onClose - Function to call when the modal is closed.
 * @example
 * return (
 *   <ListNewVenueModal isOpen={true} onClose={() => {}} />
 * )
 */
function ListNewVenueModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const { createVenue } = useCreateNewVenue();
  const [errors, setErrors] = useState({});

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

  /**
   * Handles input changes and updates the form data.
   *
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");

    setFormData((prev) => {
      let updated = { ...prev };
      let current = updated;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          if (key === "url" && value.length > 250) {
            setErrors({
              ...errors,
              url: "Image URL must be under 250 characters.",
            });
            return;
          } else {
            const newErrors = { ...errors };
            delete newErrors.url;
            setErrors(newErrors);
          }
          current[key] = type === "checkbox" ? checked : value;
        } else {
          if (!current[key]) {
            current[key] = {};
          }
          current = current[key];
        }
      });

      return updated;
    });
  };

  /**
   * Adds a new image input field to the form data.
   */
  const handleAddImage = () => {
    if (formData.media.length < 8) {
      setFormData({
        ...formData,
        media: [...formData.media, { url: "", alt: "" }],
      });
    }
  };

  /**
   * Removes an image input field from the form data.
   *
   * @param {number} index - The index of the image to remove.
   */
  const handleRemoveImage = (index) => {
    if (formData.media.length > 1) {
      setFormData({
        ...formData,
        media: formData.media.filter((_, i) => i !== index),
      });
    }
  };

  /**
   * Handles form submission to create a new venue.
   *
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isUrlTooLong = formData.media.some((item) => item.url.length > 300);
    if (isUrlTooLong) {
      console.error(
        "Validation failed: One or more image URLs exceed the maximum length of 300 characters."
      );
      alert(
        "Validation failed: One or more image URLs exceed the maximum length of 300 characters."
      );
      return;
    }

    const venueData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      media: formData.media.map((item) => ({
        url: item.url.trim(),
        alt: item.alt.trim() || "default alt text",
      })),
      price: parseFloat(formData.price),
      maxGuests: parseInt(formData.maxGuests, 10),
      rating: parseInt(formData.rating, 10),
      meta: formData.meta,
      location: {
        address: formData.location.address.trim() || null,
        city: formData.location.city.trim() || null,
        country: formData.location.country.trim() || null,
        lat: formData.location.lat ? parseFloat(formData.location.lat) : 0,
        lng: formData.location.lng ? parseFloat(formData.location.lng) : 0,
      },
    };

    if (
      isNaN(venueData.price) ||
      isNaN(venueData.maxGuests) ||
      isNaN(venueData.rating)
    ) {
      console.error(
        "Validation failed: Numeric fields must contain valid numbers."
      );
      return;
    }

    try {
      const response = await createVenue(venueData);
      console.log("Venue created successfully!", response);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Failed to create venue:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 z-50 flex justify-center items-center overflow-auto">
      <div
        ref={modalRef}
        className="bg-white p-10 rounded-lg max-w-lg w-full mx-auto border-2 border-cedar"
        style={{ maxHeight: "800vh" }}
      >
        <span className="absolute top-3 right-5" onClick={onClose}>
          &times;
        </span>
        <h2 className="text-xl text-center py-4">List New Venue</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            required
            name="name"
            aria-label="Venue Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />

          <textarea
            name="description"
            required
            aria-label="Venue Description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          ></textarea>

          <input
            type="number"
            required
            name="price"
            min="1"
            max="10000"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            aria-label="Price per night"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />

          <input
            type="number"
            name="maxGuests"
            min="1"
            max="10"
            required
            aria-label="Max Guests"
            value={formData.maxGuests}
            onChange={handleChange}
            placeholder="Max Guests"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />

          <input
            type="number"
            required
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
            required
            name="location.city"
            aria-label="City"
            value={formData.location.city}
            onChange={handleChange}
            placeholder="City"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />

          <input
            type="text"
            required
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
                required
                placeholder="Image URL"
                className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
              />
              {errors[`media.${index}.url`] && (
                <p className="text-danger text-xs italic">
                  {errors[`media.${index}.url`]}
                </p>
              )}

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
            <SubmitButton>Submit</SubmitButton>
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
