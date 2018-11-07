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
  console.log("sendtext");
    // Création d'un objet msg qui contient les données dont le serveur a besoin pour traiter le message
    var msg = new Message("onMessage", null, document.getElementById("text").value, null, Date.now());

    // Envoi de l'objet msg à travers une chaîne formatée en JSON
    if (exampleSocket.readyState==1) {
      exampleSocket.send(JSON.stringify(msg));
      console.log("fait");
    }
        
    // Efface le texte de l'élément input afin de recevoir la prochaine ligne de texte que l'utilisateur va saisir
    document.getElementById("text").value = "";
}

document.getElementById("bouton_envoyer").addEventListener("keypress", function(e){
  var key = e.which || e.keyCode;
  if(key == 13){
    sendText();
  }
});
document.getElementById("bouton_envoyer").addEventListener("click", sendText);

//Réception des données du serveur et interpretation JSON
//voir connectionHandler.js



  // Ajouter un EventListener

/*

  var bouton = document.getElementsByClassName("bouton_envoyer"); //bouton d'envoi du message 

  bouton.addEventListener('click',function(e){ // on écoute l'évènement 'click' sur le bouton permettant d'envoyer le message 
  e.preventDefault(); // on stoppe la propagation 
  exampleSocket.sendMessage(); // on envoie un message vers le serveur
  console.log("boucle eventListener");
  return false;
} , true) ; 

*/ 

