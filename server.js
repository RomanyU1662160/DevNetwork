const express = require("express");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/dbConnection");
const auth = require("./middleware/auth");

const app = express();

//init Middlware to use the body parser
app.use(express.json({ extended: false }));

//connerct to the dataBase
connectDB();

/*
Routes 
*/
app.get("/", (req, res) => res.send("Api is Running...."));
app.get("/users", (req, res) => res.send("This is the user page ...."));

// @define the routes using express Router
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

// server listen to the port
app.listen(PORT, () =>
  console.log(`express server is running on port ${PORT}`)
);
