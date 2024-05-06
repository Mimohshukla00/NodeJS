const express = require("express");
const users = require("./MOCK_DATA(2).json");
const fs = require("fs");

require("dotenv").config();
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log("middleware 1");
//   req.name = "mimohshukla00";
//   // return res.json({ msg: "helllo from middleware-1" });
//   next();
// });
app.use((req, res, next) => {
  // console.log("middleware 2", req.name);
  fs.appendFile(
    "log.txt",
    `${Date.now()}:${req.method}:${req.path}`,
    (err, data) => {
      next();
    }
  );
  next();
});

// routes
app.get("/api/users", (req, res) => {
  console.log("users is parsed");
  return res.json(users);
});
// app.get("/api/renderusers", (req, res) => {
//     console.log(users)
//   const html = `
//     <ul>
//     ${users.map((user) => `<li>${user.last_name}</li>`).join("")}</ul>`;

//   res.send(html);
// });

app
  .route("api/users/:id")
  .get((req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === Number(id));
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log(body);

  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA(2).json", JSON.stringify(users), (err, data) => {
    return res.json({
      status: "pending",
    });
  });
  return res.json({ status: "pending" });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
