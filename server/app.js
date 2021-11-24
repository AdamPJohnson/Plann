const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const { signup, login } = require("./models");

const users = {
  adam: "password",
  john: "password",
  t: "t",
};

app.post("/dates", (req, res) => {
  res.status(201).send(req.body);
});

app.post("/loginUser", (req, res) => {
  const { username, password } = req.body;
  login.loginUser({ username, password }).then((data) => {
    if (data.rows[0]) {
      res.status(200).send(data.rows[0]);
    } else {
      res.status(500).send();
    }
  });
});

app.post("/loginOrg", (req, res) => {
  const { username, password, zip } = req.body;
  login.loginOrg({ username, password, zip }).then((data) => {
    if (data.rows[0]) {
      res.status(200).send(data.rows[0]);
    } else {
      res.status(500).send();
    }
  });
});

app.post("/signupUser", (req, res) => {
  const { username, password, email, zip } = req.body;

  signup
    .signupUser({ username, password, email, zip })
    .then((data) => {
      console.log(data);
      if (data.rows[0]) {
        res.status(201).send(data.rows[0]);
      } else {
        res.status(500).send();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});
app.post("/signupOrg", (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    res.status(409).send();
  } else {
    users[username] = password;
    res.status(201).send();
  }
});

module.exports = app;
