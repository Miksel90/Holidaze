import { FaSearch } from "react-icons/fa";

function SearchButton() {
  return (
    <button
      className="  border-2 border-porsche p-3 py-5 rounded-md text-cedar text-lg 
       hover:bg-white hover:text-primary hover:border-primary transition-colors duration-300 ease-in-out"
      type="submit"
      aria-label="Search"
    >
      <FaSearch />
    </button>
  );
}

export default SearchButton;
