//Dependencies

const express = require("express");
const path = require("path");
const fs = require("fs");
const savedNotes = require("./db/db.json");
const uniqid = require("uniqid");

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

//Captures json/allows notes to be displayed

app.get("/api/notes", (req, res) => {
  return res.json(savedNotes);
});

//=======================================================================
//Posting
//=======================================================================

//Creates new object from user input and assigns random id

app.post("/api/notes", (req, res) => {
  var newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uniqid(),
  };
  console.log(newNote);

  // writes to json file

  savedNotes.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err) => {
    if (err) throw err;
    return res.json(savedNotes);
  });
});

//Server listening

app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
