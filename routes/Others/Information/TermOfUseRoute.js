const express = require('express');
const router = express.Router();

const TermOfUseController = require('../../../controllers/Others/Information/TermOfUseController');

router.get('/v1/info/terms', TermOfUseController.on);
router.get('/v1/info/terms/:id', TermOfUseController.onId);
router.post('/v1/info/terms/create', TermOfUseController.created);
router.put('/v1/info/terms/update/:id', TermOfUseController.update);
router.delete('/v1/info/terms/remove/:id', TermOfUseController.remove);

module.exports = router;