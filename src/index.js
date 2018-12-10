const fetchMessages = require('./fetchmessages');
const numberRegex = /([\d{4}]+)/;

const extractCode = (message) => {
  const code = message.files[0].plain_text.match(numberRegex);

  if (code != null) {
    return code[0];
  }
};

exports.getShedCode = async (req, res) => {
  const message = await fetchMessages();

  const bikeShedCode = extractCode(message);

  let outputMessage;
  if (bikeShedCode) {
    outputMessage = `The code is ${bikeShedCode.split('').join(' ')}`;
  } else {
    outputMessage = 'Sorry there has been an error. Please try again.';
  }

  res.send(outputMessage);
};
