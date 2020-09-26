const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  store: {
    type: Schema.Types.ObjectId,
    ref:'Store',
    require: true
  }
});

module.exports = mongoose.model('Product', productSchema);