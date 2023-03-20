const express = require("express");
const cors = require("cors");
const companiesRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(companiesRoutes);

app.get("/health", (req, res) => {
  return res.json("working");
});

app.listen(3333, () => console.log("Server is up in 3333"));