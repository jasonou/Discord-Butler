const fisherYates = (array) => {
  let count = array.length;
  let randomnumber;
  let temp;

  while (count) {
    randomnumber = Math.random() * count-- | 0;
    temp = array[count];
    array[count] = array[randomnumber];
    array[randomnumber] = temp
  }
}

const assignnumbers = (commandParameters) => {
  let totalNumbers = 0;

  for (let i = 0; i < commandParameters.length; i++) {
    totalNumbers += parseInt(commandParameters[i].split(":")[1]);
  }

  let numbers = Array.from(Array(totalNumbers), (_, i) => i + 1);
  fisherYates(numbers);
  let assignments = Array.from(Array(totalNumbers), (_, i) => i + 1);

  arrayIndex = 0;
  for (let i = 0; i < commandParameters.length; i++) {
    user = commandParameters[i].split(":");
    for (let j = 0; j < parseInt(user[1]); j++) {
      assignments[numbers[arrayIndex]] = `${numbers[arrayIndex]} ${user[0]}`;
      arrayIndex++;
    }
  }

  assignments.splice(0, 1);
  return `\`\`\`\n${assignments.join("\n")}\`\`\``;
}

module.exports = assignnumbers;
