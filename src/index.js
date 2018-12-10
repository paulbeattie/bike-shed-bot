const fetchMessages = require('./fetchmessages');
const extractCode = require('./extractcode');

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
