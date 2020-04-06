const express = require('express');
const router = express.Router();

const UserProfileController = require('../../../controllers/Account/Account/UserProfileController');

router.get('/v1/account/profile', UserProfileController.on);
router.get('/v1/account/profile/:id', UserProfileController.onId);
router.post('/v1/account/profile/create', UserProfileController.created);
router.put('/v1/account/profile/update/:id', UserProfileController.update);
router.delete('/v1/account/profile/remove/:id', UserProfileController.remove);

module.exports = router;