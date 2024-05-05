const http = require("http");

const myserver = http.createServer((req, res) => {
  console.log("new server Rec");
  console.log(req);
  res.end("hello from server again");
});

myserver.listen(8000, () => {
  console.log("server is running on port 8000");
});
