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
  }

  joinChannel(channel){
    if(channel.joinStatus){
      channelObserver.setActiveChannel(channel);
      messageObserver.getMessagesActiveChannel(this.activeChannelID);   
    }
  }

  requestJoinChannel(channelID){
    let msgRequestJoinChannel = new Message("onJoinChannel", channelID, "", username, Date());
    if (client.readyState==1) {
      client.send(JSON.stringify(msgRequestJoinChannel));
    }
  }

  requestLeaveChannel(channelID){
    let msgRequestLeaveChannel = new Message("onLeaveChannel", channelID, "", username, Date());
    if (client.readyState==1) {
      client.send(JSON.stringify(msgRequestLeaveChannel));
    }
  }

  setActiveChannel(channel){
    this.activeChannelName = channel.name;
    this.activeChannelID = channel.id
    $(".groupe-actif").empty();
    $(".groupe-actif").append('<h3 id="groupe-actif-titre">Groupe actif:</h3><h2 id="groupe-actif-nom">'+ this.activeChannelName +'</h2>');
  }

  updateChannelsList(data){
    $(".group-list-area").empty();
    let channelBckColor = "#f7f7f7";
    for(let index = 0; index < data.length; index++){
      let channel = new Channel(data[index].id, data[index].name, data[index].joinStatus, data[index].messages, data[index].numberOfUsers);
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
      //$(".group-list-elements").click(function)
      this.channelsList.set(channel.id, channel);

      if(channelBckColor == "#f7f7f7"){
        channelBckColor = "#eaeaea";
      } else {
        channelBckColor = "#f7f7f7";
      }
    }
  }
}