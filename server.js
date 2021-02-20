//Dependencies

const express = require("express");
const path = require("path");

//Sets up express app

const app = express();
const PORT = process.env.PORT || 3000;

//sets up express app to handle parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Routes
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

//Server listening

app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
