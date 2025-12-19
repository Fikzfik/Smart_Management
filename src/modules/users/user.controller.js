const User = require('./user.model');
const response = require('../../utils/response');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return response(res, 200, true, 'Users retrieved successfully', { users });
    } catch (err) {
        return response(res, 500, false, err.message);
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return response(res, 404, false, 'User not found');
        }
        return response(res, 200, true, 'User retrieved successfully', { user });
    } catch (err) {
        return response(res, 500, false, err.message);
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return response(res, 201, true, 'User created successfully', { user });
    } catch (err) {
        return response(res, 400, false, err.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return response(res, 404, false, 'User not found');
        }
        return response(res, 200, true, 'User updated successfully', { user });
    } catch (err) {
        return response(res, 400, false, err.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return response(res, 404, false, 'User not found');
        }
        return response(res, 200, true, 'User deleted successfully');
    } catch (err) {
        return response(res, 500, false, err.message);
    }
};
