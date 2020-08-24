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

const listcharacters = async (commandParameters) => {
  const characterList = await getCharacterList();

  const characterFormattedInfo = [];
  for (const [name, stats] of Object.entries(characterList)) {
    characterFormattedInfo.push(
        `- [${name}] <hp: ${stats.hp}>` +
        ` <att: ${stats.attack}>` +
        ` <luck: ${stats.luck}>` +
        ` <special: ${stats.special}>`,
    );
  }

  return `\`\`\`CSS\n${characterFormattedInfo.join('\n')}\`\`\``;
};

module.exports = listcharacters;
