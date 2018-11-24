class ChannelObserver{
  constructor(){
    this.channelsList = new Map();
    this.activeChannelID = "";
    this.activeChannelName = "";
  }

  createChannel(){
    let channelNameBox = prompt("Pour créer un channel, entrez un nom (5 à 20 caractères):");
    let generatedChannelID = '_' + Math.random().toString(36).substr(2,9);
    let msgRequestCreateChannel = new Message("onCreateChannel", generatedChannelID, channelNameBox, username, Date());
    if (client.readyState==1) {
      client.send(JSON.stringify(msgRequestCreateChannel));
    }
    $("#message-input").focus(); 
  }

  displayChannels(){
    $(".group-list-area").empty();
    let channelBckColor = "#f7f7f7";
    let channelsListEntries = this.channelsList.keys();
    for(let index = 0; index < this.channelsList.size; index++){
      let channelKey = channelsListEntries.next().value;
      let channel = new Channel(this.channelsList.get(channelKey).id, this.channelsList.get(channelKey).name, this.channelsList.get(channelKey).joinStatus, this.channelsList.get(channelKey).messages, this.channelsList.get(channelKey).numberOfUsers);
      if(channel.name == "Général"){
        if(this.activeChannelName == "" && this.activeChannelID == "") {channelObserver.setActiveChannel(channel);}
        $(".group-list-area").prepend('<div id="channel_' + channel.id + '" class="group-list-elements" style="background-color: ' + channelBckColor + ';"><div id="icon_' + channel.id + '" class="group-list-star-icon"><i class="fas fa-star"></i></div><div id="group-list-name"><strong>' + channel.name + '</strong></div><div id="default-label"><p>défaut</p></div></div>');
      } else {
        if(channel.joinStatus){
          $(".group-list-area").append('<div id="channel_' + channel.id + '" class="group-list-elements" style="background-color: ' + channelBckColor + ';"><div id="icon_' + channel.id + '" class="group-list-minus-icon"><i class="fas fa-minus"></i></div><div id="group-list-name"><strong>' + channel.name + '</strong></div><div id="default-label"></div></div>');  
          $('#icon_' + channel.id + ' > .fa-minus').click(function(){
            channelObserver.requestLeaveChannel(channel.id);
          });        
        } else {
          $(".group-list-area").append('<div id="channel_' + channel.id + '" class="group-list-elements" style="background-color: ' + channelBckColor + ';"><div id="icon_' + channel.id + '" class="group-list-plus-icon"><i class="fas fa-plus"></i></div><div id="group-list-name"><strong>' + channel.name + '</strong></div><div id="default-label"></div></div>');
          $('#icon_' + channel.id + ' > .fa-plus').click(function(){
            channelObserver.requestJoinChannel(channel.id);
          });
        }
      }
      $('#channel_' + channel.id).click(function(){
         channelObserver.joinChannel(channel);
      })

      if(channelBckColor == "#f7f7f7"){
        channelBckColor = "#eaeaea";
      } else {
        channelBckColor = "#f7f7f7";
      }
    }
  }

  joinChannel(channel){
    if(channel.joinStatus){
      channelObserver.setActiveChannel(channel);
      messageObserver.getMessagesActiveChannel(this.activeChannelID);
      mainObserver.resetNotifCanceler();   
    }
    $("#message-input").val("").focus();
  }

  requestJoinChannel(channelID){
    let msgRequestJoinChannel = new Message("onJoinChannel", channelID, "", username, Date());
    if (client.readyState==1) {
      client.send(JSON.stringify(msgRequestJoinChannel));
    }
    channelObserver.sortChannels();
    $("#message-input").focus();
  }

  requestLeaveChannel(channelID){
    let msgRequestLeaveChannel = new Message("onLeaveChannel", channelID, "", username, Date());
    if (client.readyState==1) {
      client.send(JSON.stringify(msgRequestLeaveChannel));
    }
    channelObserver.sortChannels();
    $("#message-input").focus();
  }

  setActiveChannel(channel){
    this.activeChannelName = channel.name;
    this.activeChannelID = channel.id
    $(".groupe-actif").empty();
    $(".groupe-actif").append('<h3 id="groupe-actif-titre">Groupe actif:</h3><h2 id="groupe-actif-nom">'+ this.activeChannelName +'</h2>');
  }

  sortChannels(){
    let tempList = new Map();
    for(let [k, v] of this.channelsList){
      if(v.name == "Général"){
        tempList.set(k, v);
        break;
      }
    }

    for(let [k, v] of this.channelsList){
      if(v.joinStatus == true && v.name != "Général"){
        tempList.set(k, v);
      }
    }

    for(let [k, v] of this.channelsList){
      if(v.joinStatus == false){
        tempList.set(k, v);
      }
    }
    this.channelsList = tempList;

    channelObserver.displayChannels();
  }

  updateChannelsList(data){
    for(let index = 0; index < data.length; index++){
      let channel = new Channel(data[index].id, data[index].name, data[index].joinStatus, data[index].messages, data[index].numberOfUsers);
      this.channelsList.set(index, channel);
    }
    channelObserver.sortChannels();
  }
}