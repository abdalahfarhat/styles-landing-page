(function() {
   
  let cart = $('#cart'),
  soda = $('#soda'),
  meat = $('#meat'),
  image = $('#image'),
  mustard = $('#mustard'),
  path = [{x:-250, y:0}, {x:-100, y:-90}, {x:0, y:0}],
  path2 = [{x:250, y:0}, {x:150, y:-80}, {x:60, y:0}],
  path3 = [{x:-170, y:0}, {x:-80, y:-70}, {x:70, y:0}];

 
  
  var setupSequence = function() {
    
    let tl = new TimelineMax({repeat: -1, timeScale: 0.8});
    tl.set(mustard, {x:-250})
    .set(meat, {x:250})
    .set(soda, {x:-170})
    .to(cart, 2.1, 
          { 
            x:750, 
            ease: SlowMo.ease.config(0.5, 0.5, false),
            
          })
    .to(mustard, 1, {
        bezier: {curviness: 0.3, values:path},
        opacity: 1,
        scale:1,
        ease: Back.easeOut.config(1.4)
    }, 0.5)
    .to(mustard, .2, {
      scale: 0,
    }, 0.8)
    .to(meat, 1, {
        bezier: {curviness: 0.3, values:path2},
        opacity: 1,
        scale:1,
        ease: Back.easeOut.config(1.4)
    }, 0.8)
    .to(meat, .2, {
      scale: 0
    }, 1.2)
    .to(soda, .7, {
        bezier: {curviness: 0.3, values:path3},
        opacity: 1,
        scale:1,
        ease: Back.easeOut.config(1.4)
    }, 1.2)
    .to(soda, .1, {
      scale: 0,
    },1.5);
  }
  
  setupSequence();
  
})();