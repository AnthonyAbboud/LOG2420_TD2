class ConnectionHandler {
  constructor(client, messageObserver, channelObserver) {
    this.client = client;
    this.messageObserver = messageObserver;
    this.channelObserver = channelObserver;
  }

  init() {
    this.client.onopen = function() {
    };

    this.client.onerror = function() {
      window.alert("Connection to Web Socket error!");
    }

    this.client.onmessage = function(event) {
      let rawMsg = event.data;
      let msg = JSON.parse(event.data);

      switch(msg.eventType) {
        case "onError":
          window.alert(msg.data);
          break;
        case "onGetChannel":
          messageObserver.setMessagesActiveChannel(msg.data);
          break;
        case "onMessage":
          messageObserver.addMessage(msg);
          break;
        case "updateChannelsList":
          channelObserver.updateChannelsList(msg.data);
          messageObserver.getMessagesActiveChannel(channelObserver.activeChannelID);
          break;
        default:
          break;
      }
    }
  }
}