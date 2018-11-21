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
        case "onCreateChannel":
          console.log("ONCREATECHANNEL");
          break;
        case "onError":
          console.log("Error");
          break;
        case "onGetChannel":
          messageObserver.setMessagesActiveChannel(msg.data);
          break;
        case "onJoinChannel":
          channelObserver.addChannel(msg);
          break;
        case "onLeaveChannel":
          console.log("ONLEAVECHANNEL");
          break;
        case "onMessage":
          messageObserver.addMessage(msg);
          break;
        case "updateChannelsList":
          channelObserver.updateChannelsList(msg.data);
          messageObserver.getMessagesActiveChannel(channelObserver.activeChannel.id);
          break;
        default:
          break;
      }
    }
  }
}