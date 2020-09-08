const firestore = require('../server/firebase');

const deletecharacter = async (commandParameters) => {
  await firestore.collection('characters').doc(commandParameters[0]).delete();

  return `${commandParameters[0]} has been deleted.`;
};

module.exports = deletecharacter;
