$(document).ready( function(){
  var hnow = new Date().getHours();
  var mnow = new Date().getMinutes();
  mnow = (mnow < 10) ? ('0' + mnow) : mnow;
  $('#hour').html(hnow + ":" + mnow);
  
  var price = $('#price').text().replace('$', '').replace(' ', '');
  
  $('.ion-ios-minus-empty').on('click', function () { 
    var qtty = $('#qtty').text();
    if(qtty > 1){
      qtty--;
    } else {
      qtty = 1;
    }
    $('#qtty').html(qtty);
    var newprice = (qtty * price);
    $('#price').html('$ ' + newprice);
  });
  $('.ion-ios-plus-empty').on('click', function () { 
    var qtty = $('#qtty').text();
    qtty++;
    $('#qtty').html(qtty);
    var newprice = (qtty * price);
    $('#price').html('$ ' + newprice);
  });
});