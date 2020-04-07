const express = require('express');
const router = express.Router();

const FollowOwnerController = require('../../../controllers/PageProduct/Product/FollowOwnerController');

router.get('/v1/owner/follower', FollowOwnerController.on);
router.get('/v1/owner/follower/:id', FollowOwnerController.onId);
router.post('/v1/owner/follower/create', FollowOwnerController.created);
router.put('/v1/owner/follower/update/:id', FollowOwnerController.update);
router.delete('/v1/owner/follower/remove/:id', FollowOwnerController.remove);

module.exports = router;