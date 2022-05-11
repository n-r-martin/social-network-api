const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// route -- /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:id
router.route('/:_id').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:id/reactions
router.route('/:thought_id/reactions').post(addReaction).delete(deleteReaction)


module.exports = router;