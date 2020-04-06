const express = require('express');
const router = express.Router();

const CertificationController = require('../../../controllers/Account/Shop/CertificationController');

router.get('/v1/shop/cert/list', CertificationController.on);
router.get('/v1/shop/cert/list/:id', CertificationController.onId);
router.post('/v1/shop/cert/create', CertificationController.created);
router.put('/v1/shop/cert/update/:id', CertificationController.update);
router.delete('/v1/shop/cert/remove/:id', CertificationController.remove);

module.exports = router;