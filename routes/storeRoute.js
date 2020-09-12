const express = require('express');
const router = express.Router();
const Store = require('../app/models/store');

//Rotas para Produto
router.post('/', (req, res) => {
  const store = new Store();
  store.name = req.body.name;
  store.description = req.body.description;

  store.save((error)=> {
    if(error)
      res.status(404).send("Erro ao salvar loja ", error);

    res.status(201).json({message: 'Loja inserida com sucesso'});
  })
});

router.get('/', (req, res) => {
  Store.find((error, stores) => {
    if(error)
      res.status(404).json({ message: "Erro ao vincular loja ao produto" });

    res.status(200).json({
      message: "request success",
      stores: stores
    })
  }).populate('products');
});

router.get('/:id', (req, res) => {
  Store.findById(req.params.id, (error, store) => {
    if(error)
      res.status(404).json({ message: "Erro ao consultar todas as lojas" });

    res.status(200).json({
      message: "request success",
      stores: store
    })
  }).populate('products');
});

module.exports = router;