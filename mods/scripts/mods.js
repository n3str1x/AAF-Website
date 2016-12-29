// @codekit-prepend "../../bower_components/vue/dist/vue.min.js"


$(document).ready(function() {
    GetLatestReleaseInfo();
});

function GetLatestReleaseInfo() {
    $.getJSON("https://api.github.com/repos/sifex/Scarlet/releases/latest").done(function(release) {
        var asset = release.assets[0];
        var downloadCount = 0;
        for (var i = 0; i < release.assets.length; i++) {
            downloadCount += release.assets[i].download_count;
        }
        var oneHour = 60 * 60 * 1000;
        var oneDay = 24 * oneHour;
        var dateDiff = new Date() - new Date(asset.updated_at);
        var timeAgo;
        if (dateDiff < oneDay) {
            timeAgo = (dateDiff / oneHour).toFixed(1) + " hours ago";
        } else {
            timeAgo = (dateDiff / oneDay).toFixed(1) + " days ago";
        }
        var releaseInfo = release.name + " was updated " + timeAgo + " and downloaded " + downloadCount.toLocaleString() + " times.";
        $(".download a").attr("href", asset.browser_download_url);
        $(".release-info").text(releaseInfo);
        $(".release-info").fadeIn("slow");
    });
}


var download = new Vue({
    el: '#download',
    data: {
        active: false
    },
    created: function() {
        if(getParameterByName('nodownload') == null) {
            this.active = true;
            console.log(this.active);
        }
    }
})
