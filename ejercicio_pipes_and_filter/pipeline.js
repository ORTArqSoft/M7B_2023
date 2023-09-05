class Pipeline {
  constructor() {
    // Initialize attributes
    this.filters = [];
  }
  use(filter) {
    this.filters.push(filter);
    // Add a filter to the execution flow
  }
  run(input) {
    /* Execute the first filter and then pass the modified input
        to the next filter
        */
    const result = this.filters.reduce(function (total, function_item) {
      return function_item(total);
    }, input);

    return result;
  }
}

//function _function(total, function_item) {
//    return function_item(total);
//}

module.exports = { Pipeline };
