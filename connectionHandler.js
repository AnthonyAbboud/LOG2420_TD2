var exampleSocket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice");

    exampleSocket.onopen = function () {
     console.log("Web Socket open!"); }

     exampleSocket.onerror = function () 
     { console.log("ERROR"); }

    //  exampleSocket.onmessage = function () 
    //  { console.log("Message Receieved"); } 

     
     

    