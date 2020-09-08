const firestore = require('../server/firebase');

const addcharacter = async (commandParameters) => {
  if (commandParameters.length !== 5) {
    return `Failed to add character. Please double check your command.`;
  }

  const character = {
    name: `${commandParameters[0]}`,
    hp: parseInt(commandParameters[1]),
    attack: parseInt(commandParameters[2]),
    luck: parseInt(commandParameters[3]),
    special: parseInt(commandParameters[4]),
  };

  await firestore.collection('characters').doc('jinkazama').set(character);


  const characterString =
    `- [${character.name}]` +
    ` <hp: ${character.hp}>` +
    ` <att: ${character.attack}>` +
    ` <luck: ${character.luck}>` +
    ` <special: ${character.special}>`;
  return `\`\`\`CSS\n${characterString}\n*Successfully Added.\`\`\``;
};

module.exports = addcharacter;
