const response = require('../utils/response');

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return response(res, 401, false, 'User not authenticated');
        }
        if (!roles.includes(req.user.role)) {
            return response(
                res,
                403,
                false,
                `User role ${req.user.role} is not authorized to access this route`
            );
        }
        next();
    };
};

module.exports = { authorize };
