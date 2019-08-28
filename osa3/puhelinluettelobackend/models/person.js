const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

/*
const name = process.argv[2]
const number = process.argv[3]
*/

/*
const person = new Person({
  name: name,
  number: number,
}) 
*/

/*
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
      mongoose.connection.close()
    })
  })
}
*/

/*
} else {
  person.save().then(response => {
    console.log(`added ${name} number ${number} to phonebook`)
    console.log('note saved!');
    mongoose.connection.close();
  })
}
*/

module.exports = mongoose.model('Person', personSchema)