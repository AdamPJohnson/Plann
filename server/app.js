const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
const sha256 = require("js-sha256");
var zipcodes = require("zipcodes");

const { signup, login, event, session, user, org } = require("./models");
/////try/catch here?

app.get("/session", async (req, res) => {
  if (!req.cookies.eventSession) {
    const hash = sha256((Math.random() * 1000).toString());
    res.cookie("eventSession", hash, {
      expires: new Date(Date.now() + 1800000), ///30 minute cookie
    });
    session.insert(hash);
    res.status(200).send();
  } else {
    const hash = req.cookies.eventSession;
    let currentSession = await session.check(hash);
    if (currentSession.rows[0] && currentSession.rows[0].user_id) {
      const currentUser = await user.getOne(currentSession.rows[0].user_id);
      res.status(200).send(currentUser.rows[0]);
    } else {
      res.status(200).send(false);
    }
  }
});

app.patch("/session/", async (req, res) => {
  const { id } = req.body;
  const hash = req.cookies.eventSession;
  session
    .addUser(hash, id)
    .then((d) => console.log(d))
    .catch((e) => console.log(e));
});
app.patch("/logout/", async (req, res) => {
  const { id } = req.body;
  const hash = req.cookies.eventSession;

  session
    .removeUser(hash, id)
    .then((d) => console.log(d))
    .catch((e) => console.log(e));
});
app.post("/orgEvents", (req, res) => {
  event
    .add(req.body)
    .then((d) => {
      res.status(201).send(req.body);
    })
    .catch((e) => console.log(e));
});

app.post("/loginUser", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = sha256(password);
  login
    .loginUser({ username })
    .then((data) => {
      if (data.rows[0]) {
        if (data.rows[0].password === hashedPassword) {
          res.status(200).send(data.rows[0]);
        } else {
          res.status(400).send();
        }
      } else {
        res.status(404).send();
      }
    })
    .catch((e) => console.log(e));
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
  const { orgName, username, password, email, zip, description } = req.body;
  const hashedPassword = sha256(password);
  signup
    .signupOrg({
      orgName,
      username,
      password: hashedPassword,
      email,
      zip,
      description,
    })
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
      res.status(200).send(data.rows.map((d) => d.json_agg[0]));
    })
    .catch((e) => {
      console.log("failed to fetch user events: ", e);
      res.status(404).send([]);
    });
});

app.patch("/userEvents/:userId/:id", (req, res) => {
  const { userId, id } = req.params;
  event
    .follow(id, userId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send(e);
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
app.get("/orgFollows/:userId", (req, res) => {
  const { userId } = req.params;
  user
    .getOrgFollows(userId)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((e) => {
      console.log("failed to fetch user events: ", e);
      res.status(404).send([]);
    });
});

app.patch("/orgFollows/:userId/:orgId", (req, res) => {
  const { userId, orgId } = req.params;
  org
    .follow(userId, orgId)
    .then((data) => {
      res.status(200).send();
    })
    .catch((e) => {
      console.log(e);
      console.log("failed to follow org: ", e);
      res.status(404).send([]);
    });
});
app.delete("/orgFollows/:userId/:orgId", (req, res) => {
  const { userId, orgId } = req.params;
  org
    .unfollow(userId, orgId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      console.log("failed to unfollow org: ", e);
      res.status(500).send([]);
    });
});

app.delete("/userEvents/:userId/:id", (req, res) => {
  const { id, userId } = req.params;
  event
    .unfollow(id, userId)
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

app.get("/nearbyEvents/:zip/", async (req, res) => {
  const { zip } = req.params;

  const distance = 5;
  const nearby = zipcodes.radius(zip, distance);
  let nearbyString = "(";
  nearby.forEach((zip) => (nearbyString += `'${zip}', `));
  nearbyString = nearbyString.slice(0, -2) + ")";
  event
    .getNearby(nearbyString)
    .then((d) => res.status(200).send(d.rows))
    .catch((e) => {
      res.status(500).send();
      console.log(e);
    });
});

app.get("/nearbyOrgs/:zip/", async (req, res) => {
  const { zip } = req.params;

  const distance = 5;
  const nearby = zipcodes.radius(zip, distance);
  let nearbyString = "(";
  nearby.forEach((zip) => (nearbyString += `'${zip}', `));
  nearbyString = nearbyString.slice(0, -2) + ")";
  org
    .getNearby(nearbyString)
    .then((d) => res.status(200).send(d.rows))
    .catch((e) => {
      res.status(500).send();
      console.log(e);
    });
});
module.exports = app;
