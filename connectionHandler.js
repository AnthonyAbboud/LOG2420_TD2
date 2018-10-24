var exampleSocket = new WebSocket("ws://log2420-nginx.info.polymtl.ca");

exampleSocket.onopen = function() {
	console.log("Web socket open!");
};

exampleSocket.onerror = function() {
	console.log("Web socket error!");
};

exampleSocket.onmessage = function() {
	console.log("Message received!");
};
