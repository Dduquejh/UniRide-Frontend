import { useState } from "react";
import SearchForm from "./SearchForm";
import TripsPage from "./TripsPage";

const SearchPage = ({ zoneId, token }) => {
  const [isSearching, setIsSearching] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (tripData) => {
    setSearchResults(tripData);
    setIsSearching(false);
  };

  const handleReturn = () => {
    setIsSearching(true);
  };
  return (
    <>
      {isSearching ? (
        <SearchForm zoneId={zoneId} onSearchResults={handleSearchResults} />
      ) : (
        <TripsPage
          tripData={searchResults}
          onReturn={handleReturn}
          token={token}
        />
      )}
    </>
  );
};

export default SearchPage;
