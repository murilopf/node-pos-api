const repository = require('../repositories/customer_respository');

exports.post = async (req, res) => {
  try{      
    await repository.post({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({message: 'Cliente inserido com sucesso'});

  } catch(error){
    console.log("ERROR ", error)
    res.status(500).json({
      message: "Erro ao criar novo cliente"
    });
  }
}

exports.getAll = async (req, res) => {
  try {
    const response = await repository.getAll();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({
      message: "Falha ao processar requisição.",
      erro: error
    });
  }
}

exports.getById = async (req, res) => {
  try {
    const id = req.params.customerId;
    const response = await repository.getById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({
      message: "Falha ao processar requisição",
      erro: error
    });
  }
}

exports.put = async (req, res) => {
  try {
    const id = req.params.customerId;
    const response = await repository.put(id, req.body);
    res.status(200).send({
      message: "Cliente atualizado com sucesso",
      dados: response
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
    const id = req.params.customerId;
    await repository.delete(id)
    res.status(200).send({
      message: "Cliente removido com sucesso."
    });
  } catch (error) {
    res.status(500).send({
      message: "Falha ao processar requisição.",
      erro: error
    });
  }
}