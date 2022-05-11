const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');


module.exports = {
  // Get all users
  // route -- api/users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user
  // route -- api/users/:user_id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params._id })
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


  // create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

    // Update a user
    updateUser(req, res) {
      User.findOneAndUpdate({ _id: req.params._id }, 
        { username: req.body.username, email: req.body.email }, 
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

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params._id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

    // Add a friend to a user
    addFriend(req, res) {
      User.findOneAndUpdate({ _id: req.params.user_id }, 
         { $addToSet: { friends: req.params.friend_id }},
         { new: true })
         .then((user) => 
         !user
             ? res.status(404).json({ message: 'No user with this id!'})    
             : res.json(user))
         .catch((err) => {
             console.log(err)
             res.status(500).json(err)
         })
  },

  // Delete a friend from a user
  deleteFriend(req, res) {
      User.findOneAndUpdate({ _id: req.params.user_id },
          { $pull: { friends: req.params.friend_id }},
          { new: true })
          .then((user) => 
          !user
              ? res.status(404).json({ message: 'No user with this id!'})    
              : res.json(user))
          .catch((err) => {
              console.log(err)
              res.status(500).json(err)
          })
  }
};
