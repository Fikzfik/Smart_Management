const Activity = require('./activity.model');
const response = require('../../utils/response');

exports.getActivities = async (req, res) => {
    try {
        const activities = await Activity.find().populate('userId', 'name email');
        return response(res, 200, true, 'Activities retrieved', { activities });
    } catch (err) {
        return response(res, 500, false, err.message);
    }
};

exports.getActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id).populate('userId', 'name email');
        if (!activity) return response(res, 404, false, 'Activity not found');
        return response(res, 200, true, 'Activity retrieved', { activity });
    } catch (err) {
        return response(res, 500, false, err.message);
    }
};

exports.createActivity = async (req, res) => {
    try {
        req.body.userId = req.user.id;
        const activity = await Activity.create(req.body);
        return response(res, 201, true, 'Activity created', { activity });
    } catch (err) {
        return response(res, 400, false, err.message);
    }
};

exports.updateActivity = async (req, res) => {
    try {
        let activity = await Activity.findById(req.params.id);
        if (!activity) return response(res, 404, false, 'Activity not found');

        if (activity.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return response(res, 403, false, 'Not authorized to update this activity');
        }

        activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        return response(res, 200, true, 'Activity updated', { activity });
    } catch (err) {
        return response(res, 400, false, err.message);
    }
};

exports.deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) return response(res, 404, false, 'Activity not found');

        if (activity.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return response(res, 403, false, 'Not authorized to delete this activity');
        }

        await activity.deleteOne();
        return response(res, 200, true, 'Activity deleted');
    } catch (err) {
        return response(res, 500, false, err.message);
    }
};
