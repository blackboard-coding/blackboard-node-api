const express = require('express');
const router = express.Router();

const LessonInfoControl = require('../../controllers/lesson_infos/LessonInfoControl');

router.get('/v1/lesson_info/all', LessonInfoControl.on);
router.get('/v1/lesson_info/id=:id', LessonInfoControl.onId);
router.get('/v1/lesson_info/status=:status', LessonInfoControl.onStatus);
router.post('/v1/lesson_info/create', LessonInfoControl.created);
router.put('/v1/lesson_info/update/id=:id', LessonInfoControl.update);
router.put('/v1/lesson_info/update/status=:id', LessonInfoControl.updateStatus);
router.delete('/v1/lesson_info/remove/:id', LessonInfoControl.remove);

module.exports = router;