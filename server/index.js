const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const port = 8080;

app.post("/dates", (req, res) => {
  res.status(201).send(req.body);
});

app.listen(port, () => {
  console.log("listening");
});
