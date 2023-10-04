const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const statusRoutes = require("./routes/StatusRoutes");
const userRoutes = require("./routes/UserRoutes");
const postRoutes = require("./routes/PostRoutes");
const seedDatabase = require("./util/seeder");
const path = require("path");

const mongoURI = "mongodb://localhost:27017/assessment";

const app = express();

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    console.log("DB CONNECTED");
    seedDatabase(mongoURI);
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((error) => console.log("Error connectonh to db: ", error));

app.use(cors());
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "../assets")));
app.use("/api", statusRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);
