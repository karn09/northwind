var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/northwind-prods');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));


var productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  qty: {type: Number},
  desc: {type: String, required: true},
  status: {type: String}
});

productSchema.statics.findOrCreate = function(formObj) {
  var that = this;
  return this.findOne({
    name: formObj.name
  })
  .then(function(product) {
    if (product) return product;
    else return that.create({
      name: formObj.name,
      desc: formObj.desc,
      qty: 1,
      status: 'active'
    });
  })
  .catch(function(err) {
    console.log('Error with findOrCreate: ' + err);
  });
};

var Product = mongoose.model('Product', productSchema);

module.exports = {
  Product: Product
};
