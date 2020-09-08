const firestore = require('../server/firebase');

const calcFirstToGo = (firstCharacterData, secondCharacterData) => {
  const firstCharTotalStats = firstCharacterData.hp +
    firstCharacterData.attack +
    firstCharacterData.luck +
    firstCharacterData.special;
  const secondCharTotalStats = secondCharacterData.hp +
    secondCharacterData.attack +
    secondCharacterData.luck +
    secondCharacterData.special;

  return (firstCharTotalStats > secondCharTotalStats) ?
    firstCharacterData.name : secondCharacterData.name;
};

const getCharacterData = async (characterName) => {
  const character = firestore.collection('characters').doc(characterName);
  const characterObject = await character.get();
  return characterObject.data();
};

const getNewFightId = async () => {
  const fightsList = await firestore.collection('fights').get();
  return fightsList.size + 1;
};

const startFight = async (commandParameters) => {
  if (commandParameters.length !== 2) {
    return `Fight cannot start. Double check command.`;
  }

  try {
    const firstCharacterData = await getCharacterData(commandParameters[0]);
    const secondCharacterData = await getCharacterData(commandParameters[1]);

    const firstToGo = calcFirstToGo(firstCharacterData, secondCharacterData);
    const fightId = await getNewFightId();

    const fightObject = {
      name: `${firstCharacterData.name}-vs-${secondCharacterData.name}`,
      status: 'ongoing',
      [firstCharacterData.name]: firstCharacterData.hp,
      [secondCharacterData.name]: secondCharacterData.hp,
      turn: firstToGo,
    };

    await firestore.collection('fights').doc(`${fightId}`).set(fightObject);

    return `Fight ID #${fightId} started:` +
      ` ${commandParameters[0]} vs. ${commandParameters[1]}.`;
  } catch (e) {
    console.log(e);
    return `Fight cannot start. Failed to find character(s).`;
  }
};

module.exports = startFight;
