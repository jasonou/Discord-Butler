const firestore = require('../../server/firebase');
const getPaddingAmount = require('../../utils/getPaddingAmount');

const getHunterList = async () => {
  const characterMap = {};

  const docsPromise = await firestore.collection('hunters').get();
  docsPromise.forEach((doc) => {
    characterMap;
    characterMap[doc.id] = doc.data();
  });

  return characterMap;
};

const listhunters = async (commandParameters) => {
  const hunterList = await getHunterList();

  const formattedHunterInfo = [];
  for (const [name, stats] of Object.entries(hunterList)) {
    const formattedName = `- [${name}]`;

    formattedHunterInfo.push(
      `${formattedName}${getPaddingAmount(formattedName, 14)}` +
      ` | 📜${stats.completed}${getPaddingAmount(stats.completed, 3)}` +
      ` | 🤝${stats.assists}${getPaddingAmount(stats.assists, 3)}` +
      ` | 🔺${stats.assist_points}${getPaddingAmount(stats.assist_points, 3)}` +
      ` | 💎${stats.pending_quartz}${getPaddingAmount(stats.pending_quartz, 6)} |`,
    );
  }

  if (formattedHunterInfo.length === 0) {
    return `No hunters at the moment. Please add one.`;
  }

  return `\`\`\`CSS\n${formattedHunterInfo.join('\n')}\`\`\``;
};

module.exports = listhunters;
