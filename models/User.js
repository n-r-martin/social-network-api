const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

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
    thoughts: {type: Array, ref: 'thought'},
    friends: {type: Array, ref: 'user'}
    },
    {
    toJSON: {
      getters: true,
    },
  }
);

userSchema
    .virtual('friendCount')
    // does this syntax below actually work???
    .get(() => {
        if (this.friends) {
            return this.friends.length
        }
    })

const User = model('user', userSchema)

module.exports = User;
