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

const LineChart = ({ id }) => {
  const [sheetData, setSheetData] = useState({});
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

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

          const initialCountry = data.countries.split(",")[0];

          setSelectedCountry({ value: initialCountry, label: initialCountry });
        } else {
          setSheetData({});
          setNoRecordFound(true);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
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
            options={sheetData.countries.split(",").map((country) => ({
              value: country,
              label: country,
            }))}
            value={selectedCountry}
            onChange={handleCountryChange}
            className="w-full max-w-xl mt-4"
          />

          <div className="w-[1000px]">
            {selectedCountry && (
              <Line
                data={getChartData(sheetData, selectedCountry.value)}
                className="w-full max-w-4xl mt-4"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LineChart;
