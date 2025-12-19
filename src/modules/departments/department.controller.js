const Department = require('./department.model');
const response = require('../../utils/response');

exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return response(res, 200, true, 'Departments retrieved', { departments });
    } catch (err) {
        return response(res, 500, false, err.message);
    }
};

exports.getDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) return response(res, 404, false, 'Department not found');
        return response(res, 200, true, 'Department retrieved', { department });
    } catch (err) {
        return response(res, 500, false, err.message);
    }
};

exports.createDepartment = async (req, res) => {
    try {
        const department = await Department.create(req.body);
        return response(res, 201, true, 'Department created', { department });
    } catch (err) {
        if (err.code === 11000) return response(res, 400, false, 'Department already exists');
        return response(res, 400, false, err.message);
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!department) return response(res, 404, false, 'Department not found');
        return response(res, 200, true, 'Department updated', { department });
    } catch (err) {
        return response(res, 400, false, err.message);
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department) return response(res, 404, false, 'Department not found');
        return response(res, 200, true, 'Department deleted');
    } catch (err) {
        return response(res, 500, false, err.message);
    }
};
