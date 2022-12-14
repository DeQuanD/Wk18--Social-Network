const {Schema, mongoose} = require('mongoose')


const reactionSchema = new Schema({
    reactionId: {
        type: mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId,
    },
    reactionbody:{
        type:String,
        required:true,
        maxLength: 280,
    },
    username:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },

});


module.exports = reactionSchema;