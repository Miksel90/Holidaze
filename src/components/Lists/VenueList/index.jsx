import { useState, useEffect, useRef } from "react";
import { useFetchVenues } from "../../../hooks/useFetchVenues";
import VenueCard from "../../Card/VenueCard";
import DefaultButton from "../../Buttons/DefaultButton";

function VenuesList() {
  const { venues, isLoading, error } = useFetchVenues();
  const dropdownRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [filterMeta, setFilterMeta] = useState({
    breakfast: false,
    parking: false,
    pets: false,
    wifi: false,
  });
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const filtered = venues.filter((venue) => {
      const matchesText = venue.name
        .toLowerCase()
        .includes(filterText.toLowerCase());
      const matchesMeta = Object.keys(filterMeta).every(
        (key) => !filterMeta[key] || venue.meta[key]
      );
      return matchesText && matchesMeta;
    });
    setFilteredVenues(filtered);
  }, [filterText, filterMeta, venues]);

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentVenues = filteredVenues.slice(startIndex, endIndex);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleNext = () => {
    if (endIndex < filteredVenues.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const handleCheckboxChange = (metaKey) => {
  //   setFilterMeta((prev) => ({ ...prev, [metaKey]: !prev[metaKey] }));
  // };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:flex-row justify-between items-center w-full p-4 gap-4">
        <input
          type="text"
          placeholder="Filter by name..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="mt-1 block  rounded-md  border-2 border-porsche shadow-sm p-2 text-lg
          text-cedar focus:outline-none focus:border-cedar placeholder:text-cedar placeholder:text-bold"
        />
        <div className="relative">
          <DefaultButton
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-2 border rounded bg-gray-200"
          >
            Filter Options:
          </DefaultButton>
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 z-10 mt-2 py-2 w-48 bg-white border rounded shadow-xl"
            >
              {["breakfast", "parking", "pets", "wifi"].map((key) => (
                <label
                  key={key}
                  className="flex items-center justify-start p-2 hover:text-matisse cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filterMeta[key]}
                    onChange={() =>
                      setFilterMeta((prev) => ({ ...prev, [key]: !prev[key] }))
                    }
                    className="mr-2"
                  />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              ))}
              <div className="px-2">
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="mt-2 p-2 w-full border rounded"
                >
                  <option value={5}>5/page</option>
                  <option value={10}>10/page</option>
                  <option value={20}>20/page</option>
                  <option value={50}>50/page</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ">
        {currentVenues.map((venue) => (
          <VenueCard key={venue.id} {...venue} />
        ))}
      </div>
      <div className="flex flex-row gap-2 justify-center mt-4 w-full">
        {currentPage > 0 && (
          <DefaultButton onClick={handlePrev}>Previous</DefaultButton>
        )}
        {endIndex < filteredVenues.length && (
          <DefaultButton onClick={handleNext}>Next</DefaultButton>
        )}
      </div>
    </div>
  );
}

export default VenuesList;
