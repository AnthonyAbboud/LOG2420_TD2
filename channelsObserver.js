class ChannelObserver{
  constructor(){
    this.channelsList = new Map();
    this.activeChannel;
  }

  addChannel(channelInfo){
    console.log(channelInfo);
  }

  joinChannel(){
    console.log("i wanna join a channel");
  }

  leaveChannel(){
    console.log("i wanna leave a channel");
  }

  setActiveChannel(channel){
    this.activeChannel = channel;
    $(".groupe-actif").append('<h2 id="groupe-actif-nom">'+ this.activeChannel.name +'</h2>');
  }

  updateChannelsList(data){
    let channelBckColor = "#f7f7f7";
    for(let index = 0; index < data.length; index++){
      let channel = new Channel(data[index].id, data[index].name, data[index].joinStatus, data[index].messages, data[index].numberOfUsers);
      if(channel.name == "Général"){
        this.setActiveChannel(channel);
        $(".group-list-area").prepend('<div class="group-list-elements" style="background-color: ' + channelBckColor + ';"><div id="group-list-star-icon"><i class="fas fa-star"></i></div><div id="group-list-name"><strong>' + channel.name + '</strong></div><div id="default-label"><p>défaut</p></div></div>');
      } else {
        if(channel.joinStatus){
          $(".group-list-area").append('<div class="group-list-elements" style="background-color: ' + channelBckColor + ';"><div id="group-list-minus-icon"><i class="fas fa-minus"></i></div><div id="group-list-name"><strong>' + channel.name + '</strong></div><div id="default-label"></div></div>');  
          $("#group-list-minus-icon > .fa-minus").click(function(){
            channelObserver.leaveChannel();
          });        
        } else {
          $(".group-list-area").append('<div class="group-list-elements" style="background-color: ' + channelBckColor + ';"><div id="group-list-plus-icon"><i class="fas fa-plus"></i></div><div id="group-list-name"><strong>' + channel.name + '</strong></div><div id="default-label"></div></div>');
          $("#group-list-plus-icon > .fa-plus").click(function(){
            channelObserver.joinChannel();
          });
        }
      }
      this.channelsList.set(channel.id, channel);

      if(channelBckColor == "#f7f7f7"){
        channelBckColor = "#eaeaea";
      } else {
        channelBckColor = "#f7f7f7";
      }
    }
  }
}