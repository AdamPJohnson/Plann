const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const port = 8080;

const users = {
  adam: "password",
  john: "password",
};

app.post("/dates", (req, res) => {
  res.status(201).send(req.body);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    res.status(409).send();
  } else {
    users[username] = password;
    res.status(201).send();
  }
});

app.listen(port, () => {
  console.log("listening");
});
