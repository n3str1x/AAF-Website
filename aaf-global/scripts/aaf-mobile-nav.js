var bounceIn = new Bounce();
bounceIn
  .translate({
    from: { x: 0, y: -300 },
    to: { x: 0, y: 0 },
    duration: 1000,
    stiffness: 6
  })
  .scale({
    from: { x: 0, y: 0 },
    to: { x: 1, y: 1 },
    duration: 1000,
    stiffness: 6
});

var bounceOut = new Bounce();
bounceOut
  .translate({
    from: { x: 0, y: 0 },
    to: { x: 0, y: 300 },
    duration: 10000,
    stiffness: 6
  })
  .scale({
    from: { x: 1, y: 1 },
    to: { x: 0.4, y: 0.4 },
    duration: 10000,
    stiffness: 6
});

function pd(e) {
    e.preventDefault();
}

$(".mobile_menu_button").click(function() {
    $("nav.mobile").fadeIn();
    document.body.addEventListener('touchmove', pd);
    bounceIn.applyTo($("nav.mobile .wrapper"));
});
$(".mobile .shade, .mobile .close").click(function() {
    $("nav.mobile").fadeOut(200);
    bounceOut.applyTo($("nav.mobile .wrapper"));
    setTimeout(function() {
        bounceIn.remove();
        bounceOut.remove();
        document.body.removeEventListener('touchmove', pd);
    }, 2000);
    document.body.removeEventListener('touchmove', pd);
});
