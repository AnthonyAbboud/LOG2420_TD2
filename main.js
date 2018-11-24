/* Global Structures */
var nbNotifications = 0;
var lang = ['ENG', 'FR'];
var week = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM']; 
var week_ENG = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
var week_FR = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM']; 
var lbl_activeGroup = ['Active group: ', 'Groupe actif: '];

/* General Functions */
function updateView(){
	$('.nav-user-name').append(username);
}

class MainObserver {
	constructor(){
	}

	incrementNotif(msg){
		nbNotifications += 1;
		$('.nb-notif').empty().append(nbNotifications);
		$('.nb-notif').show();
	}

	resetNotifCanceler(){
		nbNotifications = 0;
		$('.nb-notif').empty();
		$('.nb-notif').hide();
	}
}

var username = "nameTest";
let url = "ws://log2420-nginx.info.polymtl.ca/chatservice?username="
var client = new WebSocket(url+username);

var mainObserver = new MainObserver();
var messageObserver = new MessageObserver();
var channelObserver = new ChannelObserver();

var connectionHandler = new ConnectionHandler(client, messageObserver, channelObserver);


connectionHandler.init();
updateView();

/* Event listeners */
$("#message-input").keypress(function(e) { 
    var key = e.which || e.keyCode;
    if(key == 13){
      messageObserver.sendMessage();
      return false;
    }
});

$(".send-button").click(messageObserver.sendMessage);

$("#create-group-button").click(channelObserver.createChannel);