/* Cote client */
class MessageObserver {
	constructor(){
		this.messagesList = new Map();
	}

	addMessage(msg) {
		let messageArray;
		if(this.messagesList.has(msg.channelId)){
			messageArray = this.messagesList.get(msg.channelId);
			messageArray.push(msg);
			this.messagesList.delete(msg.channelId);
			this.messagesList.set(msg.channelId, messageArray);
			if(msg.channelId == channelObserver.activeChannelID){
				messageObserver.displayMessage(msg);	
			}
			
		}
		messageObserver.verifyNotifRequired(msg);
	}

	displayMessage(msg) {
		let msgDate = new Date(msg.timestamp);
		let estTimezoneHours = msgDate.getHours();
		let stringFormattedHours;
		let stringFormattedMinutes;
		let msgDateFormatted;
		estTimezoneHours < 10 ? (stringFormattedHours='0'+estTimezoneHours) : stringFormattedHours=estTimezoneHours;
		msgDate.getMinutes() < 10 ? (stringFormattedMinutes='0'+msgDate.getMinutes()) : stringFormattedMinutes=msgDate.getMinutes();
		msgDateFormatted = week_FR[msgDate.getDay()] + ' ' + msgDate.getDate() + ', ' + stringFormattedHours + ':' + stringFormattedMinutes;

		if(msg.sender == 'Admin'){
			$(".chat-area").append('<div class="message-sender-admin">' + msg.sender + '</div>');
			$(".chat-area").append('<div class="message-admin">' + msg.data + '</div>');
			$(".chat-area").append('<div class="message-date-left-admin">' + msgDateFormatted + '</div>');
		}
		else if(msg.sender == username){
			$(".chat-area").append('<div class="message-self">' + msg.data + '</div>');
			$(".chat-area").append('<div class="message-date-right">' + msgDateFormatted + '</div>');
		} else {
			$(".chat-area").append('<div class="message-sender">' + msg.sender + '</div>');
			$(".chat-area").append('<div class="message">' + msg.data + '</div>');
			$(".chat-area").append('<div class="message-date-left">' + msgDateFormatted + '</div>');
		}
		$(".chat-area").scrollTop($(".chat-area")[0].scrollHeight);
	}

	displayOldMessages(oldMsgList){
		$('.chat-area').empty();
		for(let i = 0; i < oldMsgList.length; i++){
			messageObserver.displayMessage(oldMsgList[i]);
		}
	}

	getMessagesActiveChannel(activeChannelId){
		var msg = new Message("onGetChannel", activeChannelId, "", "testName", Date());
		if (client.readyState==1) {
      		client.send(JSON.stringify(msg));
    	}
	}

	sendMessage() {
		if($("#message-input").val() != ''){
    		// Création d'un objet msg qui contient les données dont le serveur a besoin pour traiter le message
    		var msg = new Message("onMessage", channelObserver.activeChannelID, $("#message-input").val(), username, Date());
    		// Envoi de l'objet msg à travers une chaîne formatée en JSON
    		if (client.readyState==1) {
      			client.send(JSON.stringify(msg));
    		}
  			// Efface le texte de l'élément input afin de recevoir la prochaine ligne de texte que l'utilisateur va saisir
  			$("#message-input").val("").focus();
		}
	}

	setMessagesActiveChannel(getChannelResponse){
		let messageArray = getChannelResponse.messages;
		this.messagesList.set(getChannelResponse.id, messageArray);
		this.displayOldMessages(this.messagesList.get(getChannelResponse.id));
	}

	verifyNotifRequired(msg) {
		if(msg.channelID != channelObserver.activeChannelID){
			mainObserver.incrementNotif(msg);
		}
	}
}
