var router = require('express').Router();
var Product = require('../models').Product;

router.get('/', function(req, res) {
  res.render('index');
});
var items = [{
    name: 'first',
    qty: 1,
    status: 'active',
    desc: 'This is product one'
  }, {
    name: 'second',
    qty: 2,
    status: 'inactive',
    desc: 'This is product two'
  }, {
    name: 'third',
    qty: 3,
    status: 'active',
    desc: 'This is product three'
  }

];
router.get('/products', function(req, res) {
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

router.post('/products/:id', function(req, res) {
  console.log(req.body);
  console.log(req)
  res.redirect('/products')
});
router.post('/products/delete', function(req, res) {
  var product = Product.findbyId({

  });
});

module.exports = router;
