import React, { useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSearch(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar plazas..."
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;
