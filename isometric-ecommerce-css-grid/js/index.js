var grid = document.getElementById("productGrid"); 
var products = document.getElementById("productGrid").getElementsByTagName("li");
var productsShown;
var spacers;
var nPerRow;
var rowHeight;
var closedRowHeight;

function addSpacers(){
  for(var i=1; i<=products.length; i++){
    var node = document.createElement("b");
    node.style.gridRow = i;
    grid.appendChild(node); 
  }
  resizeGrid();
  startAnim();
}

function resizeGrid(){
  var w = window.innerWidth;
  if(w<600) {
    nPerRow=1;
  }else if(w<900) {
    nPerRow=2;
  }else if(w<1200) {
    nPerRow=3;
  }else if(w<1500) {
    nPerRow=4;
  }else if(w<1800) {
    nPerRow=5;
  }else if(w<2100) {
    nPerRow=6;
  }else {
    nPerRow=7;
  }
  var nRows = Math.floor(products.length/nPerRow); 
  productsShown = nRows*nPerRow;
  rowHeight = (173.2/(2*nPerRow+1));
  closedRowHeight = (57.74/(2*nPerRow+1));
  grid.style.gridAutoRows = rowHeight+"vw";
  spacers = document.getElementById("productGrid").getElementsByTagName("b"); 
  
  for(var i=0; i<products.length; i++){
    if(i<nRows){
      spacers[i].style.display = "block";
    }else{
      spacers[i].style.display = "none";
    }
    if(i<productsShown){
       products[i].style.display = "grid";
    }else{
       products[i].style.display = "none";
    }
  }
}

function startAnim() {
  var details = document.getElementsByClassName('details');
  var logos = document.getElementsByClassName('logo');
  var photos = document.getElementsByClassName('photo');
  var count = 0;
  var wait = setInterval(delay, 500);
  var openSteps = 25;
  var revealSteps = 10;
  function delay() {
    var anim = setInterval(frame, 10);
    clearInterval(wait);
  }
  function frame() {
    count++; 
    if (count > (openSteps+revealSteps)) {
      clearInterval(anim);
    } else if (count > openSteps) {
      for(var i = 0; i < photos.length; i++){
        photos[i].style.display = "block";
        photos[i].style.opacity = (count-openSteps)/revealSteps;
        details[i].getElementsByTagName("h2")[0].style.opacity = (count-openSteps)/revealSteps;
        details[i].getElementsByTagName("p")[0].style.opacity = (count-openSteps)/revealSteps;
        logos[i].getElementsByTagName("img")[0].style.opacity = 0.6*(count-openSteps)/revealSteps;
      }
    } else {
      grid.style.gridAutoRows = (closedRowHeight+(rowHeight-closedRowHeight)*count/openSteps)+"vw";
      for(var i = 0; i < details.length; i++){
        details[i].style.clipPath = "polygon(0% 33.333%, 100% 0%, 100% "+count*66.667/openSteps+"%, 0% "+(33.33+count*66.667/openSteps)+"%, 0% 0%)";
        details[i].style.webkitClipPath = "polygon(0% 33.333%, 100% 0%, 100% "+count*66.667/openSteps+"%, 0% "+(33.33+count*66.667/openSteps)+"%, 0% 0%)";
        logos[i].style.clipPath = "polygon(0% 0%, 100% 33.333%, 100% "+(33.33+count*66.667/openSteps)+"%, 0% "+count*66.667/openSteps+"%, 0% 0%)";
        logos[i].style.webkitClipPath = "polygon(0% 0%, 100% 33.333%, 100% "+(33.33+count*66.667/openSteps)+"%, 0% "+count*66.667/openSteps+"%, 0% 0%)";
        photos[i].style.display = "none";
        details[i].getElementsByTagName("h2")[0].style.opacity = 0;
        details[i].getElementsByTagName("p")[0].style.opacity = 0;
        logos[i].getElementsByTagName("img")[0].style.opacity = 0;
      }
      for(var j = 0; j < spacers.length; j++){
        if(j % 2){
          spacers[j].style.clipPath = "polygon(0% 33.333%, 100% 0%, 100% "+count*66.667/openSteps+"%, 0% "+(33.33+count*66.667/openSteps)+"%, 0% 0%)";
          spacers[j].style.webkitClipPath = "polygon(0% 33.333%, 100% 0%, 100% "+count*66.667/openSteps+"%, 0% "+(33.33+count*66.667/openSteps)+"%, 0% 0%)";
        }else{
          spacers[j].style.clipPath = "polygon(0% 0%, 100% 33.333%, 100% "+(33.33+count*66.667/openSteps)+"%, 0% "+count*66.667/openSteps+"%, 0% 0%)";
          spacers[j].style.webkitClipPath = "polygon(0% 0%, 100% 33.333%, 100% "+(33.33+count*66.667/openSteps)+"%, 0% "+count*66.667/openSteps+"%, 0% 0%)";
        }
      }
    }
  }
};

window.onresize = function(){
  resizeGrid();
}

window.onload = addSpacers();