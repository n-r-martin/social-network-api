const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser
} = require('../../controllers/userController');

// route -- /api/users
router.route('/').get(getUsers).post(createUser);

// /api/user/:id
router.route('/:_id').get(getSingleUser).delete(deleteUser);

module.exports = router;