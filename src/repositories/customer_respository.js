const Customer = require('../app/models/customer');

exports.post = async (data) => {
  const customer = new Customer(data);
  await customer.save();
}

exports.getAll = async () => {
  const response = await Customer.find();
  return response;
}

exports.getById = async (id) => {
  const response = await Customer.findById(id);
  return response;
}

exports.put = async (id, data) => {
  await Customer.findByIdAndUpdate(id,{
    $set:{
      name: data.name,
      email: data.email,
      password: data.password,
    }
  })
}

exports.delete = async (id) => {
  await Customer.findByIdAndDelete(id)
}