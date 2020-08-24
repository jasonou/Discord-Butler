const generateAliasFlatMap = (commandMap, aliases) => {
  const flatMap = {};

  for (const key of Object.keys(commandMap)) {
    if (!Object.prototype.hasOwnProperty.call(flatMap, key)) {
      flatMap[key] = key;
    }
  }

  for (const [key, values] of Object.entries(aliases)) {
    for (const value of values) {
      if (!Object.prototype.hasOwnProperty.call(flatMap, value)) {
        flatMap[value] = key;
      }
    }
  }

  return flatMap;
};

module.exports = generateAliasFlatMap;
