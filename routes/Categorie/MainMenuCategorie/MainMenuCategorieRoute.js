const express = require('express');
const router = express.Router();

const MainMenuCategorieController = require('../../../controllers/Categorie/MainMenuCategorie/MainMenuCategorieController');

router.get('/v1/category/main_menu', MainMenuCategorieController.on);
// router.get('/v1/category/main_menu/:id', MainMenuCategorieController.onId);
// router.post('/v1/category/main_menu/create', MainMenuCategorieController.created);
// router.put('/v1/category/main_menu/update/:id', MainMenuCategorieController.update);
// router.delete('/v1/category/main_menu/remove/:id', MainMenuCategorieController.remove);

module.exports = router;