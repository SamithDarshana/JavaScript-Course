function greet(name, callback) {
  console.log(`Hello, ${name}`);
  callback();
}

function greetCallback() {
  console.log("This is callback function");
}

//greet("Alice", greetCallback);

// greet("Alice", () => {
//   console.log("This is callback function");
// });

// function fetchData(callback) {
//   console.log("Fetching data...");

//   setTimeout(() => {
//     console.log("Data fetched successfully");
//     callback();
//   }, 2000);
// }

// fetchData(() => {
//   console.log("This is the callback function executed after fetching data");
// });

console.log("Before");
getUser(1, (user) => {
  console.log(user);
});
console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    callback({ id: id, name: "Alice" });
  }, 2000);
}
