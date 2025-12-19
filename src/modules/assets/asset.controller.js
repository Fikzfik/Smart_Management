const Asset = require('./asset.model');
const response = require('../../utils/response');

exports.getAssets = async (req, res) => {
    res.status(200).json(res.advancedResults);
};

exports.getAsset = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id).populate('departmentId', 'name');
        if (!asset) return response(res, 404, false, 'Asset not found');
        return response(res, 200, true, 'Asset retrieved', { asset });
    } catch (err) {
        return response(res, 500, false, err.message);
    }
};

exports.createAsset = async (req, res) => {
    try {
        const asset = await Asset.create(req.body);
        return response(res, 201, true, 'Asset created', { asset });
    } catch (err) {
        return response(res, 400, false, err.message);
    }
};

exports.updateAsset = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!asset) return response(res, 404, false, 'Asset not found');
        return response(res, 200, true, 'Asset updated', { asset });
    } catch (err) {
        return response(res, 400, false, err.message);
    }
};

exports.deleteAsset = async (req, res) => {
    try {
        const asset = await Asset.findByIdAndDelete(req.params.id);
        if (!asset) return response(res, 404, false, 'Asset not found');
        return response(res, 200, true, 'Asset deleted');
    } catch (err) {
        return response(res, 500, false, err.message);
    }
};
