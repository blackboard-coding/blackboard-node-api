const express = require('express');
const router = express.Router();

const ListVideoInCategoryController = require('../../../controllers/Category/Category/ListVideoInCategoryController');

router.get('/v1/category/video', ListVideoInCategoryController.on);
router.get('/v1/category/video/:id', ListVideoInCategoryController.onId);
router.post('/v1/category/video/create', ListVideoInCategoryController.created);
router.put('/v1/category/video/update/:id', ListVideoInCategoryController.update);
router.delete('/v1/category/video/remove/:id', ListVideoInCategoryController.remove);

module.exports = router;