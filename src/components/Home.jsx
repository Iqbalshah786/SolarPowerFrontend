import axios from "axios";
import { useEffect, useState } from "react";
import RecordTable from "./RecordTable.jsx";
import { Circles } from "react-loader-spinner";

function App() {
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setMetadata(null);
      setNoRecordFound(false);

      try {
        const response = await axios.get(
          `http://localhost:5000/api/sheetmetadata/GetAllSheetMetadata`
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

    fetchData();
  }, []);

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
      {metadata && <RecordTable metadata={metadata} />}
    </div>
  );
}

export default App;
