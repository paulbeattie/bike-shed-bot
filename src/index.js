exports.getShedCode = async (req , res) => {
    const SlackBot = require('slackbots');

    res.send(`Hello ${escapeHtml(req.query.name || req.body.name || 'World')}!`);
}