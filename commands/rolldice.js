const rolldice = (diceValue=6) => {
  if (isNaN(diceValue)) diceValue = 6;

  rolledDice = Math.floor((Math.random() * parseInt(diceValue)) + 1);
  return `Yes my Lord. The ${diceValue} sided :game_die: rolled: **${rolledDice}**`
}

module.exports = rolldice;
