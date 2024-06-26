import { colors } from "../constants/index.js";

const getChartData = (sheetData, selectedCountry) => {
  const labels = sheetData.years.split(",");

  const datasets = ["Low", "Medium", "High"].map((level, index) => {
    const dataset = sheetData.datasets.find(
      (dataset) =>
        dataset.country === selectedCountry && dataset.label === level
    );

    return dataset
      ? {
          label: level,
          data: dataset.data.map((value) =>
            parseInt(value.replace(/,/g, ""), 10)
          ),
          fill: false,
          borderColor: colors[index],
        }
      : {
          label: level,
          data: [],
          fill: false,
          borderColor: colors[index],
        };
  });

  return { labels, datasets };
};

export { getChartData };
