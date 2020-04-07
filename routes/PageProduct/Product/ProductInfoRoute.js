const express = require('express');
const router = express.Router();

const ProductInfoController = require('../../../controllers/PageProduct/Product/ProductInfoController');

router.get('/v1/product', ProductInfoController.on);
router.get('/v1/product/:id', ProductInfoController.onId);
router.post('/v1/product/create', ProductInfoController.created);
router.put('/v1/product/update/:id', ProductInfoController.update);
router.delete('/v1/product/remove/:id', ProductInfoController.remove);

module.exports = router;