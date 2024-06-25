import axios from "axios";
import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import Fuse from "fuse.js";
import DocumentTable from "./DocumentTable.jsx";
import DocumentForm from "./DocumentForm.jsx";

function Document() {
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    setMetadata(null);
    setNoRecordFound(false);
    setSearchResults(null);

    try {
      const response = await axios.get(
        `https://solarpower-backend-2f0d59f7581f.herokuapp.com/api/DocumentDeepSearch/GetAllDocuments`
      );
      if (response.data) {
        const data = response.data;
        setMetadata(data);
      } else {
        setNoRecordFound(true);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = () => {
    fetchData();
  };

  const handleSearch = () => {
    if (metadata) {
      const options = {
        keys: ["document", "tags", "comments"],
        threshold: 0.4,
      };
      const fuse = new Fuse(metadata, options);
      const results = fuse.search(searchText);
      setSearchResults(results.map((result) => result.item));
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleViewAll = () => {
    fetchData(); // Fetch all data again
  };

  return (
    <div className="flex flex-col gap-4 p-4 justify-center items-center ">
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="border p-2 rounded"
          placeholder="Search..."
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </div>

      <button
        onClick={handleViewAll}
        className="bg-gray-500 text-white p-2 rounded"
      >
        View All
      </button>

      {isLoading && (
        <div className="mt-4">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}

      {noRecordFound && <p className="text-red-500">No record found</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {metadata && !searchResults && (
        <DocumentTable metadata={metadata} onFormSubmit={handleFormSubmit} />
      )}
      {searchResults && (
        <DocumentTable
          metadata={searchResults}
          onFormSubmit={handleFormSubmit}
        />
      )}
      <DocumentForm onFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default Document;
