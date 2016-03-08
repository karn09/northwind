var router = require('express').Router();
var Product = require('../models').Product;

//put in home route
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/products', function(req, res, next) {
  Product.find({})
  .then(function(items) {
    res.render('products', {items: items});
  }, next);
});

//route naming.. make it restful
//name this '/products'
router.post('/products/add', function(req, res, next) {
  Product.findOrCreate({
    name: req.body.product_name,
    desc: req.body.product_desc
  })
  .then(function(product) {
    console.log('Item added: ' + item);
    res.redirect('/products');//redirect ONLY if successful!!!
  }, next);
});

//use restful routes /products/:id for updating!!
router.put('/products/update', function(req, res, next) {
  // console.log(req.body)
  Product.findByIdAndUpdate(req.body.id, req.body)
  .then(function(item) {
    res.send({
      item: item
    });
  }, next);
});

//make this restful '/products/:id'
router.delete('/products/delete', function(req, res, next) {
  Product.findByIdAndRemove(req.query.id)
  .then(function(item) {
    res.send({redirect: '/products'});
  }, next);
});

module.exports = router;
