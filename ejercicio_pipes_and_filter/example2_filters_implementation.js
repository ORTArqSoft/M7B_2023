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

function processData(data, filters) {
  let currentData = data;

  for (const filter of filters) {
    currentData = filter(currentData);
  }
}

const filters = [
  (data) => filterByCategory(data, "Electronics"),
  (data) => calculateTotalSales(data),
  (totalSales) => storeResultsInDatabase(totalSales, "Electronics"),
];

processData(salesStream, filters);
