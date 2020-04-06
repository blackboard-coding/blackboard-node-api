const express = require('express');
const router = express.Router();

const OldListAllCategoryController = require('../../../controllers/Category/Category/OldListAllCategoryController');

router.get('/v1/category/list', OldListAllCategoryController.on);
router.get('/v1/category/list/:id', OldListAllCategoryController.onId);
router.post('/v1/category/create', OldListAllCategoryController.created);
router.put('/v1/category/update/:id', OldListAllCategoryController.update);
router.delete('/v1/category/remove/:id', OldListAllCategoryController.remove);

module.exports = router;