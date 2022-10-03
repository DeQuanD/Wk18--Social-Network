const { json } = require('express');
const {Thoughts, User, Reaction} = require('../models');
const reactionSchema = require('../models/Reaction');

module.exports ={
getAllThoughts(req, res){
    Thoughts.find({})
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(404).json(err));
},
getThought(req, res){
    Thoughts.findOne({_id: req.params.thoughtId})
    .then((thought) => {
        if(thought === null){
            res.json({message: "Thought no longer exists"})
        }else{
            res.json(thought)
        }})
    .catch((err) => res.status(404).json(err))
},
createNewThought(req,res){
    Thoughts.create(req.body)
        .then((thought) => {
           return User.findOneAndUpdate(
            {_id: req.body.userId},
            {$addToSet: {thoughts: thought._id }},
            {new: true})
        })
         .then(() => res.json({message: "post created"}))   
        .catch((err) => res.status(404).json(err))
},
updateThought(req, res){
    Thoughts.findOneAndUpdate({_id: req.params.thoughtId}, {thoughtText:req.body.thoughtText},{new:true})
    .then((update) => res.json(update))
    .catch((err) => res.status(500).json(err))
},
deleteThought(req, res){
    Thoughts.findOneAndDelete({_id: req.params.thoughtId})
    .then(() =>{
       return User.findOneAndUpdate({_id: req.body.userId}, {$pull:{thoughts: req.params.thoughtId}}, {new:true})
    })
    .then(() => res.json({message: "Thought has been deleted"}))
    .catch((err) => res.status(500).json(err))
},
createReaction(req, res){
Thoughts.findOneAndUpdate({_id: req.params.thoughtId}, {$addToSet: {reactions:req.body}}, {new:true})
.then((reaction) => res.json(reaction))
.catch((err)=> res.status(500).json(err))
},
removeReaction(req, res){
    Thoughts.findById({_id: req.params.thoughtId})
   .then((thought) =>{
   Thoughts.findOneAndDelete({reactions: {reactionId: thought._Id}})})
    .then((reaction)=> res.json(reaction))
    .catch((err)=> res.status(500).json(err))}
}