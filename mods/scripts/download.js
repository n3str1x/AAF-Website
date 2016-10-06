
var IP;
var connected = false;
var connectedNo = 1;
var info;
var serverInfo;

$.getJSON("https://sscarlet.australianarmedforces.org/api/user/info/omega", function(data) {
    info = data;
    info.username = capitalizeFirstLetter(info.username);
    $("#status_scarletapi").removeClass("orange").addClass("green");
}).fail(function() { $("#status_scarletapi").removeClass("orange").addClass("red"); });

$.getJSON("https://sscarlet.australianarmedforces.org/api/armaserver", function(data) {
    serverInfo = data;
    if(serverInfo["58.162.184.102:2302"].gq_online == true) {
        $("#status_arma").removeClass("orange").addClass("green");
    } else{
        $("#status_arma").removeClass("orange").addClass("red");
    }
}).fail(function() { $("#status_arma").removeClass("orange").addClass("red"); });

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


$(function() {
    $.getJSON("/api/ip/",
        function(json) {
            IP = json.ip;
        }
    );
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
    $("#status_updater").removeClass("orange").removeClass("red").addClass("green");
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
    $("#status_updater").removeClass("orange").addClass("red");
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
    $.post( "/api/user/install/" +  info.key , { installDir: message })
    .done( function() {
        $.get("/api/user/info/" + info.key, function( data ) {
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
