function test() {
  var result1 = $.getSync("<AN URI>");
  var result2 = $.getSync("<AN URI");

  console.log("result1", result1);
  console.log("result2", result2);
}

test();
