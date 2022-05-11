const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// route -- /api/users
router.route('/').get(getUsers).post(createUser);

// /api/user/:id
router.route('/:_id').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/user/:user_id/friends/:friend_id
router.route('/:user_id/friends/:friend_id').post(addFriend).delete(deleteFriend)

module.exports = router;