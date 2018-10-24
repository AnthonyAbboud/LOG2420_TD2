var exampleSocket;

function connect() {
	exampleSocket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice");

	exampleSocket.onopen = function(event) {
		console.log("Web socket open!");
	}

	exampleSocket.onerror = function(event) {
		console.log(event);
	}

	exampleSocket.onmessage = function(event) {
		console.log(event.data);
	}

}

connect();