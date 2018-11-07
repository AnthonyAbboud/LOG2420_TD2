function connect() {
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
    console.log("ok");
  
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

connect();