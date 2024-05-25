import { useState, forwardRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
import DefaultButton from "../Buttons/DefaultButton";
import { useBookVenue } from "../../hooks/useBookVenue";
import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";

/**
 * PickDates component for selecting date range.
 *
 * @component
 * @param {Object} props - The props for PickDates.
 * @param {string} props.value - The selected date value.
 * @param {function} props.onClick - The function to handle click event.
 * @param {Object} ref - The reference to the button element.
 */
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

/**
 * BookVenue component for booking a venue.
 *
 * @component
 * @param {Object} props - The props for BookVenue.
 * @param {Object} props.venue - The venue details.
 * @returns {JSX.Element} The BookVenue component.
 */
const BookVenue = ({ venue }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const userName = localStorage.getItem("userName");

  /**
   * Handles date change event.
   *
   * @param {Array<Date>} dates - The selected start and end dates.
   */
  const onChange = (dates) => {
    const [start, end] = dates;
    if (start && end) {
      for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        if (isBookedDate(new Date(dt))) {
          setError("Selected dates includes dates when Venue is booked.");
          return;
        }
      }
    }
    setStartDate(start);
    setEndDate(end);
    setError("");
  };

  /**
   * Clears the selected dates.
   */
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

  /**
   * Checks if the given date is already booked.
   *
   * @param {Date} date - The date to check.
   * @returns {boolean} True if the date is booked, otherwise false.
   */
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

  /**
   * Generates the options for the number of guests.
   *
   * @returns {Array<JSX.Element>} The list of options.
   */
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

  /**
   * Handles the booking process.
   */
  const handleBooking = () => {
    if (startDate && endDate && guestCount && venue.id && userName) {
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
          setError("Failed to book venue. Please try again.");
        });
    } else {
      setError("You must be logged in to book a venue.");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 justify-around w-full ">
      <div className="flex flex-row items-center justify-center sm:justify-between gap-2 md:ms-10">
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          excludeDates={bookedDates}
          minDate={today}
          dayClassName={(date) =>
            isBookedDate(date) ? "booked-date" : undefined
          }
          customInput={<PickDates />}
        />

        <button
          onClick={clearDates}
          className="bg-primary border-2 border-cedar rounded-lg px-2 py-2 text-black ml-4 flex flex-row items-center gap-2 hover:bg-cedar hover:text-white"
          aria-label="Clear dates"
        >
          Clear Dates
          <ImCross />
        </button>
      </div>
      {error && (
        <div className="text-danger text-md font-medium text-wrap">{error}</div>
      )}
      <div className="flex border-b border-primary p-2">
        <p className="text-lg font-semibold text-start">
          Total Days:
          {startDate && endDate ? endDate.getDate() - startDate.getDate() : 0}
        </p>
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
      city: PropTypes.string,
      country: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default BookVenue;
