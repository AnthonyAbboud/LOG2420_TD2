class ChannelObserver{
  constructor(){
    this.channelsList = new Map();
    this.activeChannel;
  }

  addChannel(channelInfo){
    console.log(channelInfo);
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
        $(".group-list-area").prepend('<div class="group-list-elements"  style="background-color: ' + channelBckColor + ';"><div id="group-list-star-icon"><i class="fas fa-star"></i></div><div id="group-list-name"><strong>' + channel.name + '</strong></div><div id="default-label"><p>défaut</p></div></div>');
      } else {
        if(channel.joinStatus){
          $(".group-list-area").append('<div class="group-list-elements" id="area" style="background-color: ' + channelBckColor + ';"><div id="group-list-minus-icon"><i class="fas fa-minus" onclick=removeChannel()></i></div><div id="group-list-name"><strong>' + channel.name + '</strong></div><div id="default-label"></div></div>');  
        } else {
          $(".group-list-area").append('<div class="group-list-elements" style="background-color: ' + channelBckColor + ';"><div id="group-list-plus-icon"><i class="fas fa-plus"></i></div><div id="group-list-name"><strong>' + channel.name + '</strong></div><div id="default-label"></div></div>');
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

  onCreateChannel() {
    var ID='_' + Math.random().toString(36).substr(2, 9);
    var msg = new Message("onCreateChannel", ID, document.getElementById("nomGroupe").innerHTML, "", Date());

    var name=document.getElementById("nomGroupe").innerHTML;
    if (client.readyState==1) {
        client.send(JSON.stringify(msg));
  }
    var channel=new Channel(ID,name,0,msg,1);
    console.log(channel);
  }
}

let instance=new ChannelObserver;
function dialogueBox() {
    var box=prompt("Saisir nom du groupe");
    document.getElementById("nomGroupe").innerHTML=box;
    if (document.getElementById("nomGroupe")!="")
        instance.onCreateChannel();
}
function removeChannel() {
    var element = document.getElementById("area");
    element.parentNode.removeChild(element);
}