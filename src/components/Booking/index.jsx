import { useState, forwardRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
import DefaultButton from "../Buttons/DefaultButton";
import { useBookVenue } from "../../hooks/useBookVenue";

import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";

const PickDates = forwardRef(({ value, onClick }, ref) => (
  <button
    className="form-input px-4 py-2 border rounded-md shadow-sm shadow-black text-lg font-medium"
    onClick={onClick}
    aria-label="Select Dates"
    ref={ref}
  >
    {value || "Select Dates"}
  </button>
));

PickDates.displayName = "DateStart";
PickDates.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};

const BookVenue = ({ venue }) => {
  // console.log("Venue data received :", venue);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const navigate = useNavigate();

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const bookedDates = useMemo(() => {
    const dates = [];
    venue.bookings.forEach((booking) => {
      let currentDate = new Date(booking.dateFrom);
      const endDate = new Date(booking.dateTo);

      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return dates;
  }, [venue.bookings]);

  const isBookedDate = (date) => {
    return bookedDates.some(
      (bookedDate) =>
        date.getDate() === bookedDate.getDate() &&
        date.getMonth() === bookedDate.getMonth() &&
        date.getFullYear() === bookedDate.getFullYear()
    );
  };

  const totalPrice = useMemo(() => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays * venue.price;
    }
    return 0;
  }, [startDate, endDate, venue.price]);

  const selectNumberOfGuests = () => {
    const options = [];
    for (let i = 1; i <= venue.maxGuests; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const { isLoading, initiateBooking } = useBookVenue();

  const handleBooking = () => {
    if (startDate && endDate && guestCount && venue.id) {
      initiateBooking({
        dateFrom: startDate.toISOString(),
        dateTo: endDate.toISOString(),
        guests: guestCount,
        venueId: venue.id,
      })
        .then(() => {
          navigate("/booked", {
            state: {
              startDate,
              endDate,
              guestCount,
              totalPrice,
              venueName: venue.name,
              venueLocation: `${venue.location.city}, ${venue.location.country}`,
            },
          });
        })
        .catch((error) => {
          console.error("Booking failed:", error);
        });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 justify-around w-full ">
      <div className="flex flex-row items-center justify-center sm:justify-between gap-2">
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          excludeDates={bookedDates}
          dayClassName={(date) =>
            isBookedDate(date) ? "booked-date" : undefined
          }
          customInput={<PickDates />}
        />
        <button
          onClick={clearDates}
          className="bg-primary border-2 border-cedar rounded-lg px-2 py-2 text-black ml-4"
          aria-label="Clear dates"
        >
          <ImCross />
        </button>
      </div>
      <div className="flex border-b border-primary p-2">
        <p className="text-lg font-semibold text-start">
          Total Price: ${totalPrice}
        </p>
      </div>
      <div className="flex flex-col gap-8 justify-between flex-grow">
        <div className="flex border-b border-primary p-2">
          <label htmlFor="guestCount" className="font-semibold">
            Number of Guests:
          </label>
          <select
            id="guestCount"
            className="ml-2 border-2 px-2 "
            value={guestCount}
            onChange={(e) => setGuestCount(parseInt(e.target.value, 10))}
          >
            {selectNumberOfGuests()}
          </select>
        </div>
        <div className=" flex items-center justify-center ">
          <DefaultButton
            onClick={handleBooking}
            disabled={isLoading || !startDate || !endDate}
          >
            {isLoading ? "Booking..." : "Book"}
          </DefaultButton>
        </div>
      </div>
    </div>
  );
};

BookVenue.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    bookings: PropTypes.arrayOf(
      PropTypes.shape({
        dateFrom: PropTypes.string.isRequired,
        dateTo: PropTypes.string.isRequired,
      })
    ),
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    maxGuests: PropTypes.number,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default BookVenue;
