const mongoose = require('mongoose')
require('dotenv').config()

/*
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}
*/

// const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = process.env.MONGODB_URI

console.log('connecting to url', url)


mongoose.connect(url, { useNewUrlParser: true })
    .then(result => {
        console.log('connected to', url)
    })
    .catch(error => {
        console.log('error connecting to MongoDB', error.message)
    })


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number,
})

if (process.argv.length === 2) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
            mongoose.connection.close()
        })
    })
} else {
    person.save().then(response => {
        console.log(`added ${name} number ${number} to phonebook`)
        console.log('note saved!');
        mongoose.connection.close();
    })
}