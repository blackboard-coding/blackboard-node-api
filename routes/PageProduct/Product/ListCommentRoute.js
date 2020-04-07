const express = require('express');
const router = express.Router();

const ListCommentController = require('../../../controllers/PageProduct/Product/ListCommentController');

router.get('/v1/comment', ListCommentController.on);
router.get('/v1/comment/:id', ListCommentController.onId);
router.post('/v1/comment/create', ListCommentController.created);
router.put('/v1/comment/update/:id', ListCommentController.update);
router.delete('/v1/comment/remove/:id', ListCommentController.remove);

module.exports = router;