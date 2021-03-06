const firestore = require('../server/firebase');

const getCharacterList = async () => {
  const characterMap = {};

  const docsPromise = await firestore.collection('characters').get();
  docsPromise.forEach((doc) => {
    characterMap;
    characterMap[doc.id] = doc.data();
  });

  return characterMap;
};

const elementMapping = {
  fire: '🔥',
  earth: '🌳',
  water: '💧',
  wind: '💨',
  lightning: '⚡️',
}

const listcharacters = async (commandParameters) => {
  const characterList = await getCharacterList();

  const characterFormattedInfo = [];
  for (const [name, stats] of Object.entries(characterList)) {
    const element = elementMapping[stats.element];
    const formattedName = `- [${element}${name}]`;
    const paddingAmount = 20 - formattedName.length;
    let padding = '';
    for (let i = 0; i < paddingAmount; ++i) {
      padding += ' ';
    }

    characterFormattedInfo.push(
        `${formattedName}${padding}` +
        ` | 💖${stats.hp}${stats.hp > 9 ? '' : ' '}` +
        ` | 🔪${stats.attack}${stats.attack > 9 ? '' : ' '}` +
        ` | 🍀${stats.luck}${stats.luck > 9 ? '' : ' '}` +
        ` | 🌟${stats.special}${stats.special > 9 ? '' : ' '} |`,
    );
  }

  return `\`\`\`CSS\n${characterFormattedInfo.join('\n')}\`\`\``;
};

module.exports = listcharacters;
