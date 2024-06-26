import { useEffect, useState } from "react";
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
import { getCapacityChartData } from "../utils/ChartUtil.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartCapacity = ({ id }) => {
  const [sheetData, setSheetData] = useState([]);
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setNoRecordFound(false);
      setError(null);

      try {
        const response = await axios.post(
          `https://solarpower-backend-2f0d59f7581f.herokuapp.com/api/sheetmetadata/ReadExcelData/${id}`
        );
        if (response.data && Object.keys(response.data).length > 0) {
          const data = response.data;
          setSheetData(data);

          console.log(data);

          const initialCountries = data.datasets.slice(0, 5).map((dataset) => ({
            value: dataset.label,
            label: dataset.label,
          }));

          setSelectedCountries(initialCountries);
          setStartYear(data.years.split(",")[0]);
          setEndYear(data.years.split(",").slice(-1)[0]);
        } else {
          setSheetData([]);
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

  const handleCountryChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions);
  };

  const handleStartYearChange = (selectedOption) => {
    setStartYear(selectedOption.value);
  };

  const handleEndYearChange = (selectedOption) => {
    setEndYear(selectedOption.value);
  };

  return (
    <div className="flex flex-col gap-4 p-4 justify-center items-center">
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
          />

          <div className="flex gap-4 w-full max-w-xl mt-4">
            <Select
              options={sheetData.years.split(",").map((year) => ({
                value: year,
                label: year,
              }))}
              value={{ value: startYear, label: startYear }}
              onChange={handleStartYearChange}
              className="w-full"
            />
            <Select
              options={sheetData.years.split(",").map((year) => ({
                value: year,
                label: year,
              }))}
              value={{ value: endYear, label: endYear }}
              onChange={handleEndYearChange}
              className="w-full"
            />
          </div>

          <div className="w-[1000px]">
            <Line
              data={getCapacityChartData(
                sheetData,
                selectedCountries,
                startYear,
                endYear
              )}
              className="w-full max-w-4xl mt-4"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LineChartCapacity;
