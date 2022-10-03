const router = require('express').Router();
const {getAllThoughts, getThought, createNewThought, updateThought, deleteThought,createReaction, removeReaction} =require('../../controllers/thoughtsController')

router.route('/')
.post(createNewThought)
.get(getAllThoughts)


router.route('/:thoughtId')
.get(getThought)
.put(updateThought)
.delete(deleteThought)

router.route('/:thoughtId/reactions')
.post(createReaction)
.delete(removeReaction)
module.exports = router