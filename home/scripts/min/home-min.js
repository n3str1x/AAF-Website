function init(){testWebSocket()}function testWebSocket(){websocket=new WebSocket(wsUri),websocket.onopen=function(o){onOpen(o)},websocket.onclose=function(o){onClose(o)},websocket.onerror=function(o){onError(o)}}function onOpen(o){window.location="/mods/"}function onClose(o){}function onError(o){console.log("Error, Could not Connect to ScarletSVC")}var wsUri="ws://localhost:1001";init();