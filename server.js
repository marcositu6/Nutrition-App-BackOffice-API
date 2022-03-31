const cors = require("cors");
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || process.argv[2] || 8080;

mongoose
  .connect(
    `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`,
    {
      dbName: "aureaBO",
      autoIndex: true,
    }
  )
  .then(() => console.log("connected to server"));

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("node connected to database"));

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/admin");
const patientRoute = require("./routes/adminRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRoute);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
