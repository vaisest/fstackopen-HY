require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const Person = require("./models/person");

app.use(express.json());
morgan.token("body", (req, _) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("build"));

app.get("/api/persons", (_, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  Person.findById(id)
    .then((person) => {
      if (!person) {
        res.sendStatus(404);
      } else {
        res.json(person);
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  Person.findByIdAndDelete(id)
    .then((person) => res.json(person))
    .catch((_) => res.sendStatus(404));
});

app.put("/api/persons/:id", (req, res) => {
  const data = req.body;
  const id = req.params.id;

  if (!(data.name && data.number)) {
    res.sendStatus(400);
  }

  const newPerson = { name: data.name, number: data.number };

  Person.findByIdAndUpdate(id, newPerson).then((person) => res.json(person));
});

app.post("/api/persons", (req, res) => {
  const data = req.body;

  if (!(data.name && data.number)) {
    res.sendStatus(400);
  }

  const newPerson = { name: data.name, number: data.number };

  Person.findOne(newPerson).then((person) => {
    if (person) {
      res.status(409).json({ error: "name must be unique" });
    } else {
      const person = new Person(newPerson);
      person.save().then((savedPerson) => res.json(savedPerson));
    }
  });
});

app.get("/info", (req, res) => {
  const message = `Phonebook has info for ${4} people
    ${new Date().toString()}`;
  res.send(message);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
