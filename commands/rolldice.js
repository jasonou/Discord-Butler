const rolldice = (commandParameters) => {
  let rolledDice = 0;
  let diceValue = 6;

  if (commandParameters.length && !isNaN(commandParameters[0])) {
    diceValue = commandParameters[0];
  }

  rolledDice = Math.floor((Math.random() * parseInt(diceValue)) + 1);
  return `Yes my Lord. The ${diceValue} sided :game_die: rolled: **${rolledDice}**`;
}

module.exports = rolldice;
