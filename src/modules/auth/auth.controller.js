const authService = require('./auth.service');
const response = require('../../utils/response');

exports.register = async (req, res) => {
    try {
        const { token } = await authService.registerUser(req.body);
        return response(res, 201, true, 'User registered successfully', { token });
    } catch (err) {
        return response(res, 400, false, err.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token } = await authService.loginUser(email, password);
        return response(res, 200, true, 'User logged in successfully', { token });
    } catch (err) {
        return response(res, 401, false, err.message);
    }
};

exports.getMe = async (req, res) => {
    return response(res, 200, true, 'User data retrieved', { user: req.user });
};
