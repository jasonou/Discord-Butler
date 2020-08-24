const client = require('./client/client');
const isValidTrigger = require('./utils/butlerTrigger');

const commandMap = {
  rolldice: require('./commands/rolldice'),
  assignnumbers: require('./commands/assignnumbers')
};

client.on('message', message => {
  const messageContents = message.content.split(" ");

  if (isValidTrigger(messageContents[0]) && messageContents.length > 1 && commandMap.hasOwnProperty(messageContents[1])) {
    commandParameters = (messageContents.length > 2) ? messageContents.slice(2, messageContents.length) : [];
    message.channel.send(commandMap[messageContents[1]](commandParameters));
  }
});
