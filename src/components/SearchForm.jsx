import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSearch } from "../context/SearchProvider.jsx";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const { handleSearch, resetSearch, searchResult } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return; // if query is empty string then return
    handleSearch(query); // call handleSearch function from SearchProvider.jsx
  };

  const handleReset = () => {
    setQuery("");
    resetSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setQuery("");
      resetSearch(); // if escape key is pressed then call resetSearch function from SearchProvider.jsx
    }
  };

  return (
    <form onSubmit={handleSubmit} className='relative'>
      <input className='border border-gray-500 outline-none rounded p-1 focus:ring-1 ring-blue-500 w-56' type='text' placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
      {searchResult.length > 0 && (
        <button onClick={handleReset} className='absolute top-1/2 -translate-y-1/2 text-gray-700 right-3'>
          <AiOutlineClose />
        </button>
      )}
    </form>
  );
};

export default SearchForm;
