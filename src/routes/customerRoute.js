const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer-controller');

//Rotas para Product
router.post('/', customerController.post);
router.get('/',  customerController.getAll);
router.get('/:customerId', customerController.getById);
router.put('/:customerId', customerController.put);
router.delete('/:customerId', customerController.delete);

module.exports = router;
