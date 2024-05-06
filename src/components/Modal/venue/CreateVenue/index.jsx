import { useState, useEffect, useRef } from "react";
import DefaultButton from "../../../Buttons/DefaultButton";
import SubmitButton from "../../../Buttons/SubmitButton";

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
      zip: "",
      country: "",
      continent: "",
      lat: "",
      lng: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 z-50 flex justify-center items-center ">
      <div
        ref={modalRef}
        className="bg-white p-5 rounded-lg max-w-lg w-full mx-auto border-2 border-cedar"
      >
        <span className="absolute top-3 right-5 " onClick={onClose}>
          &times;
        </span>
        <h2 className="text-xl text-center py-4">List New Venue</h2>
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />
          <textarea
            name="description"
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
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />
          <input
            type="number"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
            placeholder="Max Guests"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating"
            min="1"
            max="5"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />
          <div className="flex flex-row gap-2 justify-between p-4">
            <label className="">
              <input
                type="checkbox"
                name="meta.wifi"
                checked={formData.meta.wifi}
                onChange={handleChange}
                className="mr-2"
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
              />
              Breakfast
            </label>
            <label>
              <input
                type="checkbox"
                name="meta.pets"
                checked={formData.meta.pets}
                onChange={handleChange}
                className="mr-2"
              />
              Pets Allowed
            </label>
          </div>
          <input
            type="text"
            name="location.address"
            value={formData.location.address}
            onChange={handleChange}
            placeholder="Address"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />

          <input
            type="text"
            name="location.city"
            value={formData.location.city}
            onChange={handleChange}
            placeholder="City"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />

          <input
            type="text"
            name="location.country"
            value={formData.location.country}
            onChange={handleChange}
            placeholder="Country"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />
          <input
            type="text"
            name="media.0.url"
            value={formData.media[0].url}
            onChange={handleChange}
            placeholder="Image URL"
            className="mt-1 block w-full font-normal px-3 py-2 border border-porsche rounded-md shadow-sm focus:outline-none focus:ring-cedar focus:border-primary"
          />
          <div className="flex flex-row justify-between p-4">
            <SubmitButton>Create Venue</SubmitButton>
            <DefaultButton onClick={onClose}>Cancel</DefaultButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ListNewVenueModal;
