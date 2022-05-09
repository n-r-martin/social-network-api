const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1
    },
    username:  {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema]
    },
    {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

thoughtSchema
    .virtual('reactionCount')
    .get(() => {
        if(this.reactions){
            return this.reactions.length
        }
    })

const Thought = model('thought', thoughtSchema)

module.exports = Thought;
