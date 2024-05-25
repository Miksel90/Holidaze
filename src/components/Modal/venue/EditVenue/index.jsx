import { useState, useEffect, useRef } from "react";
import DefaultButton from "../../../Buttons/DefaultButton";
import { useDeleteVenue } from "../../../../hooks/useDeleteVenue";
import { useEditVenue } from "../../../../hooks/useEditVenue";
import PropTypes from "prop-types";

/**
 * EditVenueModal component that allows users to edit and delete venue information.
 *
 * @component
 * @param {Object} props - The props for EditVenueModal.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {function} props.onClose - Function to call when the modal is closed.
 * @param {Object} props.venueData - The data of the venue to edit.
 * @param {function} [props.onSave] - Optional callback function to call when the venue is saved.
 * @example
 * return (
 *   <EditVenueModal isOpen={true} onClose={() => {}} venueData={{ ... }} />
 * )
 */
function EditVenueModal({ isOpen, onClose, venueData }) {
  const modalRef = useRef(null);
  const [errors, setErrors] = useState({});
  const { removeVenue, isDeleting, isDeleted } = useDeleteVenue();
  const { updateVenue, isLoading, error } = useEditVenue();

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
    if (venueData) {
      setFormData({
        name: venueData.name || "",
        description: venueData.description || "",
        media: venueData.media || [{ url: "", alt: "" }],
        price: venueData.price.toString() || "",
        maxGuests: venueData.maxGuests.toString() || "",
        rating: venueData.rating.toString() || "",
        meta: venueData.meta || {
          wifi: false,
          parking: false,
          breakfast: false,
          pets: false,
        },
        location: venueData.location || {
          address: "",
          city: "",
          country: "",
        },
      });
    }
  }, [venueData]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mouseup", handleOutsideClick);
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
          if (type === "checkbox") {
            current[key] = checked;
          } else {
            if (key === "url" && value.length > 250) {
              setErrors({
                ...errors,
                [name]: "Image URL must be under 250 characters.",
              });
              return;
            } else {
              const newErrors = { ...errors };
              delete newErrors[name];
              setErrors(newErrors);
              current[key] = value;
            }
          }
        } else {
          current = current[key] || {};
        }
      });
      return updated;
    });
  };

  /**
   * Adds a new image input field to the form data.
   */
  const handleAddImage = () => {
    setFormData({
      ...formData,
      media: [...formData.media, { url: "", alt: "" }],
    });
  };

  /**
   * Removes an image input field from the form data.
   *
   * @param {number} index - The index of the image to remove.
   */
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      media: formData.media.filter((_, i) => i !== index),
    });
  };

  /**
   * Handles form submission to update the venue information.
   *
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const venueDataToUpdate = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      media: formData.media.map((item) => ({
        url: item.url.trim(),
        alt: item.alt ? item.alt.trim() : "default alt text",
      })),
      price: formData.price ? parseFloat(formData.price) : undefined,
      maxGuests: formData.maxGuests
        ? parseInt(formData.maxGuests, 10)
        : undefined,
      rating: formData.rating ? parseInt(formData.rating, 10) : undefined,
      meta: formData.meta,
      location: {
        address: formData.location.address
          ? formData.location.address.trim()
          : undefined,
        city: formData.location.city
          ? formData.location.city.trim()
          : undefined,
        country: formData.location.country
          ? formData.location.country.trim()
          : undefined,
        lat: formData.location.lat
          ? parseFloat(formData.location.lat)
          : undefined,
        lng: formData.location.lng
          ? parseFloat(formData.location.lng)
          : undefined,
      },
    };

    if (
      (formData.price && isNaN(venueDataToUpdate.price)) ||
      (formData.maxGuests && isNaN(venueDataToUpdate.maxGuests)) ||
      (formData.rating && isNaN(venueDataToUpdate.rating))
    ) {
      console.error(
        "Validation failed: Numeric fields must contain valid numbers."
      );
      return;
    }

    try {
      console.log("Form submitted", venueDataToUpdate);
      const response = await updateVenue(venueData.id, venueDataToUpdate);
      console.log("Update successful", response);
      onClose();
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  /**
   * Handles the deletion of the venue.
   */
  const handleDelete = async () => {
    if (venueData?.id) {
      try {
        await removeVenue(venueData.id);
        onClose();
      } catch (error) {
        console.error("Failed to delete the venue:", error);
      }
    }
  };

  if (!isOpen || !venueData) return null;

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 z-50 flex justify-center items-center overflow-auto">
      <div
        ref={modalRef}
        className="bg-white p-10 rounded-lg max-w-lg w-full mx-auto border-2 border-cedar"
      >
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
          <div className="flex flex-row mx-auto py-4 gap-8">
            <button
              className="bg-danger px-4 py-2 font-sans rounded-md text-white"
              onClick={handleDelete}
              disabled={isDeleting}
              aria-label="Delete Venue"
            >
              {isDeleting
                ? "Deleting..."
                : isDeleted
                ? "Venue Deleted"
                : "Delete"}
            </button>
            <DefaultButton onClick={onClose}>Cancel</DefaultButton>
            <button
              className="px-4 py-2 font-condensed border-2 rounded-md text-cedar bg-primary hover:bg-primary hover:text-white border-porsche transition-colors"
              type="submit"
              disabled={isLoading}
              aria-label="Update Venue"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditVenueModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  venueData: PropTypes.object,
  onSave: PropTypes.func,
};

export default EditVenueModal;
