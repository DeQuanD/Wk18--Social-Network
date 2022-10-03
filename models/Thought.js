const {Schema, model} = require('mongoose');
const reaction = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {   
            type: String, 
            required:true,
            minLength: 1,
            maxLength: 280
         },

         createdAt:{
            type: Date,
            default: Date.now()
         },
            // use .populate(user, username)
         username:{
            type: String,
            ref: "User",
            required:true,
         },
         reactions:[reaction]
    },
    {
        toJSON:{
            virtuals: true
        }
    }
);

thoughtSchema.virtual("reactionCount").get(function()
    {
      return this.reactions.length
    }
);

const Thoughts = model('Thoughts', thoughtSchema)
module.exports = Thoughts;