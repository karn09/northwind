var express = require('express');
var app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
var path = require('path');
var sass = require('node-sass-middleware');
var routes = require('./routes');

// module.exports = app;

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});


app.use(
  sass({
    src: __dirname + '/assets', //where the sass files are
    dest: __dirname + '/public', //where css should go
    debug: true
  })
);
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(3000, function() {
  console.log('server started');
});
