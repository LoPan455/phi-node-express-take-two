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
          $('#fishTank').append('<li><strong>Fish Name</strong>: ' + response[i].name + ' <strong>Date Added</strong>: ' + response[i].dateAdded + '</li>');
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
    var dateAdded = new Date();
    newFishObject.name = $('#newFishName').val();
    newFishObject.dateAdded = dateAdded.toDateString();
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
