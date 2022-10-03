const User = require('../models/User')

module.exports ={
    getAllUsers(req, res){
        User.find({})
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },
    getUser(req, res){
        User.findOne({_id:req.params.userId})
        .then((user) =>{
            if(user){
                 res.json(user)   
            }else{
                res.status(404).json({Error:"No user exists with that ID"})
            }
        })
    },
    createNewUser(req, res){
        User.create(req.body)
        .then((userData) => res.json(userData))
       .catch((err) => res.status(404).json(err))
    },
    updateUser(req, res){
        User.findOneAndUpdate({_id:req.params.userId}, req.body,{new: true})
        .then((userUpdate) => res.json(userUpdate))
        .catch((err) => res.status(500).json(err))
    
    },
    deleteUser(req, res){
        User.findOneAndDelete({_id:req.params.userId})
        .then(() => res.json({message: "user has been deleted"}))
        .catch((err) => res.status(500).json(err))
    },
    addFriend(req, res){
        User.findOneAndUpdate({_id:req.params.userId}, {$addToSet:{friends: req.params.friendId}}, {new: true})
        .then((friend) => res.json(friend))
        .catch((err) => res.status(500).json(err))
    },
    removeFriend(req, res){
        User.findOneAndUpdate({_id:req.params.userId}, {$pull:{friends: req.params.friendId}}, {new: true})
        .then(() => res.json({message: "Friend has been removed"}))
        .catch((err) => res.status(500).json(err))
    }
}