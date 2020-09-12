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

router.get('/:productId', (req, res) => {
  const id = req.params.productId;
  Produto.findById(id, (error, product) => {
    if(error){
      res.status(500).json({
        message: "Erro ao tentar encontrar produto; ID inválido"
      })
    }else if(product == null){
      res.status(400).json({
        message: "Nenhum produto encontrado com o ID informado"
      })
    }else{
      res.status(200).json({
        message: "request success",
        product: product
      })
    }
  })
});

router.put('/:productId', (req, res) => {
  const id = req.params.productId;
  Produto.findById(id, (error, product) => {
    if(error){
      res.status(500).json({
        message: "Erro ao tentar encontrar produto; ID inválido"
      })
    }else if(product == null){
      res.status(400).json({
        message: "Nenhum produto encontrado com o ID informado"
      })
    }else{

      if(req.body.name)
        product.name = req.body.name;

      if(req.body.price)
        product.price = req.body.price;

      if(req.body.description)
        product.description = req.body.description;

      product.save((error)=> {
        if(error)
          res.send("Erro ao atualizar o produto ", error);
    
        res.status(200).json({
          message: 'produto atualizado com sucesso',
          productUpdated: product
        });
      })
    }
  })
});

router.delete('/:productId', (req, res) => {
  const id = req.params.productId;
  Produto.findById(id, (error, product) => {
    if(error){
      res.status(500).json({
        message: "Erro ao tentar encontrar produto; ID inválido"
      })
    }else if(product == null){
      res.status(400).json({
        message: "Nenhum produto encontrado com o ID informado"
      })
    }else{
      product.delete((error)=> {
        if(error)
          res.send("Erro ao deletar o produto ", error);
    
        res.status(200).json({
          message: 'produto excluido com sucesso'
        });
      })
    }
  })
});

module.exports = router;
