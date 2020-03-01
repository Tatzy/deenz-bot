const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');

const prefix = "!";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith("!livematch")) {
    let url = "http://localhost:5000/?livematch=" + msg.content.split(" ")[1];

    let settings = { method: "Get" };

    fetch(url, settings)
      .then(res => res.json())
      .then((json) => {
        console.log(json.staus);
        if (json.status == 3) {
          message_content = "```";
          var name_length = 4;
          var champ_length = 8;
          var rank_length = 4;
          var winrate_length = 6;
          console.log(json)
          json.teamOne.forEach(element => {
            if (element.playerName.length > name_length) {
              name_length = element.playerName.length;
            }
            if (element.rankName.length > rank_length) {
              rank_length = element.rankName.length;
            }
            if (element.championName.length > champ_length) {
              champ_length = element.championName.length;
            }
            if (element.winrate.length > winrate_length) {
              winrate_length = element.winrate.length;
            }

            //message_content += element.playerName + " " + element.championName + "\n";
          });
          var msg_content1 = "";
          if (name_length > 4) {
            msg_content1 += "| NAME" + " ".repeat(name_length - 4) + "|";
          }
          else {
            msg_content1 += "| NAME |";
          }
          if (champ_length > 8) {
            msg_content1 += " CHAMPION" + " ".repeat(champ_length - 8) + "|";
          }
          else {
            msg_content1 += " CHAMPION |";
          }
          if (rank_length > 4) {
            msg_content1 += " RANK" + " ".repeat(rank_length - 4) + "|";
          }
          else {
            msg_content1 += " RANK |";
          }
          if (winrate_length > 7) {
            msg_content1 += " WINRATE" + " ".repeat(winrate_length - 7) + "|";
          }
          else {
            msg_content1 += " WINRATE |";
          }
          msg_content1 += "\n TEAM ONE \n" + "_".repeat(msg_content1.length) + "\n";
          message_content += msg_content1;
          console.log(name_length);
          json.teamOne.forEach(element => {
            message_content+= "| " + element.playerName + " ".repeat(name_length - element.playerName.length) + "| " + element.championName + " ".repeat(champ_length - element.championName.length+2) + "| " + element.rankName + " ".repeat(rank_length - element.rankName.length) + "| " + element.winrate + " ".repeat(winrate_length - element.winrate.length) + "|\n";
          });
          message_content += "```";
          msg.channel.send(message_content);
        }
      });
  }


});



client.login('');