// https://dribbble.com/shots/2060856-Ink-Drop-Menu

console.clear();

var $menu = $('.menu'),
    $menuControl = $menu.find('.menu__control'),
    menuStates = 'menu--camera menu--likes menu--comments menu--users',
    menuClasses = '.'+ menuStates.split(' ').join(', .');

$menuControl.on('click',function(){
  if ( $menu.hasClass('menu--active') ) {
    $menu.removeClass(menuStates + ' menu--active menu--open');
  } else {
    $menu.toggleClass('menu--open');
  }
});


$('.action').on('click',function(){
  $menu
    .removeClass('menu--open ' + menuStates)
    .addClass('menu--active');
});

$('.action--camera').on('click',$menu.addClass.bind($menu,'menu--camera'));
$('.action--users').on('click',$menu.addClass.bind($menu,'menu--users'));
$('.action--comments').on('click',$menu.addClass.bind($menu,'menu--comments'));
$('.action--likes').on('click',$menu.addClass.bind($menu,'menu--likes'));


setTimeout($menuControl.click.bind($menuControl),300);
//setTimeout($menuControl.click.bind($menuControl),1400);