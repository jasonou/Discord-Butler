const discordClient = require('./client/discord');

const isValidTrigger = require('./utils/butlerTrigger');
const generateAliasFlatMap = require('./utils/generateAliasFlatMap');

const commandMap = {
  rolldice: require('./commands/rolldice'),
  assignnumbers: require('./commands/assignnumbers'),
  help: require('./commands/help'),
  listcharacters: require('./commands/listcharacters'),
  addcharacter: require('./commands/addcharacter'),
  deletecharacter: require('./commands/deletecharacter'),
  listfights: require('./commands/listfights'),
  deletefight: require('./commands/deletefight'),
  startfight: require('./commands/startfight'),
  addhunter: require('./commands/hunters/addhunter'),
  deletehunter: require('./commands/hunters/deletehunter'),
  edithunter: require('./commands/hunters/edithunter'),
  gethunter: require('./commands/hunters/gethunter'),
  listhunters: require('./commands/hunters/listhunters'),
  completebounty: require('./commands/hunters/completebounty'),
  rewardedhunter: require('./commands/hunters/rewardedhunter'),
  getlegend: require('./commands/bounties/getlegend'),
  getbounty: require('./commands/bounties/getbounty'),
  getmythic: require('./commands/bounties/getmythic')
};

const aliasMap = {
  rolldice: ['rd'],
  assignnumbers: ['an'],
  help: ['h'],
  listcharacters: ['lc'],
  addcharacter: ['ac'],
  deletecharacter: ['dc'],
  listfights: ['lf'],
  deletefight: ['df'],
  startfight: ['sf'],
  addhunter: ['ah'],
  deletehunter: ['dh'],
  edithunter: ['eh'],
  gethunter: ['gh'],
  listhunters: ['lh'],
  completebounty: ['cb'],
  rewardedhunter: ['rh'],
  getlegend: ['gl'],
  getbounty: ['gb'],
  getmythic: ['gm']
};

const aliasFlatMap = generateAliasFlatMap(commandMap, aliasMap);

discordClient.on('message', async (message) => {
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

    const res = await commandMap[aliasFlatMap[command]](commandParameters);
    await message.channel.send(res);
  }
});

module.exports = {
  stop() {
    discordClient.destroy();
    process.exit(0);
  },
};
