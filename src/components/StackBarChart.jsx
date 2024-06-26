import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import Select from "react-select";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackBarChart = ({ id }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://solarpower-backend-2f0d59f7581f.herokuapp.com/api/sheetmetadata/ReadExcelData/${id}`
        );
        setData(response.data);
        setSelectedCountry(response.data.countries.split(",")[0]); // Set the initial country
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error.message}</p>;
  }

  if (!data || !data.datasets) {
    return <p className="text-center">No data available</p>;
  }

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value);
  };

  const chartData = {
    labels: data.years.split(","),
    datasets: data.datasets
      .filter((dataset) => dataset.country === selectedCountry)
      .map((dataset, index) => ({
        label: dataset.label,
        data: dataset.data.map((item) => parseFloat(item.replace(/,/g, ""))),
        backgroundColor: index === 0 ? "#4cc0c0" : "#ff6384",
        borderColor: "#4cc0c0",
        borderWidth: 1,
      })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Stacked Bar Chart",
      },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  const countryOptions = data.countries.split(",").map((country) => ({
    value: country,
    label: country,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Select
        options={countryOptions}
        value={{ value: selectedCountry, label: selectedCountry }}
        onChange={handleCountryChange}
        className="w-full mb-4"
      />
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StackBarChart;
