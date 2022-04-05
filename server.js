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
  .then(() => console.log("connected to server"))
  .catch((err) => console.error(err));

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("node connected to database"));

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const patientRoute = require("./routes/patientRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/patient", patientRoute);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
