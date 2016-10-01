

var wsUri = "ws://localhost:1001";

function init()
{
    testWebSocket();
}

function testWebSocket()
{
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt)
{
    window.location = "/mods/";
}

function onClose(evt)
{

}
