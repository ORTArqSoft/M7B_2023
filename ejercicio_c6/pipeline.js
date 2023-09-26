class Pipeline {
  constructor() {
    // Initialize attributes
    this.filters = [];
  }
  use(filter) {
    this.filters.push(filter);
    // Add a filter to the execution flow
  }
  async run(input) {
    // Use a loop to execute filters sequentially with async/await
    let result = input;
    for (const filter of this.filters) {
      result = await filter(result);
    }
    return result;
  }
}

module.exports = { Pipeline };
