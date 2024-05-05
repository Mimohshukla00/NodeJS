const fs = require("fs");
const os = require("os");

console.log(os.cpus().length);
//sync
// fs.writeFileSync("./test.txt","hello there ")

//async

fs.writeFile("/test.txt", "hello from mimohshukla", (err) => {
  console.log(err);
});
fs.readFile("/test.txt", "utf-8", (err) => {
  if (err) {
    console.log(err);
  } else {
    // console.log();
  }
});
