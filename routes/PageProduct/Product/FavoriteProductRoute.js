const express = require('express');
const router = express.Router();

const FavoriteProductController = require('../../../controllers/PageProduct/Product/FavoriteProductController');

router.get('/v1/product/favorite', FavoriteProductController.on);
router.get('/v1/product/favorite/:id', FavoriteProductController.onId);
router.post('/v1/product/favorite/create', FavoriteProductController.created);
router.put('/v1/product/favorite/update/:id', FavoriteProductController.update);
router.delete('/v1/product/favorite/remove/:id', FavoriteProductController.remove);

module.exports = router;