export const links = [
  { link: "Home", url: "/" },
  { link: "Upload", url: "/upload" },
  { link: "View", url: "/view" },
];

export const getChartData = (sheetData, selectedCountries) => {
  const labels = sheetData.years.split(",");
  const datasets = sheetData.datasets
    .filter((dataset) =>
      selectedCountries.some((country) => country.value === dataset.label)
    )
    .map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      fill: false,
      borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    }));

  return { labels, datasets };
};

export const colors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#FF9F40",
  "#4BC0C0",
  "#9966FF",
  "#C9CBCF",
  "#74C476",
  "#D0743C",
  "#A55D6D",
  "#FFA07A",
  "#20B2AA",
  "#87CEFA",
  "#778899",
  "#FF6347",
  "#6B8E23",
  "#2E8B57",
  "#FF69B4",
  "#8A2BE2",
  "#D2691E",
  "#5F9EA0",
  "#FFD700",
  "#BDB76B",
  "#FF4500",
  "#DA70D6",
  "#4682B4",
  "#7FFF00",
  "#BA55D3",
  "#40E0D0",
  "#FA8072",
  "#3CB371",
  "#FFB6C1",
  "#00CED1",
  "#ADFF2F",
  "#FF00FF",
  "#800080",
  "#00FF7F",
  "#7B68EE",
  "#DDA0DD",
];
