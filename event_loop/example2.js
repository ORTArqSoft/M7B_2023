function foo() {
  throw new Error("An error occurs");
}

function bar() {
  foo();
}

function baz() {
  bar();
}

baz();
