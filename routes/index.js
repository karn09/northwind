var router = require('express').Router();
var Product = require('../models').Product;

router.get('/', function(req, res) {
  console.log(req.ip);
  res.render('index');
});

router.get('/products', function(req, res) {
  console.log(req.ip);
  Product.find({})
  .then(function(items) {
    res.render('products', {items: items});
  })
  .catch(function(err) {
    console.log("Error receiving products: " + err);
  });
});

router.post('/products/add', function(req, res) {
  var product = Product.findOrCreate({
    name: req.body.product_name,
    desc: req.body.product_desc
  });
  product.then(function(item) {
    console.log('Item added: ' + item);
  });
  res.redirect('/products');
});

router.put('/products/update', function(req, res) {
  // console.log(req.body)
  var product = Product.findByIdAndUpdate(req.body.id, req.body);
  product.then(function(item) {
    res.json({
      item: item
    });
  })
  .catch(function(err) {
    console.log('Update err: ' + err);
  });
});

router.get('/products/delete', function(req, res) {
  var product = Product.findByIdAndRemove(req.query.id);
  product.then(function(item) {
    res.json({redirect: '/products'});
  })
  .catch(function(err) {
    console.log('POST DELETE ERR: ' + err);
  });
});

module.exports = router;
