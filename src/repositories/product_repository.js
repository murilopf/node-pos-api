const Product = require('../app/models/product');

exports.post = async (data) => {
  const product = new Product(data);
  await product.save();
}

exports.getAll = async () => {
  const response = await Product.find().populate('stores');
  return response;
}

exports.getById = async (id) => {
  const response = await Product.findById(id).populate('stores');
  return response;
}

exports.put = async (id, data) => {
  await Product.findByIdAndUpdate(id,{
    $set:{
      name: data.name,
      price: data.price,
      store: data.store,
      description: data.description
    }
  })
}

exports.delete = async (id) => {
  await Product.findByIdAndDelete(id)
}