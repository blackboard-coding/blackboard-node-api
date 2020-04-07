const express = require('express');
const router = express.Router();

const ListReportController = require('../../../controllers/PageProduct/Product/ListReportController');

router.get('/v1/product/report/option', ListReportController.on);
router.get('/v1/product/report/option/:id', ListReportController.onId);
router.post('/v1/product/report/option/create', ListReportController.created);
router.put('/v1/product/report/option/update/:id', ListReportController.update);
router.delete('/v1/product/report/option/remove/:id', ListReportController.remove);

module.exports = router;