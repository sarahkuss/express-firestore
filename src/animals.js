import { db } from './dbConnect.js'

export function addNewAnimal(req,res) {
  const newAnimal = req.body  // request should come with a body, and that body should be  a new animal
  db.collection('animals').add(newAnimal)  // creates the collection in firestore
  .then(doc => res.status(201).send("New Animal Added: " + doc.id))
  .catch(err => res.status(500).send(err)) // responding with error 500 (we did something wrong)
}

export async function getAllAnimals(req, res) {
  const collection = await db.collection('animals').get()
    .catch(err => res.status(500).send(err)) // handling error
  //const animalList = collection.docs.map(animal => animal.data()) --> without the id
  const animalList = collection.docs.map(animal => ({...animal.data(), id: animal.id}))
  res.send(animalList)
}