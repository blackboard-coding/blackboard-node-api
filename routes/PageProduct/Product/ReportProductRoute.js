const express = require('express');
const router = express.Router();

const ReportProductController = require('../../../controllers/PageProduct/Product/ReportProductController');

router.get('/v1/product/report', ReportProductController.on);
router.get('/v1/product/report/:id', ReportProductController.onId);
router.post('/v1/product/report/create', ReportProductController.created);
router.put('/v1/product/report/update/:id', ReportProductController.update);
router.delete('/v1/product/report/remove/:id', ReportProductController.remove);

module.exports = router;