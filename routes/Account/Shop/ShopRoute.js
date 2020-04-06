const express = require('express');
const router = express.Router();

const ShopController = require('../../../controllers/Account/Shop/ShopController');

router.get('/v1/shop/profile', ShopController.on);
router.get('/v1/shop/profile/:id', ShopController.onId);
router.post('/v1/shop/create', ShopController.created);
router.put('/v1/shop/update/:id', ShopController.update);
router.delete('/v1/shop/remove/:id', ShopController.remove);

module.exports = router;