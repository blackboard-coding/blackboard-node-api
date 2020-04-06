const express = require('express');
const router = express.Router();

const LessonController = require('../../../controllers/Lesson/Lesson/LessonController');

router.get('/v1/lesson/all', LessonController.on);
router.get('/v1/lesson/:id', LessonController.onId);
router.post('/v1/lesson/create', LessonController.created);
router.put('/v1/lesson/update/:id', LessonController.update);
router.delete('/v1/lesson/remove/:id', LessonController.remove);

module.exports = router;