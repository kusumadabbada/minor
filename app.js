const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Set the view engine to ejs
app.set("view engine", "ejs");

app.use(
  "/public",
  express.static(__dirname + "/public", {
    setHeaders: function (res, path, stat) {
      res.set("Content-Type", "text/css");
    },
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/library", { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.use("/", require("./routes/index"));
app.use("/books", require("./routes/books"));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
