import * as hubot from 'hubot';
import * as fs from 'fs';

interface birthday {
    name: string,
    date: string
}

module.exports = (robot: hubot.Robot): void => {
    robot.respond(/hello/i, (msg: hubot.Response) => {
        const today: Date = new Date();
        const ymd: string = String(today.getFullYear()) + ('00' + (today.getMonth() + 1)).slice(-2) + ('00' + today.getDate()).slice(-2);
        const birthdayList: Array<birthday> = JSON.parse(fs.readFileSync('data/birthday.json', 'utf8'));
        for (const key in birthdayList) {
            if (ymd === birthdayList[key].date) {
                msg.reply(`本日は${birthdayList[key].name}さんの誕生日です！`);
                break;
            }
        }
    });
};