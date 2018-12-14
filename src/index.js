const fetchMessages = require('./fetchmessages');
const extractCode = require('./extractcode');

const bikeShedCode = async () => {
  try {
    const message = await fetchMessages();

    return extractCode(message);
  } catch (e) {
    console.log(e);
    return e
  }
}

exports.getShedCode = async (req, res) => {
  const code = await bikeShedCode();

  const message = code instanceof Error ? 'Soz'
    : `The code is ${code.split('').join(' ')}`;

  res.send(message);
};
