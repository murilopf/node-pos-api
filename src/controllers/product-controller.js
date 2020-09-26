const Store = require('../app/models/store');
const Product = require('../app/models/product');
const repository = require('../repositories/product_repository');

exports.post = async (req, res) => {
  try {
    const id = req.body.storeId;
    if(!id)
      res.status(500).json({
        message: "ID da loja inválido"
      })
      
    await repository.post({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      store: id,
    });

    Store.findById(id, (error, store) => { //passar para repository dps
      if(error)
        res.status(404).json({ message: "Erro ao vincular loja ao produto" });

      product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        store: id,
      })

      store.products.push(product);

      store.save(() => { 
        res.status(201).json({message: 'produto inserido com sucesso'});
      })
    }); 

  } catch(error) {
    console.log("ERROR ", error)
    res.status(500).json({
      message: "Falha ao processar requisição"
    });
  } 
};

exports.getAll = async (req, res) => {
  try {
    const data = await repository.getAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: "Falha ao processar requisição.",
      erro: error
    });
  }
}

exports.getById = async (req, res) => {
  try {
    const id = req.params.productId;
    const data = await repository.getById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: "Falha ao processar requisição",
      erro: error
    });
  }
}

exports.put = async (req, res) => {
  try {
    const id = req.params.productId;
    const data = await repository.put(id, req.body);
    res.status(200).send({
      message: "Produto atualizado com sucesso",
      dados: data
    })
  } catch (error) {
    res.status(500).send({
      message: "Falha ao processar requisição.",
      erro: error
    });
  }
}

exports.delete = async (req, res) => {
  try {
    const id = req.params.productId;
    await repository.delete(id)
    res.status(200).send({
      message: "Produto removido com sucesso."
    });
  } catch (error) {
    res.status(500).send({
      message: "Falha ao processar requisição.",
      erro: error
    });
  }
}
