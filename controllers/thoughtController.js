const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params._id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => User.findOneAndUpdate(
        { _id: req.body.userId }, 
        { $addToSet: { thoughts: thought }}, 
        { new: true })
    .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with this id!'})    
            : res.json(user))
    .catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
  )
},
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params._id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({ message: 'Thought deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params._id }, 
      { thoughtText: req.body.thoughtText }, 
      { new: true })
    .then((thought) => 
    !thought
        ? res.status(404).json({ message: 'No thought with this id!'})    
        : res.json(thought))
    .catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
  },  
};
