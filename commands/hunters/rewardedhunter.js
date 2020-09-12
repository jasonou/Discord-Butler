const firestore = require('../../server/firebase');
const isValidCommand = require('../../utils/isValidParams');

const rewardedhunter = async (commandParameters) => {
  const exampleCommand = `butler, rewardedhunter <hunter name>`;
  const isInvalidCommand = isValidCommand(commandParameters, 1, exampleCommand);
  if (isInvalidCommand.length > 0) return isInvalidCommand;

  await firestore
    .collection('hunters')
    .doc(commandParameters[0])
    .set(
      { pending_quartz: 0 },
      { merge: true }
    );

  return `Pending Quartz has been cleared for hunter: ${commandParameters[0]}.`
};

module.exports = rewardedhunter;
