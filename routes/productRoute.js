const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/:id', productController.findById);
router.get('/', productController.getAll);
router.post('/', productController.addProduct);
router.put('/:id', productController.update);

module.exports = router;