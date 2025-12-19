const express = require('express');
const {
    getAssets,
    getAsset,
    createAsset,
    updateAsset,
    deleteAsset,
} = require('./asset.controller');
const Asset = require('./asset.model');
const advancedResults = require('../../middlewares/advancedResults');
const { protect } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(advancedResults(Asset, { path: 'departmentId', select: 'name' }), getAssets)
    .post(authorize('admin', 'staff'), createAsset);

router
    .route('/:id')
    .get(getAsset)
    .put(authorize('admin', 'staff'), updateAsset)
    .delete(authorize('admin'), deleteAsset);

module.exports = router;
