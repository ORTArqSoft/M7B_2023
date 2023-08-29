[1, 2, 3, 4].forEach((i) => {
  console.log(i);
});

function asyncForEach(array, cb) {
  array.forEach((i) => {
    setTimeout(cb(i), 0);
  });
}

asyncForEach([1, 2, 3, 4], (i) => () => {
  console.log(i);
});
