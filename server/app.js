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
  if (blankNameCheck(newFish) == true || dupeCheck(newFish,fishiesList) == true){
  res.sendStatus(400);
} else {

  fishiesList.push(newFish);
  console.log('fishiesList now looks like: ',fishiesList);
  res.sendStatus(200);
}
});


function dupeCheck(fish,array){
  for (var i = 0; i < array.length; i++) {
    if(array[i].name == fish.name){
      console.log('input error: dupe');
      return true;
    }
  }
}

function blankNameCheck(fish,isBlank){
  if(fish.name == ''){
    console.log('input error: blank');
    return true;
  }
}


  app.listen(5000);
  //end of file
