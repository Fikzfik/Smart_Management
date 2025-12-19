const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = require('./user.controller');
const { uploadPhoto } = require('./user.upload');
const { protect } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

const router = express.Router();

router.use(protect);

// Upload photo route (Accessible by authenticated users)
router.post('/photo', uploadPhoto);

router.use(authorize('admin')); // Only admin can manage users below

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
