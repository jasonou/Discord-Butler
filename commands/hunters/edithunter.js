const firestore = require('../../server/firebase');
const isValidCommand = require('../../utils/isValidParams');

const edithunter = async (commandParameters) => {
  const exampleCommand = `butler, edithunter <hunter name> <completed bounties> <in progress> <assists> <assist points> <pending quartz>`;
  const isInvalidCommand = isValidCommand(commandParameters, 6, exampleCommand);
  if (isInvalidCommand.length > 0) return isInvalidCommand;

  const hunter = {
    completed: parseInt(commandParameters[1]),
    in_progress: parseInt(commandParameters[2]),
    assists: parseInt(commandParameters[3]),
    assist_points: parseInt(commandParameters[4]),
    pending_quartz: parseInt(commandParameters[5])
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
