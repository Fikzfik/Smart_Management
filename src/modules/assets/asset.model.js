const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add an asset name'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        trim: true,
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'used', 'maintenance'],
        default: 'available',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Asset', AssetSchema);
