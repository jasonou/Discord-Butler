const rolldice = (commandParameters) => {
  let rolledDice = 0;
  let maxRoll = 6;

  if (
    commandParameters.length &&
    !isNaN(commandParameters[0])
  ) {
    maxRoll = commandParameters[0];
  }

  rolledDice = Math.floor((Math.random() * parseInt(maxRoll)) + 1);
  return `The ${maxRoll} sided :game_die: rolled: **${rolledDice}**`;
};

module.exports = rolldice;
