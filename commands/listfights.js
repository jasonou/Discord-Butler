const firestore = require('../server/firebase');

const getFightList = async () => {
  const fightMap = {};

  const docsPromise = await firestore.collection('fights').get();
  docsPromise.forEach((doc) => {
    fightMap;
    fightMap[doc.id] = doc.data();
  });

  return fightMap;
};

const listfights = async (commandParameters) => {
  const fightList = await getFightList();

  const fightFormattedInfo = [];
  for (const [name, stats] of Object.entries(fightList)) {
    const characters = stats.name.split('-vs-');
    fightFormattedInfo.push(
        `[#${name} - ${stats.name}]` +
        `\nStatus: ${stats.status}` +
        `\nTurn: ${stats.turn}` +
        `\n${characters[0]}: 💖 ${stats[characters[0]]} vs ` +
        `${characters[1]}: 💖 ${stats[characters[1]]}`
    );
  }

  if (fightFormattedInfo.length === 0)
    return `No fights at the moment. Please start one.`;

  return `\`\`\`CSS\n${fightFormattedInfo.join('\n')}\`\`\``;
};

module.exports = listfights;
