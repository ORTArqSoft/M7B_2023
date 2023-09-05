const { pipe } = require("pipe-then");

function filterByCategory(salesData, category) {
  return salesData.filter((sale) => sale.category === category);
}

function calculateTotalSales(filteredData) {
  return filteredData.reduce((total, sale) => total + sale.amount, 0);
}

function storeResultsInDatabase(totalSales, category) {
  console.log(`Total sales for ${category}: $${totalSales}`);
}

const salesStream = [
  { category: "Electronics", amount: 1000 },
  { category: "Books", amount: 500 },
  { category: "Electronics", amount: 800 },
  // ...
];

const dataProcessingPipeline = pipe(
  (data) => filterByCategory(data, "Electronics"),
  (data) => calculateTotalSales(data),
  (totalSales) => storeResultsInDatabase(totalSales, "Electronics")
);

dataProcessingPipeline(salesStream)
  .then(() => {
    console.log("Data processing complete");
  })
  .catch((error) => {
    console.error("Error during data processing:", error);
  });
