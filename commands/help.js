const help = (commandParameters) => {
  const commands = ['assignnumbers', 'rolldice'];
  return `\`\`\`\n${commands.join('\n')}\`\`\``;
};

module.exports = help;
