/* // @codekit-prepend "granim.js"; */

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var IP;
var connected = false;
var connectedNo = 1;
var info;
var serverInfo;
var username = getUrlParameter('username');

jQuery.fn.extend({
    statusColour: function (colour) {
        $(this).removeClass("orange").removeClass("red").removeClass("green").addClass(colour);
    }
});

$.getJSON("https://scarlet.australianarmedforces.org/api/user/info/" + username)
.done(function(data) {
    info = data;
    info.username = capitalizeFirstLetter(info.username);
    $("#status_scarletapi").statusColour("green");
})
.fail(function() {
    $("#status_scarletapi").statusColour("red");
});

$.getJSON("https://scarlet.australianarmedforces.org/api/armaserver", function(data) {
    serverInfo = data;
    if(serverInfo["58.162.184.102:2302"].gq_online == true) {
        $("#status_arma").statusColour("green");
        $("#playerNo i").text(serverInfo["58.162.184.102:2302"].gq_numplayers);
        $("#playerNo").css("display", "inline");
    } else{
        $("#status_arma").statusColour("red");
    }

});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


$(function() {
    $.getJSON("https://scarlet.australianarmedforces.org/api/ip/").done(function(json) {
        IP = json.ip;
    });
});

var wsUri = "ws://localhost:1001";
var output;

function init()
{
    output = document.getElementById("output");
    testWebSocket();
}

function testWebSocket()
{
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt)
{
    writeToScreen("Connected to Scarlet Servers");
    browserConnect();
    updateStatus("Hello <span class='username'>" + info.username + "</span>");
    updateFile("Current Install Location is: " + info.installDir);
}

function onClose(evt)
{
    testWebSocket();
}

function browserConnect() {
    doSend("Updater" + "|" + "browserConnect" + "|" + info.username);
    connectedNo++;
    setTimeout(function () {
        if (connected == false) {
            if(connectedNo < 20) {
                browserConnect();
                console.log("Updater Ping - Not Connected");
            }
            else {
                writeToScreen("Could not Connect to Updater");
            }
        }
    }, 2000);
}

function onMessage(evt)
{
    var array = evt.data.split("|");
    if(array[0] == "Browser") {
        if(array[1] == "browserConfirmation") {
            updaterNowConnected(array[2]);
        }
        else if(array[1] == "UpdateInstallLocation") {
            updateInstallLocation(array[2]);
            console.log(array[2]);
        }
        else if(array[1] == "UpdateStatus") {
            updateStatus(array[2]);
        }
        else if(array[1] == "UpdateFile") {
            updateFile(array[2]);
        }
        else if(array[1] == "UpdateProgress") {
            updateProgress(array[2]);
        }
        else if(array[1] == "Completed") {
            completed();
        }
    }
}

function updaterNowConnected(free) {
    writeToScreen("Connected to Updater");
    console.log("Updater Ping - Connected");
    connected = true;
    $("#status_updater").statusColour("green");
    if(free == "free") {
        $('input').removeAttr("disabled");
        $('input').removeAttr("class");
        $('input').attr("class", "button");
    } else {
        doSend("Updater" + "|" + "fetchStatus");
        $('input#location').removeAttr("class").attr("class", "button disabled").attr("disabled", "disabled");
        $('input#start').attr("value", "Stop Download").attr("onClick", "stopDownload()");
    }
}

function startDownload() {
    doSend("Updater" + "|" + "startDownload" + "|" + info.installDir);
    writeToScreen("Commencing Download");
    $('input#location').removeAttr("class").attr("class", "button disabled").attr("disabled", "disabled");
    $('input#start').attr("value", "Stop Download").attr("onClick", "stopDownload()");
}

function stopDownload() {
    doSend("Updater" + "|" + "stopDownload");
    writeToScreen("Download Stopped");
    $('input#location').removeAttr("class").attr("class", "button").removeAttr("disabled");
    $('input#start').removeAttr("onClick").attr("onClick", "startDownload()").attr("value", "Start Download");
}

function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + "Unable to connect to Scarlet Servers");
    $("#status_updater").statusColour("red");
}

function doSend(message) {
    console.log("SENT: " + message);
    websocket.send(message);
}

function updateFile(message) {
    $(".file").html(message);
}

function updateStatus(message) {
    $(".status").html(message);
}

function updateProgress(message) {
    var array = message.split("/");
    var percent = parseFloat(array[0]);
    $(".progress-meter").css("width", percent + "%");

}

function updateInstallLocation(message) {
    $.post( "https://scarlet.australianarmedforces.org/api/user/install/" +  info.key , { installDir: message })
    .done( function() {
        $.get("https://scarlet.australianarmedforces.org/api/user/info/" + info.key, function( data ) {
            info = data;
            updateFile("Current Install Location is: " + info.installDir);
        });
    } );
}

function completed() {
    updateFile("Start ARMA 3 using the Steam Launcher");
    writeToScreen("Download Complete");
}

function changeLocation() {
    doSend("Updater" + "|" + "locationChange");
}

function writeToScreen(message) {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    output.innerHTML = message;
}

window.addEventListener("load", init, false);




/* var granimInstance = new Granim({
   element: '.progress-meter',
   name: 'granim',
   opacity: [1, 1],
   isPausedWhenNotInView: false,
   direction: 'left-right',
   states : {
       "default-state": {
           gradients: [
                ['#AA076B', '#61045F'],
                ['#02AAB0', '#00CDAC'],
                ['#DA22FF', '#9733EE']
           ]
       }
   }
});
*/
