const express = require('express');
const router = express.Router();

const CategoryTwoController = require('../../../controllers/HomeMain/Home/CategoryTwoController');

router.get('/v1/section/two/category', CategoryTwoController.on);
router.get('/v1/section/two/category/:id', CategoryTwoController.onId);
router.post('/v1/section/two/category/create', CategoryTwoController.created);
router.put('/v1/section/two/category/update/:id', CategoryTwoController.update);
router.delete('/v1/section/two/category/remove/:id', CategoryTwoController.remove);

module.exports = router;