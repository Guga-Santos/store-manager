const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.get('/:id', saleController.findById);
router.get('/', saleController.getAll);
router.delete('/:id', saleController.deleteSales);

module.exports = router;