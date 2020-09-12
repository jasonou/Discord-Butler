const getPaddingAmount = (value, maxLength) => {
  const paddingAmount = maxLength - value.toString().length;

  let padding = '';
  for (let i = 0; i < paddingAmount; ++i) {
    padding += ' ';
  }

  return padding;
};

module.exports = getPaddingAmount;
