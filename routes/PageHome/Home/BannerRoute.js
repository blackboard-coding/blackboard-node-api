const express = require('express');
const router = express.Router();

const BannerController = require('../../../controllers/PageHome/Home/BannerController');

router.get('/v1/home/banner', BannerController.on);
router.get('/v1/home/banner/:id', BannerController.onId);
router.post('/v1/home/banner/create', BannerController.created);
router.put('/v1/home/banner/update/:id', BannerController.update);
router.delete('/v1/home/banner/remove/:id', BannerController.remove);

module.exports = router;