import { colors } from "../constants/index.js";

const getChartData = (sheetData, selectedCountries, startYear, endYear) => {
  const labels = sheetData.years.split(",");

  const startIndex = labels.indexOf(startYear);
  const endIndex = labels.indexOf(endYear);

  const filteredLabels = labels.slice(startIndex, endIndex + 1);

  const numDatasets = sheetData.datasets.length;
  const numColors = colors.length;

  if (numDatasets > numColors) {
    alert.warn(
      `Warning: Not enough colors (${numColors}) for datasets (${numDatasets}). Some colors will be reused.`
    );
  }

  const datasets = sheetData.datasets
    .filter((dataset) =>
      selectedCountries.some((country) => country.value === dataset.label)
    )
    .map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data.slice(startIndex, endIndex + 1),
      fill: false,
      borderColor: colors[index % numColors],
    }));

  return { labels: filteredLabels, datasets };
};

export { getChartData };
