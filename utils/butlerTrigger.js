const butlerTriggerWord = "butler,";

const isValidTrigger = (trigger) => {
  return trigger.toLowerCase() === butlerTriggerWord;
}

module.exports = isValidTrigger;
