const firestore = require('../../server/firebase');

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
    formattedHunterInfo.push(`- [${name}]`);
    formattedHunterInfo.push(`#completed_bounties: ${stats.completed}`);
    formattedHunterInfo.push(`#assists: ${stats.assists}`);
    formattedHunterInfo.push(`#available_assist_points: ${stats.assist_points}`);
    formattedHunterInfo.push(`#in_progress_bounties: ${stats.in_progress}`);
    formattedHunterInfo.push(`#pending_quartz_rewards: ${stats.pending_quartz}\n`);
  }

  return `\`\`\`CSS\n${formattedHunterInfo.join('\n')}\`\`\``;
};

module.exports = listhunters;
