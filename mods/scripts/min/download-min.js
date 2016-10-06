function capitalizeFirstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}function init(){output=document.getElementById("output"),testWebSocket()}function testWebSocket(){websocket=new WebSocket(wsUri),websocket.onopen=function(e){onOpen(e)},websocket.onclose=function(e){onClose(e)},websocket.onmessage=function(e){onMessage(e)},websocket.onerror=function(e){onError(e)}}function onOpen(e){writeToScreen("Connected to Scarlet Servers"),browserConnect(),updateStatus("Hello <span class='username'>"+info.username+"</span>"),updateFile("Current Install Location is: "+info.installDir)}function onClose(e){testWebSocket()}function browserConnect(){doSend("Updater|browserConnect|"+info.username),connectedNo++,setTimeout(function(){0==connected&&(connectedNo<20?(browserConnect(),console.log("Updater Ping - Not Connected")):writeToScreen("Could not Connect to Updater"))},2e3)}function onMessage(e){var t=e.data.split("|");"Browser"==t[0]&&("browserConfirmation"==t[1]?updaterNowConnected(t[2]):"UpdateInstallLocation"==t[1]?(updateInstallLocation(t[2]),console.log(t[2])):"UpdateStatus"==t[1]?updateStatus(t[2]):"UpdateFile"==t[1]?updateFile(t[2]):"UpdateProgress"==t[1]?updateProgress(t[2]):"Completed"==t[1]&&completed())}function updaterNowConnected(e){writeToScreen("Connected to Updater"),console.log("Updater Ping - Connected"),connected=!0,$("#status_updater").removeClass("orange").removeClass("red").removeClass("green").addClass("green"),"free"==e?($("input").removeAttr("disabled"),$("input").removeAttr("class"),$("input").attr("class","button")):(doSend("Updater|fetchStatus"),$("input#location").removeAttr("class").attr("class","button disabled").attr("disabled","disabled"),$("input#start").attr("value","Stop Download").attr("onClick","stopDownload()"))}function startDownload(){doSend("Updater|startDownload|"+info.installDir),writeToScreen("Commencing Download"),$("input#location").removeAttr("class").attr("class","button disabled").attr("disabled","disabled"),$("input#start").attr("value","Stop Download").attr("onClick","stopDownload()")}function stopDownload(){doSend("Updater|stopDownload"),writeToScreen("Download Stopped"),$("input#location").removeAttr("class").attr("class","button").removeAttr("disabled"),$("input#start").removeAttr("onClick").attr("onClick","startDownload()").attr("value","Start Download")}function onError(e){writeToScreen('<span style="color: red;">ERROR:</span> Unable to connect to Scarlet Servers'),$("#status_updater").removeClass("orange").removeClass("red").removeClass("green").addClass("red")}function doSend(e){console.log("SENT: "+e),websocket.send(e)}function updateFile(e){$(".file").html(e)}function updateStatus(e){$(".status").html(e)}function updateProgress(e){var t=e.split("/"),o=parseFloat(t[0]);$(".progress-meter").css("width",o+"%")}function updateInstallLocation(e){$.post("/api/user/install/"+info.key,{installDir:e}).done(function(){$.get("/api/user/info/"+info.key,function(e){info=e,updateFile("Current Install Location is: "+info.installDir)})})}function completed(){updateFile("Start ARMA 3 using the Steam Launcher"),writeToScreen("Download Complete")}function changeLocation(){doSend("Updater|locationChange")}function writeToScreen(e){var t=document.createElement("p");t.style.wordWrap="break-word",output.innerHTML=e}var IP,connected=!1,connectedNo=1,info,serverInfo;$.getJSON("https://sscarlet.australianarmedforces.org/api/user/info/omega",function(e){info=e,info.username=capitalizeFirstLetter(info.username),$("#status_scarletapi").removeClass("orange").removeClass("red").removeClass("green").addClass("green")}).fail(function(){$("#status_scarletapi").removeClass("orange").removeClass("red").removeClass("green").addClass("red")}),$.getJSON("https://sscarlet.australianarmedforces.org/api/armaserver",function(e){serverInfo=e,1==serverInfo["58.162.184.102:2302"].gq_online?$("#status_arma").removeClass("orange").removeClass("red").removeClass("green").addClass("green"):$("#status_arma").removeClass("orange").removeClass("red").removeClass("green").addClass("red")}),$(function(){$.getJSON("/api/ip/",function(e){IP=e.ip})});var wsUri="ws://localhost:1001",output;window.addEventListener("load",init,!1);