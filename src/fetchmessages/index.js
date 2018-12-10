const token = process.env.SLACK_API_KEY;
const channel = process.env.SLACK_CHANNEL;
const slackBotId = process.env.SLACK_BOT_ID;

const slackBot = require('slack')({token});
const moment = require('moment');

const thursday = 4;
const currentDayNumber = moment().isoWeekday();

const getCorrectLatestTs = () => {
  if (currentDayNumber > thursday) {
    return moment().isoWeekday(thursday).unix();
  } else {
    return moment().unix();
  }
};

const fetchMessages = async () => {
  const oldest = moment().subtract(1, 'weeks').isoWeekday(thursday).unix();
  const latest = getCorrectLatestTs();

  const {messages} = await slackBot.channels.history({channel, oldest, latest});

  return messages
      .find((message) => message.bot_id == slackBotId);
};

module.exports = fetchMessages;
