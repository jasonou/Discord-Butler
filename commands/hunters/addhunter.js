const firestore = require('../../server/firebase');
const isValidCommand = require('../../utils/isValidParams');

const addhunter = async (commandParameters) => {
  const exampleCommand = `butler, addhunter <hunter name>`;
  const isInvalidCommand = isValidCommand(commandParameters, 1, exampleCommand);
  if (isInvalidCommand.length > 0) return isInvalidCommand;

  const hunter = {
    assist_points: 0,
    assists: 0,
    completed: 0,
    in_progress: 0,
    pending_quartz: 0
  };

  const hunterdoc = await firestore.collection('hunters').doc(commandParameters[0]).get();
  if (!hunterdoc.exists) {
    await firestore.collection('hunters').doc(commandParameters[0]).set(hunter);
    return `Added hunter: ${commandParameters[0]}.`
  } else {
    return `Failed to add hunter, ${commandParameters[0]} is already a hunter.`
  }
};

module.exports = addhunter;
