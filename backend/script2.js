const largeNumber = 356;

// export default largeNumber;
module.exports = { largeNumber: largeNumber };

const fs = require("fs");

// fs.readFile("./hello.txt", (err, data) => {
//   console.time("funchallenge");
//   if (err) {
//     console.log("errorrr");
//   }
//   const input = data.toString("utf8");

//   let dict = {};
//   for (i = 0; i < input.length; i++) {
//     let key = input[i];
//     if (!(key in dict)) {
//       dict[key] = 1;
//     } else {
//       dict[key]++;
//     }
//   }

//   let output = dict["("] - dict[")"];
//   console.log(output);
//   console.timeEnd("funchallenge");
// });

fs.readFile("./hello.txt", (err, data) => {
  console.time("funchallenge");
  if (err) {
    console.log("errorrr");
  }
  const input = data.toString("utf8");
  const directions = input.split("");

  const answer = directions.reduce((acc, currentValue) => {
    if (currentValue === "(") {
      return (acc += 1);
    } else if (currentValue === ")") {
      return (acc -= 1);
    }
  }, 0);
  console.log("floor: ", answer);
  console.timeEnd("funchallenge");
});
