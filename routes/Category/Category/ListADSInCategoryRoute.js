const express = require('express');
const router = express.Router();

const ListADSInCategoryController = require('../../../controllers/Category/Category/ListADSInCategoryController');

router.get('/v1/category/ads', ListADSInCategoryController.on);
router.get('/v1/category/ads/:id', ListADSInCategoryController.onId);
router.post('/v1/category/ads/create', ListADSInCategoryController.created);
router.put('/v1/category/ads/update/:id', ListADSInCategoryController.update);
router.delete('/v1/category/ads/remove/:id', ListADSInCategoryController.remove);

module.exports = router;