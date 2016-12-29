// @codekit-prepend "../../bower_components/jquery/dist/jquery.js";
// @codekit-prepend "../../bower_components/what-input/what-input.js";
// @codekit-prepend "../../bower_components/foundation-sites/dist/foundation.js";

$(document).foundation();

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// @codekit-append "../../bower_components/bounce.js/bounce.js";
// @codekit-append "../../aaf-global/scripts/aaf-mobile-nav.js";
