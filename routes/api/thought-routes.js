const router = require('express').Router();
const{
    getAllThoughts,
    getThoughtById,
    addThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controllers');

router
.route('/')
.get(getAllThoughts)
.post(addThought);

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

router
.route('/:thoughtId/reactions/')
.post(addReaction)
.delete(removeReaction)

module.exports = router;