const express = require('express');
const router = express.Router();
const Product = require('../app/models/product');
const Store = require('../app/models/store');

//Rotas para Product
router.post('/', (req, res) => {
  const product = new Product();
  const id = req.body.storeId;

  if(!id)
    res.status(500).json({
      message: "ID da loja inválido"
    })

  product.name = req.body.name;
  product.price = req.body.price;
  product.description = req.body.description;
  product.store = id;

  product.save((error)=> {
    if(error)
      res.status(500).send(error);

    Store.findById(id, (error, store) => {
      if(error)
        res.status(404).json({ message: "Erro ao vincular loja ao produto" });

      store.products.push(product);

      store.save(() => { 
        res.status(201).json({message: 'produto inserido com sucesso'});
      })
    }); 
  })
});

router.get('/', (req, res) => {
  Product.find((error, products)=>{
    if(error)
      res.status(404).send("Erro ao consultar os produtos ", error);

    res.status(201).json({
      message: "request success",
      allProduct: products
    })
  }).populate('stores');
});

router.get('/:productId', (req, res) => {
  const id = req.params.productId;
  Product.findById(id, (error, product) => {
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
  Product.findById(id, (error, product) => {
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
          res.status(404).send("Erro ao atualizar o produto ", error);
    
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
  Product.findByIdAndRemove(req.params.productId, (error, product) => {
    if(error)
      res.status(500).json({
        message: "Erro ao tentar deletar produto"
      });

      res.status(200).json({
        message: 'produto excluido com sucesso'
      });
  });
});

module.exports = router;
