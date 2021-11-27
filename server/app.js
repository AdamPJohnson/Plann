const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const sha256 = require("js-sha256");

const { signup, login, event, eventFollow } = require("./models");

app.post("/orgEvents", (req, res) => {
  event
    .add(req.body)
    .then((d) => {
      console.log(d);
      res.status(201).send(req.body);
    })
    .catch((e) => console.log(e));
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

  signup
    .signupUser({ username, password: hashedPassword, email, zip })
    .then((data) => {
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

app.get("/userEvents/:userId", (req, res) => {
  const { userId } = req.params;
  event
    .getAllUserEvents(userId)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((e) => {
      console.log("failed to fetch user events: ", e);
      res.status(404).send([]);
    });
});

app.get("/orgEvents/:orgId", (req, res) => {
  const { orgId } = req.params;
  event
    .getAllOrgEvents(orgId)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((e) => {
      console.log("failed to fetch user events: ", e);
      res.status(404).send([]);
    });
});

app.delete("/userEvents/:userId/:id", (req, res) => {
  const { id, userId } = req.params;
  eventFollow
    .delete(id, userId)
    .then((d) => res.status(200).send())
    .catch((e) => {
      console.log("failed to delete eventfollow: ", e);
      res.status(500).send();
    });
});

app.delete("/orgEvents/:orgId/:id", (req, res) => {
  const { id, orgId } = req.params;
  event
    .delete(id, orgId)
    .then((d) => {
      res.status(200).send();
    })
    .catch((e) => {
      console.log("failed to delete event: ", e);
      res.status(500).send();
    });
});
module.exports = app;
