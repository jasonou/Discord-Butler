const getmythic = (commandParameters) => {
  let bountyRank = 0;
  let minRank = 1;
  let maxRank = 250;

  bountyRank = Math.floor(Math.random() * (maxRank - minRank + 1)) + minRank;

  const formattedBountyInfo = [];
  formattedBountyInfo.push(`Bounty Contract: [#${bountyRank}]`);
  formattedBountyInfo.push(`Reward: 2 bounty levels`);
  formattedBountyInfo.push(`Command: !top #${bountyRank}`);

  return `\`\`\`CSS\n${formattedBountyInfo.join('\n')}\`\`\``;
};

module.exports = getmythic;
