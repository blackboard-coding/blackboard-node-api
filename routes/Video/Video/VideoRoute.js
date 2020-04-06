const express = require('express');
const router = express.Router();

const VideoController = require('../../../controllers/Video/Video/VideoController');

router.get('/v1/video/list', VideoController.on);
router.get('/v1/video/list/:id', VideoController.onId);
router.post('/v1/video/create', VideoController.created);
router.put('/v1/video/update/:id', VideoController.update);
router.delete('/v1/video/remove/:id', VideoController.remove);

module.exports = router;