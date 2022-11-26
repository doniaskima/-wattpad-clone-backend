// import section
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();
//DB connection
mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connection.on("connected", () => {
    console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
    console.log("mongodb failed with", err);
});

//import routes
const userRoutes = require("./routes/user.routes");
const tagRoutes = require("./routes/tag.routes");
const authRoutes = require("./routes/auth.routes");
const storyRoutes = require("./routes/story.routes");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(helmet());
app.use(compression());

//router middleware
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/tags", tagRoutes);
app.use("/stories", storyRoutes);

app.get("/", (req, res) => {
    return res.send({ message: "Welcome :))" });
});
//server listening
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
