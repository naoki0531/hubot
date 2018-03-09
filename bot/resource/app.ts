import * as hubot from 'hubot';
import * as fs from 'fs';

interface birthday {
    name: string,
    date: string
}

module.exports = (robot: hubot.Robot): void => {
    robot.respond(/誕生日( *)(.*)/i, (msg: hubot.Response) => {

        msg.reply(msg.match[2]);

        let compareDate = '';
        let dateMessage = '本日';
        if (msg.match[2] !== '') {
            compareDate = msg.match[2];
            dateMessage = msg.match[2];
        } else {
            compareDate = createTodayString();
        }

        const birthdayList: Array<birthday> = JSON.parse(fs.readFileSync('data/birthday.json', 'utf8'));
        let message = `${dateMessage}が誕生日の方はいません。`;
        birthdayList.forEach((birthday: birthday) => {
            if (compareDate === birthday.date) {
                message = `${dateMessage}は${birthday.name}さんの誕生日です！`;
                return;
            }
        });

        msg.reply(message);
    });

    function createTodayString(): string {
        const today: Date = new Date();
        return ('00' + (today.getMonth() + 1)).slice(-2) + ('00' + today.getDate()).slice(-2);
    }
};