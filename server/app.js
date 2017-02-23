console.log('Starting up the server');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true})); // this creates req.body

var fishiesList = [{name: 'walleye'}, {name: 'pike'}, {name: 'muskie'}];

app.get('/fish', function(req, res){
  res.send(fishiesList);
});

// handle the request for the first fish
app.get('/fish/first', function(req, res){
  res.send(fishiesList[0]);
});

// handle the request for the last fish
app.get('/fish/last', function(req, res){
  var lastIndex = fishiesList.length - 1;
  res.send(fishiesList[lastIndex]);
});

// handle request for the name of the first fish
app.get('/fish/first/name', function(req, res){
  res.send(fishiesList[0].name);
});

// handle request for the name of the last fish
app.get('/fish/last/name', function(req, res){
  var lastIndex = fishiesList.length - 1;
  res.send(fishiesList[lastIndex].name);
});

app.post('/fish/new', function(req, res){
  var newFish = req.body;
  if(newFish.name == ''){
    res.sendStatus(400);
    console.log('user submission failure: empty');
  }
  for (var i = 0; i < fishiesList.length; i++) {
    if(fishiesList[i].name == newFish.name){
      res.sendStatus(400);
      console.log('user submission failure: dupe');
    }
  }
});


app.listen(5000);
