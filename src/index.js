const Slack = require('slack');
const moment = require('moment');

const thursday = 4;
const currentDayNumber = moment().isoWeekday();
const numberRegex = /([\d{4}]+)/;

const token = process.env.SLACK_API_KEY;
const channel = process.env.SLACK_CHANNEL;
const slackBotId = process.env.SLACK_BOT_ID

const getCorrectLatestTs = (() => {
    if (currentDayNumber >= thursday) {
        return moment().isoWeekday(4).unix();
    } else {
       return today.unix();
    }
});

const fetchMessages = ((slackBot) => {
    const oldest = moment().subtract(1, 'weeks').isoWeekday(thursday).unix();
    const latest = getCorrectLatestTs();

    slackBot.channels.history({ channel, oldest, latest }).then((history) => {
        return history.messages.filter((message) => {
            message.user == 'USLACKBOT' && message.bot_id == slackBotId;
        })
    })

});

const extractShedCode = ((message) => {
    messages[0].files[0].plain_text.match(numberRegex)
})

exports.getShedCode = async (req , res) => {
    var message = '';
    const slackBot = new Slack({ token })

    const messages = await fetchMessages(slackBot);
    
    const bikeShedCode = extractShedCode(messages);

    if (bikeShedCode != '') {
        message = `The code is ${bikeShedCode}`
    } else {
        message = 'Sorry there has been an error. Please try again.'
    }

    res.send(message);
}