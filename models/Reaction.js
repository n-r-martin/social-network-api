const { Schema, model } = require('mongoose');

// Schema to create reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username:  {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    createdAt: {
      type: Date,
      default: Date.now,
        },
    },
    {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = reactionSchema
