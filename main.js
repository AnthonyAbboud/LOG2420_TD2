let username = "nameTest";
let url = "ws://log2420-nginx.info.polymtl.ca/chatservice?username="
var client = new WebSocket(url+username);

var messageObserver = new MessageObserver();
var channelObserver = new ChannelObserver();

var connectionHandler = new ConnectionHandler(client, messageObserver, channelObserver);

connectionHandler.init();

/* Event listeners */
$("#message-input").keypress(function(e) { 
    var key = e.which || e.keyCode;
    if(key == 13){
      messageObserver.sendMessage();
    }
});

$(".send-button").click(messageObserver.sendMessage);