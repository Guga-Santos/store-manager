const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/search', productController.searchProduct);
router.get('/:id', productController.findById);
router.get('/', productController.getAll);
router.post('/', productController.addProduct);
router.put('/:id', productController.update);
router.delete('/:id', productController.deleteProduct);

module.exports = router;