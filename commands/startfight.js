const firestore = require('../server/firebase');

const startFight = async (commandParameters) => {
  if (commandParameters.length !== 2)
    return `Fight cannot start. Double check command.`
 
  return `Fight started for ${commandParameters[0]} vs. ${commandParameters[1]}.`
};

module.exports = startFight;
