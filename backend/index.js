const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const PORT = 5000;

connectToMongo();

app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, ()=>console.log(`SERVER RUNNING ON PORT ${PORT}`));
