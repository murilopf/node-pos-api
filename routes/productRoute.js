const express = require('express');
const router = express.Router();
const Produto = require('../app/models/product');
// const mongoose = require('mongoose');

//Rotas para Produto
router.post('/', (req, res) => {
  const product = new Produto();
  product.name = req.body.name;
  product.price = req.body.price;
  product.description = req.body.description;

  product.save((error)=> {
    if(error)
      res.send("Erro ao salvar produto ", error);

    res.status(201).json({message: 'produto inserido com sucesso'});
  })
});

router.get('/', (req, res) => {
  Produto.find((error, products)=>{
    if(error)
      res.send("Erro ao consultar os produtos ", error);

    res.status(201).json({
      message: "request success",
      allProduct: products
    })
  })
});

module.exports = router;
