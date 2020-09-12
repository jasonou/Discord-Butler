const isValidParams = (params, requiredLength, exampleCommand) => {
  if (params.length !== requiredLength) {
    return `Invalid command.\n\nExample:\n${exampleCommand}`;
  }

  return '';
};

module.exports = isValidParams;
