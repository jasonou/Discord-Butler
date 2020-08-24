const generateAliasFlatMap = (commandMap, aliases) => {
  const flatMap = {};

  for (const key of Object.keys(commandMap)) {
    if (!flatMap.hasOwnProperty(key)) {
      flatMap[key] = key;
    }
  }

  for (const [key, values] of Object.entries(aliases)) {
    for (const value of values) {
      if (!flatMap.hasOwnProperty(value)) {
        flatMap[value] = key;
      }
    }
  }

  return flatMap;
}

module.exports = generateAliasFlatMap;
