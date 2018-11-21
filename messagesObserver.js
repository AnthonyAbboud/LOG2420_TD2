/* Cote client */
class MessageObserver {
	constructor(){
		this.messagesList = new Map();
	}

	displayOldMessages(oldMsgList){
		for(let i = 0; i < oldMsgList.length; i++){
			console.log(oldMsgList[i])
			$(".chat-area").append('<div class="message">' + oldMsgList[i].data + '</div>');
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
