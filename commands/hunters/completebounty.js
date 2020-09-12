const firestore = require('../../server/firebase');
const isValidCommand = require('../../utils/isValidParams');

const getHunterData = async (hunterName) => {
  const hunter = firestore.collection('hunters').doc(hunterName);
  const hunterObject = await hunter.get();
  return hunterObject.data();
};

const completebounty = async (commandParameters) => {
  const exampleCommand = `butler, completebounty <assigned to> <caught by> <reward>`;
  const isInvalidCommand = isValidCommand(commandParameters, 3, exampleCommand);
  if (isInvalidCommand.length > 0) return isInvalidCommand;

  try {
    if (commandParameters[0] === commandParameters[1]) {
      const hunterData = await getHunterData(commandParameters[0]);
      const hunter = {
        completed: parseInt(hunterData.completed) + 1,
        pending_quartz: parseInt(hunterData.pending_quartz) + parseInt(commandParameters[2])
      }
      await firestore.collection('hunters').doc(commandParameters[0]).set(hunter, { merge: true });
      return `Hunter profile for ${commandParameters[0]} has been updated.`;
    } else {
      const firstHunterData = await getHunterData(commandParameters[0]);
      const secondHunterData = await getHunterData(commandParameters[1]);

      const firstHunter = {
        completed: parseInt(firstHunterData.completed) + 1,
        pending_quartz: parseInt(firstHunterData.pending_quartz) + parseInt(commandParameters[2])
      }

      const secondHunter = {
        assists: parseInt(secondHunterData.assists) + 1
      }

      await firestore.collection('hunters').doc(commandParameters[0]).set(firstHunter, { merge: true });
      await firestore.collection('hunters').doc(commandParameters[1]).set(secondHunter, { merge: true });
      return `Hunter profile for ${commandParameters[0]} and ${commandParameters[1]} has been updated.`;
    }
  } catch (e) {
    console.log(e);
    return `Cannot fulfill bounty. Failed to find hunter(s).`;
  }
};

module.exports = completebounty;
