

'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
var useragent = require('express-useragent');

app.use(useragent.express());


app.use('/public', express.static(process.cwd() + '/public'));
app.enable('trust proxy')

  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

app.route('/api/whoami')
  .get(function(req, res) {
    var os = req.useragent.os;
    var ip = response = req.ip;
    var language = req.headers["accept-language"];
  
    var response = {"ipaddress":ip,"language":language,"software":os}
    res.json(response);
  })

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
  

})



app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

