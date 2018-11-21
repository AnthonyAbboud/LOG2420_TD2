/* Global Structures */
var lang = ['ENG', 'FR'];
var week = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM']; 
var week_ENG = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
var week_FR = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM']; 
var lbl_activeGroup = ['Active group: ', 'Groupe actif: '];

var username = "nameTest";
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