const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create User model
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
    thoughts: [thoughtSchmea],
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
