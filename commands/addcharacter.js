const firestore = require('../server/firebase');

const elementMapping = {
  fire: '🔥',
  earth: '🌳',
  water: '💧',
  wind: '💨',
  lightning: '⚡️',
}

const addcharacter = async (commandParameters) => {
  if (commandParameters.length !== 6) {
    return `Failed to add character. Please double check your command.`;
  }

  const character = {
    name: `${commandParameters[0]}`,
    hp: parseInt(commandParameters[1]),
    attack: parseInt(commandParameters[2]),
    luck: parseInt(commandParameters[3]),
    special: parseInt(commandParameters[4]),
    element: commandParameters[5]
  };

  await firestore.collection('characters').doc(character.name).set(character);

  const characterString =
    `- [${elementMapping[character.element]}${character.name}]` +
    ` | 💖${character.hp}` +
    ` | 🔪${character.attack}` +
    ` | 🍀${character.luck}` +
    ` | 🌟${character.special} |`;
  return `\`\`\`CSS\n${characterString}\n*Successfully Added.\`\`\``;
};

module.exports = addcharacter;
