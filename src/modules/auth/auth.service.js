const User = require('../users/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const registerUser = async (userData) => {
    const user = await User.create(userData);
    const token = generateToken(user._id);
    return { user, token };
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const token = generateToken(user._id);
    return { user, token };
};

module.exports = {
    registerUser,
    loginUser,
};
