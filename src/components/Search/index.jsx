import { useState, useEffect, useMemo } from "react";
import { useFetchProfiles } from "../../hooks/useFetchProfiles";
import { useFetchVenues } from "../../hooks/useFetchVenues";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaHouse } from "react-icons/fa6";

const delaySearch = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

const SearchBar = () => {
  const { venues, isLoading: isLoadingVenues } = useFetchVenues();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    profiles,
    isLoading: isLoadingProfiles,
    error,
  } = useFetchProfiles(searchTerm, true);

  const memoizedProfiles = useMemo(() => profiles, [profiles]);
  const memoizedVenues = useMemo(() => venues, [venues]);

  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const delayedSetSearchTerm = delaySearch((value) => {
    setSearchTerm(value);
  }, 300);

  useEffect(() => {
    if (memoizedProfiles.data && Array.isArray(memoizedProfiles.data)) {
      const allResults = [
        ...memoizedProfiles.data.map((p) => ({ ...p, type: "profile" })),
        ...memoizedVenues.map((v) => ({ ...v, type: "venue" })),
      ];
      const results =
        searchTerm.length > 0
          ? allResults.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : [];
      setSearchResults(results);
      setIsMenuOpen(results.length > 0);
    }
  }, [searchTerm, memoizedProfiles, memoizedVenues]);

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
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
