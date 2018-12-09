const Slack = require('slack');
const moment = require('moment');

const token = process.env.SLACK_API_KEY;
const channel = process.env.SLACK_CHANNEL;
const slackBotId = process.env.SLACK_BOT_ID

const thursday = 4;
const currentDayNumber = moment().isoWeekday();
const numberRegex = /([\d{4}]+)/;

const getCorrectLatestTs = () => {
    if (currentDayNumber >= thursday) {
        return moment().isoWeekday(4).unix();
    } else {
       return today.unix();
    }
};

const fetchMessages = async (slackBot) => {
    const oldest = moment().subtract(1, 'weeks').isoWeekday(thursday).unix();
    const latest = getCorrectLatestTs();

    const { messages } = await slackBot.channels.history({ channel, oldest, latest });

    return messages
        .filter((message) => message.user == 'USLACKBOT' &&
            message.bot_id == slackBotId);
};

const extractCode = (message) => {
    const code = message[0].files[0].plain_text.match(numberRegex);

    if (code != null) {
        return code[0];
    }
}

exports.getShedCode = async (req , res) => {
    const slackBot = new Slack({ token })

    const messages = await fetchMessages(slackBot);

    const bikeShedCode = extractCode(messages);

    let message;
    if (bikeShedCode) {
        message = `The code is ${bikeShedCode}`;
    } else {
        message = 'Sorry there has been an error. Please try again.';
    }

    res.send(message);
}