const express = require('express');
const {
    getDepartments,
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment,
} = require('./department.controller');
const { protect } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getDepartments)
    .post(authorize('admin'), createDepartment);

router
    .route('/:id')
    .get(getDepartment)
    .put(authorize('admin'), updateDepartment)
    .delete(authorize('admin'), deleteDepartment);

module.exports = router;
