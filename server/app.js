const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
// const bodyparser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const auth = require("./middleware/requireJWT");
const isAdmin = require("./middleware/isAdmin");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error(
    "MongoDB URI is not defined. Please check your environment variables."
  );
  process.exit(1); // Exit the application if MongoDB URI is not defined
}
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

const port = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", userRoutes);
app.use("/api", uploadRoutes);
app.get("/", auth, isAdmin, (req, res) => {
  res.send("Hello world");
});
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
