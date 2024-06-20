import axios from "axios";
import { useState } from "react";
import RecordTable from "./RecordTable.jsx";

function App() {
  const [sheetId, setSheetId] = useState("");
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setSheetId(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.get(`/api/sheetmetadata/${sheetId}`);
      if (!response) {
        throw new Error("No response from server");
      }
      const data = response.data;

      setMetadata(data);
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
      {error && (
        <p>
          Error : {error} <br /> {error.message}
        </p>
      )}
      <RecordTable metadata={metadata} />
    </div>
  );
}

export default App;
