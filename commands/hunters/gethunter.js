const firestore = require('../../server/firebase');
const isValidCommand = require('../../utils/isValidParams');
const getPaddingAmount = require('../../utils/getPaddingAmount');

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
    const formattedName = `- [${commandParameters[0]}]`;

    const combinedLevel = Math.floor(hunterData.completed + hunterData.assists/2);

    formattedHunterInfo.push(
      `${formattedName}${getPaddingAmount(formattedName, 14)}` +
      ` | 🔺${combinedLevel}${getPaddingAmount(combinedLevel, 4)}` +
      ` | 📜${hunterData.completed}${getPaddingAmount(hunterData.completed, 3)}` +
      ` | 🤝${hunterData.assists}${getPaddingAmount(hunterData.assists, 3)}` +
      ` | 💎${hunterData.pending_quartz}${getPaddingAmount(hunterData.pending_quartz, 6)} |`,
    );

    return `\`\`\`CSS\n${formattedHunterInfo.join('\n')}\`\`\``;
  }
};

module.exports = gethunter;
