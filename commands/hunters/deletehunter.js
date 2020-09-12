const firestore = require('../../server/firebase');
const isValidCommand = require('../../utils/isValidParams');

const deletehunter = async (commandParameters) => {
  const exampleCommand = `butler, deletehunter <hunter name>`;
  const isInvalidCommand = isValidCommand(commandParameters, 1, exampleCommand);
  if (isInvalidCommand.length > 0) return isInvalidCommand;

  await firestore.collection('hunters').doc(commandParameters[0]).delete();

  return `${commandParameters[0]} has been deleted.`;
};

module.exports = deletehunter;
