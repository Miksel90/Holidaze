import { useState, useEffect, useCallback } from "react";
import { useSearch } from "../../hooks/useSearch";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaHouse } from "react-icons/fa6";

/**
 * Delays the execution of a function.
 *
 * @param {function} func - The function to delay.
 * @param {number} delay - The delay in milliseconds.
 * @returns {function} The delayed function.
 */
const delaySearch = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * SearchBar component that allows users to search for profiles and venues.
 *
 * @component
 * @example
 * return (
 *   <SearchBar />
 * )
 */
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { profiles, venues, isLoading, error } = useSearch(searchTerm);

  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Delays setting the search term.
   */
  const delayedSetSearchTerm = useCallback(
    delaySearch((value) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  useEffect(() => {
    if (!isLoading) {
      const allResults = [
        ...profiles.map((p) => ({ ...p, type: "profile" })),
        ...venues.map((v) => ({ ...v, type: "venue" })),
      ];
      const filteredResults = searchTerm
        ? allResults.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];
      setSearchResults(filteredResults);
      setIsMenuOpen(filteredResults.length > 0);
    }
  }, [searchTerm, profiles, venues, isLoading]);

  /**
   * Clears the search input and results.
   */
  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
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
        onSubmit={(e) => e.preventDefault()}
        className="flex gap-2 mt-5 items-center"
      >
        <div className="relative flex items-center w-full">
          <input
            id="search"
            type="search"
            placeholder="Search for profiles or venues..."
            autoFocus
            required
            className="block w-full rounded-md shadow-sm p-3 text-lg focus:ring-cedar focus:border-cedar pl-4"
            autoComplete="off"
            aria-label="Search"
            onChange={(e) => delayedSetSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute right-3 text-cedar text-xl z-10" />
        </div>
      </form>
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
                    ? `/profiles/${item.name}`
                    : `/venues/${item.id}`
                }
                className="flex items-center gap-2 w-full"
                onClick={clearSearch}
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
