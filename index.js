const client = require('./client/client');
const isValidTrigger = require('./utils/butlerTrigger');

const commandMap = {
  rolldice: require('./commands/rolldice')
};

client.on('message', message => {
  const messageContents = message.content.split(" ");

  if (isValidTrigger(messageContents[0]) && messageContents.length > 1 && commandMap.hasOwnProperty(messageContents[1])) {
    message.channel.send(commandMap[messageContents[1]](messageContents[2]));
  }
});
