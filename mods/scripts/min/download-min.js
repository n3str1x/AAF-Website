function capitalizeFirstLetter(t){return t.charAt(0).toUpperCase()+t.slice(1)}function init(){output=document.getElementById("output"),testWebSocket()}function testWebSocket(){websocket=new WebSocket(wsUri),websocket.onopen=function(t){onOpen(t)},websocket.onclose=function(t){onClose(t)},websocket.onmessage=function(t){onMessage(t)},websocket.onerror=function(t){onError(t)}}function onOpen(t){writeToScreen("Connected to Scarlet Servers"),browserConnect(),updateStatus("Hello <span class='username'>"+info.username+"</span>"),updateFile("Current Install Location is: "+info.installDir)}function onClose(t){testWebSocket()}function browserConnect(){doSend("Updater|browserConnect"),connectedNo++,setTimeout(function(){0==connected&&(connectedNo<20?(browserConnect(),console.log("Updater Ping - Not Connected")):writeToScreen("Could not Connect to Updater"))},2e3)}function onMessage(t){var e=t.data.split("|");"Browser"==e[0]&&("browserConfirmation"==e[1]?updaterNowConnected(e[2]):"UpdateInstallLocation"==e[1]?(updateInstallLocation(e[2]),console.log(e[2])):"UpdateStatus"==e[1]?updateStatus(e[2]):"UpdateFile"==e[1]?updateFile(e[2]):"UpdateProgress"==e[1]?updateProgress(e[2]):"Completed"==e[1]&&completed())}function updaterNowConnected(t){writeToScreen("Connected to Updater"),console.log("Updater Ping - Connected"),connected=!0,"free"==t?($("input").removeAttr("disabled"),$("input").removeAttr("class"),$("input").attr("class","button")):(doSend("Updater|fetchStatus"),$("input#location").removeAttr("class").attr("class","button disabled").attr("disabled","disabled"),$("input#start").attr("value","Stop Download").attr("onClick","stopDownload()"))}function startDownload(){doSend("Updater|startDownload|"+info.installDir),writeToScreen("Commencing Download"),$("input#location").removeAttr("class").attr("class","button disabled").attr("disabled","disabled"),$("input#start").attr("value","Stop Download").attr("onClick","stopDownload()")}function stopDownload(){doSend("Updater|stopDownload"),writeToScreen("Download Stopped"),$("input#location").removeAttr("class").attr("class","button").removeAttr("disabled"),$("input#start").removeAttr("onClick").attr("onClick","startDownload()").attr("value","Start Download")}function onError(t){writeToScreen('<span style="color: red;">ERROR:</span> Unable to connect to Scarlet Servers')}function doSend(t){console.log("SENT: "+t),websocket.send(t)}function updateFile(t){$(".file").html(t)}function updateStatus(t){$(".status").html(t)}function updateProgress(t){var e=t.split("/"),o=parseFloat(e[0]);$(".progress-meter").css("width",o+"%")}function updateInstallLocation(t){$.post("/api/user/install/"+info.key,{installDir:t}).done(function(){$.get("/api/user/info/"+info.key,function(t){info=t,updateFile("Current Install Location is: "+info.installDir)})})}function completed(){updateFile("Start ARMA 3 using the Steam Launcher"),writeToScreen("Download Complete")}function changeLocation(){doSend("Updater|locationChange")}function writeToScreen(t){var e=document.createElement("p");e.style.wordWrap="break-word",output.innerHTML=t}var IP,connected=!1,connectedNo=1,info;$.getJSON("https://sscarlet.australianarmedforces.org/api/user/info/omega",function(t){info=t}),info.username=capitalizeFirstLetter(info.username),$(function(){$.getJSON("/api/ip/",function(t){IP=t.ip})});var wsUri="ws://localhost:1001",output;window.addEventListener("load",init,!1);