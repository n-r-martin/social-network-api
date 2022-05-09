const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the students
  const users = [];
  let thoughtsBank = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {

    const username = getRandomName();
    let email = `${username.split(' ')[0]}@${username.split(' ')[1]}.com`;
    let thoughts = [];
    for (let i = 0; i < 2; i++) {
      let thought = {
          thoughtText: getRandomThought(),
          username: username
      }
      thoughts.push(thought);
      thoughtsBank.push(thought);
    }

    let friends = [];

    for (let i = 0; i < 2; i++) {
      let friend = getRandomName();
      friends.push(friend)
    }

    users.push({
      username,
      email,
      thoughts,
      friends
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

    // Add users to the collection and await the results
    await Thought.collection.insertMany(thoughtsBank);


  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
