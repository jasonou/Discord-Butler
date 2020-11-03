const getbounty = (commandParameters) => {
  let bountyRank = 0;
  let minRank = 1;
  let maxRank = 54687;

  let kakeraValue = 0;
  let minKakeraValue = 1;
  let maxKakeraValue = 2500;

  bountyRank = Math.floor(Math.random() * (maxRank - minRank + 1)) + minRank;
  kakeraValue = Math.floor(Math.random() * (maxKakeraValue - minKakeraValue + 1)) + minKakeraValue;

  const formattedBountyInfo = [];
  formattedBountyInfo.push(`Bounty Contract: [#${bountyRank}]`);
  formattedBountyInfo.push(`Reward: [${kakeraValue}] Kakera`);
  formattedBountyInfo.push(`Command: !top #${bountyRank}`);

  return `\`\`\`CSS\n${formattedBountyInfo.join('\n')}\`\`\``;
};

module.exports = getbounty;
