const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thoughts');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique : true,
      required: true,
      dropDups: true,
      trim: true
    },
    email: {
      type: String,
      unique : true,
      required: true,
      match: /.+\@.+\..+/,
      dropDups: true
    },
    thoughts: [thoughtsSchmea],
    friends: [this]
    },
    {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
