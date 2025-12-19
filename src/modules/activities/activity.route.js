const express = require('express');
const {
    getActivities,
    getActivity,
    createActivity,
    updateActivity,
    deleteActivity,
} = require('./activity.controller');
const { protect } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);

router.route('/').get(getActivities).post(createActivity);

router
    .route('/:id')
    .get(getActivity)
    .put(updateActivity)
    .delete(deleteActivity);

module.exports = router;
