import { useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [typeId, setTypeId] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClearEnabled, setIsClearEnabled] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleTypeIdChange = (e) => {
    setTypeId(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadMessage("Please select a file to upload.");
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("typeId", typeId);

    setIsLoading(true);
    setUploadMessage("");

    try {
      const response = await axios.post(
        "https://solarpower-backend-2f0d59f7581f.herokuapp.com/api/sheetmetadata/UploadExcel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadMessage(`File uploaded successfully: ${response.data.fileName}`);

      setIsClearEnabled(true);
    } catch (error) {
      setUploadMessage(`Error uploading file: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setTypeId("");
    setUploadMessage("");
    setIsClearEnabled(false);
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center gap-4">
      <form
        onSubmit={handleUpload}
        className="flex flex-col gap-4 items-center"
      >
        <div className="flex gap-4 items-center">
          <select
            value={typeId}
            onChange={handleTypeIdChange}
            className="border-2 border-gray-300 p-2 mb-4"
            disabled={isLoading}
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="Capacity">Capacity</option>
            <option value="Segment">Segment</option>
            <option value="CapacityScenario">Capacity Scenario</option>
          </select>
          <input
            type="file"
            onChange={handleFileChange}
            className="border-2 border-gray-300 p-2 mb-4"
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="border-2 bg-blue-500 text-white p-2"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload File"}
          </button>
          <button
            onClick={handleClear}
            className={`border-2 text-white p-2 ${isClearEnabled ? "bg-red-500" : "bg-gray-500"}`}
            disabled={!isClearEnabled}
          >
            Clear
          </button>
        </div>
      </form>
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
      {uploadMessage && <p className="mt-4 text-green-500">{uploadMessage}</p>}
    </div>
  );
};

export default Upload;
