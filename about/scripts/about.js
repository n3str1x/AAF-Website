// @codekit-prepend "../../bower_components/velocity/velocity.js";
// @codekit-prepend "../../bower_components/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js";
// @codekit-prepend "../../bower_components/scrollmagic/scrollmagic/uncompressed/plugins/animation.velocity.js";
// @codekit-prepend "../../bower_components/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js";


// init controller
var controller = new ScrollMagic.Controller();

// structured
var scene = new ScrollMagic.Scene({triggerElement: "#structured"})
				// trigger a velocity opaticy animation
				.setVelocity("#structured .copy", {translateY: 100, opacity: 1}, {duration: 600})
				.addTo(controller);

// community
var scene = new ScrollMagic.Scene({triggerElement: "#community"})
				// trigger a velocity opaticy animation
				.setVelocity("#community .copy", {translateY: 100, opacity: 1}, {duration: 600})
				.addTo(controller);

// tactical
var scene = new ScrollMagic.Scene({triggerElement: "#tactical"})
				// trigger a velocity opaticy animation
				.setVelocity("#tactical .copy", {translateY: 100, opacity: 1}, {duration: 600})
				.addTo(controller);

// growing
var scene = new ScrollMagic.Scene({triggerElement: "#growing"})
                // trigger a velocity opaticy animation
                .setVelocity("#growing .copy", {translateY: 100, opacity: 1}, {duration: 600})
                .addTo(controller);

// friends
var scene = new ScrollMagic.Scene({triggerElement: "#friends"})
                // trigger a velocity opaticy animation
                .setVelocity("#friends .copy", {translateY: 100, opacity: 1}, {duration: 600})
                .addTo(controller);
