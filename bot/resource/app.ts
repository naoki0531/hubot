import * as hubot from 'hubot';

module.exports = (robot: hubot.Robot): void => {
    robot.respond(/hello/i, (msg: hubot.Response) => {
        msg.reply("world!!!");
    });
};