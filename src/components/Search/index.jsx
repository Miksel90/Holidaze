// import { useState } from "react";
// import { useEffect } from "react";
// import { useFetchProducts } from "../hooks/useFetchProducts";
// import { Link } from "react-router-dom";
import SearchButton from "../Buttons/SearchButton";

const SearchBar = () => {
  return (
    <form role="search" className=" flex gap-2 mt-5 font-sans items-center">
      <input
        id="search"
        type="search"
        placeholder="Search..."
        autoFocus
        required
        className="mt-1 block w-full rounded-md  border-2 border-porsche shadow-sm p-3 py-4 text-lg
         text-cedar focus:outline-none focus:border-cedar placeholder:text-cedar placeholder:text-bold"
        autoComplete="off"
        aria-label="Search"
      />
      <SearchButton />
    </form>
  );
};

export default SearchBar;
