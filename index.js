const discordClient = require('./client/discord');

const isValidTrigger = require('./utils/butlerTrigger');
const generateAliasFlatMap = require('./utils/generateAliasFlatMap');

const commandMap = {
  rolldice: require('./commands/rolldice'),
  assignnumbers: require('./commands/assignnumbers'),
  help: require('./commands/help'),
};

const aliasMap = {
  rolldice: ['rd'],
  assignnumbers: ['an'],
};

const aliasFlatMap = generateAliasFlatMap(commandMap, aliasMap);

discordClient.on('message', (message) => {
  const messageContents = message.content.split(' ');
  const command = messageContents[1];

  if (
    isValidTrigger(messageContents[0]) &&
    command &&
    Object.prototype.hasOwnProperty.call(aliasFlatMap, command)
  ) {
    const commandParameters =
      (messageContents.length > 2) ?
        messageContents.slice(2, messageContents.length) : [];

    message.channel.send(
        commandMap[aliasFlatMap[command]](commandParameters),
    );
  }
});
