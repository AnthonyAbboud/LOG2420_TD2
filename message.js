/* Aide : 
https://www.xul.fr/html5/websocket.php 

https://developer.mozilla.org/fr/docs/WebSockets/Writing_WebSocket_client_applications#Utilisation_de_JSON_pour_transmettres_des_objets
*/ 


/**
 * @description Message, Represents a message DTO (data transfert object).
 * @author Tanga Mathieu Kaboré
 * @copyright Ecole Polytechnique de Montréal & Course LOG2420
 * @version 1.0.0
 */
class Message {

    /**
     * Create a new data transfert object (DTO) message.
     * @param {string} eventType - The event type of the message.
     * @param {string} channelId - The channel id.
     * @param {AnyObject} data - The content of the message.
     * @param {string} sender - The sender name.
     * @param {Date} timestamp - The timestamp of the message.
     */
    constructor(eventType, channelId, data, sender, timestamp) {
        this.eventType = eventType;
        this.channelId = channelId;
        this.data = data;
        this.sender = sender;
        this.timestamp = timestamp;
    }
}

// Envoi des données vers le serveur en JSON
function sendText() {
  console.log("Ready State: " + client.readyState);
  if($("#text").val() != ''){
    // Création d'un objet msg qui contient les données dont le serveur a besoin pour traiter le message
    var msg = new Message("onMessage", null, document.getElementById("text").value, "testName", Date());
    console.log(msg);
    // Envoi de l'objet msg à travers une chaîne formatée en JSON
    if (client.readyState==1) {
      client.send(JSON.stringify(msg));
      console.log("fait");
    }
  }
  // Efface le texte de l'élément input afin de recevoir la prochaine ligne de texte que l'utilisateur va saisir
  document.getElementById("text").value = "";
}


$("#bouton_envoyer").keypress(function(e) { 
    var key = e.which || e.keyCode;
    if(key == 13){
      sendText();
    }
});

$("#bouton_envoyer").click(sendText);


