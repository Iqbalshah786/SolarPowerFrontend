import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import Select from "react-select";
import { getChartData } from "../utils/ChartUtil.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const View = () => {
  const [sheetId, setSheetId] = useState("");
  const [sheetData, setSheetData] = useState([]);
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleInputChange = (e) => {
    setSheetId(e.target.value);
    console.log(sheetId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNoRecordFound(false);
    setError(null);

    try {
      const response = await axios.post(
        `/api/sheetmetadata/ReadDataByCountries/${sheetId}`
      );
      if (response.data && Object.keys(response.data).length > 0) {
        const data = response.data;
        setSheetData(data);

        const initialCountries = data.datasets.slice(0, 10).map((dataset) => ({
          value: dataset.label,
          label: dataset.label,
        }));
        console.log(initialCountries);
        console.log(sheetData);
        setSelectedCountries(initialCountries);
      } else {
        setSheetData([]);
        setNoRecordFound(true);
        console.log("No record found");
      }
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountryChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions);
  };

  return (
    <div className="flex flex-col gap-4 p-4 justify-center items-center ">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={sheetId}
          onChange={handleInputChange}
          placeholder="Enter sheet id: "
          className="border-2 border-gray-300 p-4 mr-4"
          required
        />
        <button type="submit" className="border-2 bg-blue-500 text-white p-4">
          Get data
        </button>
      </form>

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
      {noRecordFound && <p className="text-red-500 mt-4">No record found</p>}
      {error && <p className="text-red-500 mt-4">{error.message}</p>}

      {sheetData.datasets && sheetData.datasets.length > 0 && (
        <>
          <Select
            isMulti
            options={sheetData.datasets.map((dataset) => ({
              value: dataset.label,
              label: dataset.label,
            }))}
            value={selectedCountries}
            onChange={handleCountryChange}
            className="w-full max-w-xl mt-4"
          ></Select>

          <Line
            data={getChartData(sheetData, selectedCountries)}
            className="w-full max-w-4xl mt-4"
          />
        </>
      )}
    </div>
  );
};

export default View;
