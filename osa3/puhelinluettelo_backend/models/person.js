const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

console.log("connecting to database at", url)

mongoose
    .connect(url)
    .then((result) => {
        console.log("succesfully connected to MongoDB")
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message)
    })

const personSchema = new mongoose.Schema({
    name: { type: String, minlength: 3, required: true, unique: true },
    number: {
        type: String,
        minlength: 8,
        validate: { validator: (value) => /\d{2,3}-\d+/gm.test(value) },
        required: true,
    },
})

personSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model("Person", personSchema)
