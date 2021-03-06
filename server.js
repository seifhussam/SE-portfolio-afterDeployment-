var express = require('express') ;
var app = express () ;
var port = process.env.PORT || 8000 ;
var morgan = require ('morgan');
var mongoose = require ('mongoose') ;
var bodyParser = require('body-parser') ;
var router = express.Router() ;
var appRoutes = require('./app/routes/api')(router);
var path = require('path') ;

app.use(morgan('dev')) ;
app.use (bodyParser.json()) ;
app.use(bodyParser.urlencoded ({extended:true})) ;
app.use(express.static(__dirname+'/public'));
app.use('/api',appRoutes) ;

mongoose.connect('mongodb://seifhussam:Seifhussam22@ds127190.mlab.com:27190/gucportfolio', function (err) {
  if (err)
  console.log ("not connected : " + err) ;
  else
  console.log ('Connected to db ');
});
app.get('*' , function(req,res) {
  res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
});
app.listen(port, function () {
  console.log ("running Server .... port :   "+ port);
});
