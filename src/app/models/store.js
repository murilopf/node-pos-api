const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  name: String,
  description: String,
  products: [{
    type: Schema.Types.ObjectId,
    ref:'Product'
  }]
});

module.exports = mongoose.model('Store', storeSchema);