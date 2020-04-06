const express = require('express');
const router = express.Router();

const CategoryController = require('../../../controllers/PageHome/Home/CategoryController');

router.get('/v1/home/category', CategoryController.on);
router.get('/v1/home/category/:id', CategoryController.onId);
router.post('/v1/home/category/create', CategoryController.created);
router.put('/v1/home/category/update/:id', CategoryController.update);
router.delete('/v1/home/category/remove/:id', CategoryController.remove);

module.exports = router;