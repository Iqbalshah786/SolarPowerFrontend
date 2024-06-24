import axios from "axios";
import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import DocumentTable from "./DocumentTable.jsx";
import DocumentForm from "./DocumentForm.jsx";

function Document() {
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    setMetadata(null);
    setNoRecordFound(false);

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

  return (
    <div className="flex flex-col gap-4 p-4 justify-center items-center ">
      {isLoading && (
        <div className="mt-4 ">
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
      {metadata && (
        <DocumentTable metadata={metadata} onFormSubmit={handleFormSubmit} />
      )}
      <DocumentForm onFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default Document;
