const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dbConnect = require("./config/db");
const userRouter = require("./routes/authRoutes");
const restaurantRouter = require("./routes/restaurantRoutes");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", userRouter);
app.use("/restaurants", restaurantRouter);

app.listen(PORT, () => {
  console.log("listening...");
  dbConnect();
});
