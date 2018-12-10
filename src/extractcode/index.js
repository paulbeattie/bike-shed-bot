const numberRegex = /([\d{4}]+)/;

const extractCode = (message) => {
  const code = message.files[0].plain_text.match(numberRegex);

  if (code != null) {
    return code[0];
  }
};

module.exports = extractCode;
