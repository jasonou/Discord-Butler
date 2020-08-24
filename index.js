const discordClient = require('./client/discord');
const server = require('./client/server');

const isValidTrigger = require('./utils/butlerTrigger');
const generateAliasFlatMap = require('./utils/generateAliasFlatMap');

const commandMap = {
  rolldice: require('./commands/rolldice'),
  assignnumbers: require('./commands/assignnumbers')
};

const aliasMap = {
  rolldice: [ 'rd' ],
  assignnumbers: [ 'an' ]
};

const aliasFlatMap = generateAliasFlatMap(commandMap, aliasMap);

discordClient.on('message', message => {
  const messageContents = message.content.split(" ");

  if (isValidTrigger(messageContents[0]) && messageContents.length > 1 && aliasFlatMap.hasOwnProperty(messageContents[1])) {
    commandParameters = (messageContents.length > 2) ? messageContents.slice(2, messageContents.length) : [];
    message.channel.send(commandMap[aliasFlatMap[messageContents[1]]](commandParameters));
  }
});
