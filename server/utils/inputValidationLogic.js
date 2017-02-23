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

module.exports = {
  dupeCheck: dupeCheck,
  blankNameCheck: blankNameCheck
}
