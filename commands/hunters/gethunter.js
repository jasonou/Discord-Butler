const firestore = require('../../server/firebase');
const isValidCommand = require('../../utils/isValidParams');

const gethunter = async (commandParameters) => {
  const exampleCommand = `butler, gethunter <hunter name>`;
  const isInvalidCommand = isValidCommand(commandParameters, 1, exampleCommand);
  if (isInvalidCommand.length > 0) return isInvalidCommand;

  const hunterdoc = await firestore.collection('hunters').doc(commandParameters[0]).get();
  if (!hunterdoc.exists) {
    return `Failed to find hunter: ${commandParameters[0]} does not exist.`
  } else {
    const hunterData = hunterdoc.data();
    const formattedHunterInfo = [];
    formattedHunterInfo.push(`- [${commandParameters[0]}]`);
    formattedHunterInfo.push(`#completed_bounties: ${hunterData.completed}`);
    formattedHunterInfo.push(`#assists: ${hunterData.assists}`);
    formattedHunterInfo.push(`#available_assist_points: ${hunterData.assist_points}`);
    formattedHunterInfo.push(`#pending_quartz_rewards: ${hunterData.pending_quartz}`);
    return `\`\`\`CSS\n${formattedHunterInfo.join('\n')}\`\`\``;
  }
};

module.exports = gethunter;
