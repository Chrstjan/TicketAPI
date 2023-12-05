const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

const ticketRouter = require("./routes/ticket.routes");
const userRouter = require("./routes/user.routes");
const profileRouter = require("./routes/profile.route");

app.use(ticketRouter);
app.use(userRouter);
app.use(profileRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is running at port ", PORT);
});
