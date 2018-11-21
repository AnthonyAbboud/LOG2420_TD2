/* Cote client */
class MessageObserver {
	constructor(){
		this.messagesList = new Map();
	}

	addMessage(msg) {
		let messageArray;
		if(this.messagesList.has(msg.channelId)){
			messageArray = this.messagesList.get(msg.channelId);
			this.messagesList.delete(msg.channelId);
			this.messagesList.set(msg.channelId, messageArray);
			this.displayMessage(msg);
		}
	}

	displayMessage(msg) {
		let msgDate = new Date(msg.timestamp);
		let estTimezoneHours = msgDate.getUTCHours() - 5;
		let stringFormattedHours;
		let stringFormattedMinutes;
		let msgDateFormatted;
		estTimezoneHours < 10 ? (stringFormattedHours='0'+estTimezoneHours) : stringFormattedHours=estTimezoneHours;
		msgDate.getUTCMinutes() < 10 ? (stringFormattedMinutes='0'+msgDate.getUTCMinutes()) : stringFormattedMinutes=msgDate.getUTCMinutes();
		msgDateFormatted = week_FR[msgDate.getUTCDay()] + ' ' + msgDate.getUTCDate() + ', ' + stringFormattedHours + ':' + stringFormattedMinutes;

		if(msg.sender == username){
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
		let msgDate;
		let msgDateFormatted;
		for(let i = 0; i < oldMsgList.length; i++){
			msgDate = new Date(oldMsgList[i].timestamp);
			let estTimezoneHours = msgDate.getUTCHours() - 5;
			let stringFormattedHours;
			let stringFormattedMinutes;
			estTimezoneHours < 10 ? (stringFormattedHours='0'+estTimezoneHours) : stringFormattedHours=estTimezoneHours;
			msgDate.getUTCMinutes() < 10 ? (stringFormattedMinutes='0'+msgDate.getUTCMinutes()) : stringFormattedMinutes=msgDate.getUTCMinutes();
			msgDateFormatted = week_FR[msgDate.getUTCDay()] + ' ' + msgDate.getUTCDate() + ', ' + stringFormattedHours + ':' + stringFormattedMinutes;

			if(oldMsgList[i].sender == username){
				$(".chat-area").append('<div class="message-self">' + oldMsgList[i].data + '</div>');
				$(".chat-area").append('<div class="message-date-right">' + msgDateFormatted + '</div>');
			} else {
				$(".chat-area").append('<div class="message-sender">' + oldMsgList[i].sender + '</div>');
				$(".chat-area").append('<div class="message">' + oldMsgList[i].data + '</div>');
				$(".chat-area").append('<div class="message-date-left">' + msgDateFormatted + '</div>');
			}
		}
		$(".chat-area").scrollTop($(".chat-area")[0].scrollHeight);
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
    		var msg = new Message("onMessage", "dbf646dc-5006-4d9f-8815-fd37514818ee", $("#message-input").val(), "testName", Date());
    		// Envoi de l'objet msg à travers une chaîne formatée en JSON
    		if (client.readyState==1) {
      			client.send(JSON.stringify(msg));
    		}
  			// Efface le texte de l'élément input afin de recevoir la prochaine ligne de texte que l'utilisateur va saisir
  			$("#message-input").val("");
		}
	}

	setMessagesActiveChannel(getChannelResponse){
		let messageArray = getChannelResponse.messages;
		this.messagesList.set(getChannelResponse.id, messageArray);
		this.displayOldMessages(this.messagesList.get(getChannelResponse.id));
	}
}
