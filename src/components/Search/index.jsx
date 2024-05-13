import { useState, useEffect } from "react";
import { useSearch } from "../../hooks/useSearch";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaHouse } from "react-icons/fa6";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { profiles, venues, isLoading, error } = useSearch(searchTerm);
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  };

  useEffect(() => {
    if (!isLoading) {
      const allResults = [
        ...(profiles || []).map((p) => ({ ...p, type: "profile" })),
        ...(venues || []).map((v) => ({ ...v, type: "venue" })),
      ];
      const filteredResults = searchTerm
        ? allResults.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];
      setSearchResults(filteredResults);
      setIsMenuOpen(filteredResults.length > 0);
      console.log("filteredResults set in useEffect", filteredResults);
    }
  }, [searchTerm, profiles, venues, isLoading]); // Make sure all variables used are listed

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsMenuOpen(false);
  };

  console.log("Rendering SearchBar", { searchResults, isMenuOpen });

  return (
    <div className="relative">
      {/* Styles to remove browser-specific search input clear buttons */}
      <style>
        {`
          input[type="search"]::-webkit-search-cancel-button {
              -webkit-appearance: none;
          }
          input[type="search"]::-moz-search-clear-button {
              display: none;
          }
          input[type="search"]::-ms-clear {
              display: none;
          }
        `}
      </style>

      <form
        role="search"
        onSubmit={(e) => e.preventDefault()} // Prevent form submission
        className="flex gap-2 mt-5 items-center"
      >
        <div className="relative flex items-center w-full">
          <input
            id="search"
            type="search"
            placeholder="Search..."
            autoFocus
            required
            className="block w-full rounded-md shadow-sm p-3 text-lg focus:ring-cedar focus:border-cedar pl-4"
            autoComplete="off"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute right-3 text-cedar text-xl z-10" />
        </div>
      </form>

      {/* Dropdown menu for displaying search results */}
      {isMenuOpen && (
        <ul className="absolute z-10 w-full bg-white shadow-lg mt-1 rounded-md overflow-hidden text-xl">
          {searchResults.map((item, index) => (
            <li
              key={
                item.id
                  ? `${item.type}-${item.id}`
                  : `${item.type}-index-${index}`
              }
              className="border-b last:border-b-0 flex items-center p-3 hover:bg-primary hover:text-white hover:border-cedar hover:border-t cursor-pointer hover:font-medium transition-colors"
            >
              <Link
                to={
                  item.type === "profile"
                    ? `/profiles/${item.id}`
                    : `/venues/${item.id}`
                }
                className="flex items-row gap-2 w-full"
                onClick={clearSearch} // Clears the search input and results on selecting an item
              >
                {item.type === "profile" ? (
                  <IoPersonCircleSharp className="text-2xl" />
                ) : (
                  <FaHouse className="text-2xl" />
                )}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
