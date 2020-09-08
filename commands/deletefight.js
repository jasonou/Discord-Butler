const firestore = require('../server/firebase');

const deletefight = async (commandParameters) => {
  await firestore.collection('fights').doc(commandParameters[0]).delete();

  return `${commandParameters[0]} has been deleted.`;
};

module.exports = deletefight;
