require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const app = express()
const Person = require("./models/person")

app.use(express.json())
morgan.token("body", (req, _) => JSON.stringify(req.body))
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :body")
)
app.use(express.static("build"))

app.get("/api/persons", (_, res) => {
    Person.find({}).then((persons) => res.json(persons))
})

app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id

    Person.findById(id)
        .then((person) => {
            if (!person) {
                res.sendStatus(404)
            } else {
                res.json(person)
            }
        })
        .catch(next)
})

app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id

    Person.findByIdAndDelete(id)
        .then((person) => {
            if (person) {
                res.json(person)
            } else {
                res.sendStatus(404)
            }
        })
        .catch(next)
})

app.put("/api/persons/:id", (req, res, next) => {
    const { name, number } = req.body
    const id = req.params.id

    Person.findByIdAndUpdate(
        id,
        { name: name, number: number },
        { new: true, runValidators: true, context: "query" }
    )
        .then((person) => {
            if (person) {
                res.json(person)
            } else {
                res.sendStatus(404)
            }
        })
        .catch(next)
})

app.post("/api/persons", (req, res, next) => {
    const { name, number } = req.body
    console.log("DSADSADSADSADSA\nFDSFDSFDSFDS")
    const newPerson = { name: name, number: number }

    Person.findOne(newPerson)
        .then((person) => {
            if (person) {
                res.status(409).json({ error: "name must be unique" })
            } else {
                const person = new Person(newPerson)
                person
                    .save()
                    .then((savedPerson) => res.json(savedPerson))
                    .catch(next)
            }
        })
        .catch(next)
})

app.get("/info", (req, res) => {
    Person.countDocuments({}).then((count) => {
        const message = `Phonebook has info for ${count} people
    ${new Date().toString()}`

        res.send(message)
    })
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === "CastError") {
        return res.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        console.log("DSFDSFDSFDSFDSFDSFDS\nDFDSFDSFDSFDS")
        return res.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
