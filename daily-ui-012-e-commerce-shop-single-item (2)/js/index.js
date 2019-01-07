(function() {
  var $price, $price_num, $qty, $qty_num;

  $qty = document.querySelector(".qty");

  $qty_num = $qty.textContent;

  $price = document.querySelector(".price");

  $price_num = $price.textContent;

  window.count = function(num) {
    var $total;
    $qty_num = parseInt($qty_num) + parseInt(num);
    $total = $price_num * $qty_num;
    if ($qty_num > 0) {
      $qty.textContent = $qty_num;
      $price.textContent = $total;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLE1BQUEsRUFBQSxVQUFBLEVBQUEsSUFBQSxFQUFBOztFQUFBLElBQUEsR0FBTyxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2Qjs7RUFDUCxRQUFBLEdBQVcsSUFBSSxDQUFDOztFQUNoQixNQUFBLEdBQVMsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkI7O0VBQ1QsVUFBQSxHQUFhLE1BQU0sQ0FBQzs7RUFHcEIsTUFBTSxDQUFDLEtBQVAsR0FBZSxRQUFBLENBQUMsR0FBRCxDQUFBO0FBQ2QsUUFBQTtJQUFBLFFBQUEsR0FBVyxRQUFBLENBQVMsUUFBVCxDQUFBLEdBQXFCLFFBQUEsQ0FBUyxHQUFUO0lBQ2hDLE1BQUEsR0FBUyxVQUFBLEdBQWE7SUFDdEIsSUFBRyxRQUFBLEdBQVcsQ0FBZDtNQUNDLElBQUksQ0FBQyxXQUFMLEdBQW1CO01BQ25CLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLE9BRnRCOztFQUhjO0FBTmYiLCJzb3VyY2VzQ29udGVudCI6WyIkcXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5xdHlcIilcbiRxdHlfbnVtID0gJHF0eS50ZXh0Q29udGVudFxuJHByaWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmljZVwiKVxuJHByaWNlX251bSA9ICRwcmljZS50ZXh0Q29udGVudFxuXG5cbndpbmRvdy5jb3VudCA9IChudW0pIC0+XG5cdCRxdHlfbnVtID0gcGFyc2VJbnQoJHF0eV9udW0pICsgcGFyc2VJbnQobnVtKVxuXHQkdG90YWwgPSAkcHJpY2VfbnVtICogJHF0eV9udW1cblx0aWYgJHF0eV9udW0gPiAwXG5cdFx0JHF0eS50ZXh0Q29udGVudCA9ICRxdHlfbnVtXG5cdFx0JHByaWNlLnRleHRDb250ZW50ID0gJHRvdGFsXG5cdHJldHVyblxuXHQiXX0=
//# sourceURL=coffeescript