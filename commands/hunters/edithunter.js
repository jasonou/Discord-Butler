const firestore = require('../../server/firebase');
const isValidCommand = require('../../utils/isValidParams');

const edithunter = async (commandParameters) => {
  const exampleCommand = `butler, edithunter <hunter name> <completed bounties> <assists> <pending quartz>`;
  const isInvalidCommand = isValidCommand(commandParameters, 4, exampleCommand);
  if (isInvalidCommand.length > 0) return isInvalidCommand;

  const hunter = {
    completed: parseInt(commandParameters[1]),
    assists: parseInt(commandParameters[2]),
    pending_quartz: parseInt(commandParameters[3])
  };

  const hunterdoc = await firestore.collection('hunters').doc(commandParameters[0]).get();
  if (!hunterdoc.exists) {
    return `Failed to edit hunter: ${commandParameters[0]} does not exist.`
  } else {
    await firestore.collection('hunters').doc(commandParameters[0]).set(hunter);
    return `Updated hunter: ${commandParameters[0]}.`
  }
};

module.exports = edithunter;
