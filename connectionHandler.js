class ConnectionHandler {
  constructor(client, messageObserver, channelObserver) {
    this.client = client;
    this.messageObserver = messageObserver;
    this.channelObserver = channelObserver;
  }

  init() {
    this.client.onopen = function() {
      console.log("Connected");
    };

    this.client.onerror = function() {
      console.log("Web Socket error!");
    }

    this.client.onmessage = function(event) {
      let rawMsg = event.data;
      let msg = JSON.parse(event.data);
      console.log(msg);

      switch(msg.eventType) {
        case "onError":
          console.log("Error");
          break;
        case "onMessage":
          console.log("Message recu: " + msg.data);
          break;
        case "updateChannelsList":
          console.log("UPDATECHANNELSLIST");
          break;
        default:
          break;
      }
    }
  }
}


/*function connect() {
  exampleSocket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice");

  exampleSocket.onopen = function () 
  {
      console.log("Web Socket opened!");
  }

  exampleSocket.onerror = function () 
  { 
      console.log("ERROR"); 
  }


  exampleSocket.onmessage = function (event) 
  {  
    var text = "";
    var msg = JSON.parse(event.data);
    var time = new Date(msg.date);
    var timeStr = time.toLocaleTimeString();    
    console.log(msg);

    if(msg.channelId="666"){

      switch(msg.eventType) {
        case "id":
          clientID = msg.id;
          setUsername();
          break;
        case "username":
          text = "<b>User <em>" + msg.name + "</em> signed in at " + timeStr + "</b><br>";
          break;
        case "onMessage":
        {
          text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
        }
          
          break;
        case "rejectusername":
          text = "<b>Your username has been set to <em>" + msg.name + "</em> because the name you chose is in use.</b><br>"
          break;
        case "userlist":
          var ul = "";
          for (i=0; i < msg.users.length; i++) {
            ul += msg.users[i] + "<br>";
          }
          document.getElementById("userlistbox").innerHTML = ul;
          break;
      }
    }
  }
}

connect();*/