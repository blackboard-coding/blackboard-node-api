const express = require('express');
const router = express.Router();

const FreeVideoController = require('../../../controllers/PageHome/Home/FreeVideoController');

router.get('/v1/home/freevdo', FreeVideoController.on);
router.get('/v1/home/freevdo/:id', FreeVideoController.onId);
router.post('/v1/home/freevdo/create', FreeVideoController.created);
router.put('/v1/home/freevdo/update/:id', FreeVideoController.update);
router.delete('/v1/home/freevdo/remove/:id', FreeVideoController.remove);

module.exports = router;