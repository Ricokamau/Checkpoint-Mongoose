const mongoose = require('mongoose');
const Person = require('./models/Person');
require('./db');

const createAndSavePerson = async () => {
  const newPerson = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['pizza', 'burger']
  });

  try {
    const data = await newPerson.save();
    console.log('Person saved:', data);
  } catch (err) {
    console.error(err);
  }
};

const createManyPeople = async (arrayOfPeople) => {
  try {
    const data = await Person.create(arrayOfPeople);
    console.log('People created:', data);
  } catch (err) {
    console.error(err);
  }
};

const findPeopleByName = async (personName) => {
  try {
    const data = await Person.find({ name: personName });
    console.log('People found:', data);
  } catch (err) {
    console.error(err);
  }
};

const findOneByFood = async (food) => {
  try {
    const data = await Person.findOne({ favoriteFoods: food });
    console.log('Person found:', data);
  } catch (err) {
    console.error(err);
  }
};

const findPersonById = async (personId) => {
  try {
    const data = await Person.findById(personId);
    console.log('Person found by ID:', data);
  } catch (err) {
    console.error(err);
  }
};

const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    person.favoriteFoods.push('fries');
    const updatedPerson = await person.save();
    console.log('Person updated:', updatedPerson);
  } catch (err) {
    console.error(err);
  }
};

const findAndUpdate = async (personName) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    console.log('Person updated:', updatedPerson);
  } catch (err) {
    console.error(err);
  }
};

const removeById = async (personId) => {
  try {
    const removedPerson = await Person.findByIdAndRemove(personId);
    console.log('Person removed:', removedPerson);
  } catch (err) {
    console.error(err);
  }
};

const removeManyPeople = async () => {
  try {
    const result = await Person.remove({ name: 'Mary' });
    console.log('People removed:', result);
  } catch (err) {
    console.error(err);
  }
};

const queryChain = async () => {
  try {
    const data = await Person.find({ favoriteFoods: 'burritos' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec();
    console.log('People found:', data);
  } catch (err) {
    console.error(err);
  }
};

// Run the functions here to test
createAndSavePerson();

