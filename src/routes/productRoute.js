const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');

//Rotas para Product
router.post('/', productController.post);
router.get('/',  productController.getAll);
router.get('/:productId', productController.getById);
router.put('/:productId', productController.put);
router.delete('/:productId', productController.delete);

module.exports = router;
