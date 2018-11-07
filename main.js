let username = "nameTest";
let url = "ws://log2420-nginx.info.polymtl.ca/chatservice?username="
var client = new WebSocket(url+username);

var messageObserver = new MessageObserver();
var channelObserver = new ChannelObserver();

var connectionHandler = new ConnectionHandler(client, messageObserver, channelObserver);

connectionHandler.init();