const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const sha256 = require("js-sha256");

const { signup, login, event } = require("./models");

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
  const hashedPassword = sha256(password);
  login.loginUser({ username }).then((data) => {
    if (data.rows[0]) {
      if (data.rows[0].password === hashedPassword) {
        res.status(200).send(data.rows[0]);
      } else {
        res.status(400).send();
      }
    } else {
      res.status(404).send();
    }
  });
});

app.post("/loginOrg", (req, res) => {
  const { username, password, zip } = req.body;
  const hashedPassword = sha256(password);
  login.loginOrg({ username, password, zip }).then((data) => {
    if (data.rows[0]) {
      if (data.rows[0].password === hashedPassword) {
        res.status(200).send(data.rows[0]);
      } else {
        res.status(400).send();
      }
    } else {
      res.status(404).send();
    }
  });
});

app.post("/signupUser", (req, res) => {
  const { username, password, email, zip } = req.body;
  const hashedPassword = sha256(password);
  console.log(hashedPassword);

  signup
    .signupUser({ username, password: hashedPassword, email, zip })
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
  const { username, password, email, zip } = req.body;
  const hashedPassword = sha256(password);
  signup
    .signupOrg({ username, password: hashedPassword, email, zip })
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

app.get("/events/:userId", (req, res) => {
  const { userId } = req.params;
  event
    .getAll(userId)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((e) => {
      console.log("failed to fetch user events: ", e);
      res.status(404).send([]);
    });
});
module.exports = app;
