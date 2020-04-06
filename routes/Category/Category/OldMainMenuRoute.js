const express = require('express');
const router = express.Router();

const OIdMainMenuController = require('../../../controllers/Category/Category/OIdMainMenuController');

router.get('/v1/menu/category', OIdMainMenuController.on);
router.get('/v1/menu/category/:id', OIdMainMenuController.onId);
router.post('/v1/menu/category/create', OIdMainMenuController.created);
router.put('/v1/menu/category/update/:id', OIdMainMenuController.update);
router.delete('/v1/menu/category/remove/:id', OIdMainMenuController.remove);

module.exports = router;