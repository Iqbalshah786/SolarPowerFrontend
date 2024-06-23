import axios from "axios";
import { useState } from "react";
import RecordTable from "./RecordTable.jsx";

function App() {
  const [sheetId, setSheetId] = useState("");
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [noRecordFound, setNoRecordFound] = useState(false);

  const handleInputChange = (e) => {
    setSheetId(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMetadata(null);
    setNoRecordFound(false);

    try {
      const response = await axios.get(`https://solarpower-backend-2f0d59f7581f.herokuapp.com/api/sheetmetadata/${sheetId}`);
      if (response.data) {
        setMetadata(response.data);
      } else {
        setNoRecordFound(true);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 justify-center items-center ">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={sheetId}
          onChange={handleInputChange}
          placeholder="Enter sheet ID"
          className="border-2 border-gray-300 p-4 mr-4"
        />
        <button type="submit" className="border-2 bg-blue-500 text-white p-4">
          Get Sheet Metadata
        </button>
      </form>
      {noRecordFound && <p className="text-red-500">No record found</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {metadata && <RecordTable metadata={metadata} />}
      {/* {error && (
        <p>
          Error : {error} <br /> {error.message}
        </p>
      )}
      <RecordTable metadata={metadata} /> */}
    </div>
  );
}

export default App;
