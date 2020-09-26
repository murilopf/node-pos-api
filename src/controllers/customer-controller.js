const Customer = require('../app/models/customer');

exports.post = (req, res) => {
  const customer = new Customer();

  customer.name = req.body.name;
  customer.email = req.body.email;
  customer.password = req.body.password;

  customer.save((error) => {
    if(error)
      res.status(404).json({message: "Erro ao criar novo cliente"})

    res.status(201).json({message: 'Cliente inserido com sucesso'});
  });
}

exports.getAll = (req, res) => {
  Customer.find((error, customers) => {
    if(error)
      res.status(404).json({message: "Erro ao consultar todos cliente"})

    res.status(201).json({
      message: "request success",
      allCustomers: customers
    })
  })
}

exports.getById = (req, res) => {
  const id = req.params.customerId;
  console.log("ID da request ", id);
  Customer.findById(id, (error, customer) => {
    if(error)
      res.status(404).json({ message: `Erro ao consultar cliente com ID ${id}` });
    
    if(customer == null)
      res.status(400).json({ message: "Nenhum cliente encontrado com este ID" });

    if(customer){
      res.status(200).json({
        message: "request success",
        customer: customer
      })
    }
  })
}