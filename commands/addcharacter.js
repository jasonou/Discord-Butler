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

  await firestore.collection('characters').doc(character.name).set(character);

  const characterString =
    `- [${character.name}]` +
    ` | 💖 ${character.hp}` +
    ` | 🔪 ${character.attack}` +
    ` | 🍀 ${character.luck}` +
    ` | 🌟 ${character.special} |`;
  return `\`\`\`CSS\n${characterString}\n*Successfully Added.\`\`\``;
};

module.exports = addcharacter;
