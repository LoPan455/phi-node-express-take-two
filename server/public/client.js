console.log('sourced!');
$(document).ready(function(){
  console.log('jquery was correctly sourced!');
  getFishData();
  function getFishData() {
    $.ajax({
      type: 'GET',
      url: '/fish',
      success: function(response) {
        console.log('response', response);
        $('#fishTank').empty();
        for (var i = 0; i < response.length; i++) {
          $('#fishTank').append('<li>' + response[i].name + '</li>');
        }
      }
    });

    $.ajax({
      type: 'GET',
      url: '/fish/first/name',
      success: function(response) {
        console.log('response', response);
        $('#fishiesName').text(response);
      }
    });
  }

  $('#newFishButton').on('click', function(){
    console.log('newFishButton pressed');
    var newFishObject = {};
    newFishObject.name = $('#newFishName').val();
    $.ajax({
      type: 'POST',
      url: '/fish/new',
      data: newFishObject,
      success: function(response){
        console.log(response);
        $('#statusMessage').text('success');
        getFishData();
      },
      error: function(error){
        $('#statusMessage').text('failure');
      }
    });
  });
});
