const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("give password as argument")
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://vaiser:${password}@fstackcluster.ohsoc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model("Person", personSchema)

if (process.argv[3] && process.argv[4]) {
    const newName = process.argv[3]
    const newNumber = process.argv[4]

    const newPerson = new Person({ name: newName, number: newNumber })

    newPerson.save().then((_) => {
        console.log("person saved")
        mongoose.connection.close()
    })
} else {
    Person.find({}).then((result) => {
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`)
        })

        mongoose.connection.close()
    })
}
