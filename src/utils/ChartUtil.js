import { colors } from "../constants/index.js";

const getChartData = (sheetData, selectedCountries) => {
  const labels = sheetData.years.split(",");

  const numDatasets = sheetData.datasets.length;
  const numColors = colors.length;

  if (numDatasets > numColors) {
    console.warn(
      `Warning: Not enough colors (${numColors}) for datasets (${numDatasets}). Some colors will be reused.`
    );
  }

  const datasets = sheetData.datasets
    .filter((dataset) =>
      selectedCountries.some((country) => country.value === dataset.label)
    )
    .map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      fill: false,
      borderColor: colors[index % numColors],
    }));

  return { labels, datasets };
};

export { getChartData };
