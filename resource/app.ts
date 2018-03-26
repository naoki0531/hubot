import * as hubot from 'hubot';
import {birthday} from './birthdayInterface';
import BirthDay from './birthday';
import {CronJob} from 'cron';

module.exports = (robot: hubot.Robot): void => {
    new CronJob('0 30 17 * * 1-5', () => {
        robot.send({room: "nbs_random"}, "定時ですよ〜");
    }).start();

    robot.respond(/誕生日( *)(.*)/i, (msg: hubot.Response) => {
        let date = '';
        if (msg.match[2] !== '') {
            date = msg.match[2];
        }
        const birthdayMember: Array<birthday> = BirthDay.fetchCelebrated(date);

        if (birthdayMember.length === 0) {
            if (date !== '') {
                msg.reply(`${date}が誕生日の方はいません。`);
            }
            return;
        }

        let nameString: string = '';
        birthdayMember.forEach((birthday: birthday) => {
            nameString += birthday.name + 'さん ';
        });

        msg.reply(`${date === '' ? '本日' : date}は ${nameString}の誕生日です！`);
    });

    robot.respond(/birthday register (.+) (.+)/, (msg: hubot.Response) => {
        console.log(BirthDay.register({date: msg.match[1], name: msg.match[2]}));
        msg.reply('登録完了しました！');
    });

    robot.respond(/機能/, (msg: hubot.Response) => {
        msg.reply('** 自動実行 **\n' +
            '10:00 誕生日お知らせ\n' +
            '17:30 定時お知らせ\n' +
            '\n ** コマンドリスト **\n' +
            '誕生日 登録 {日付} {名前} : 例）誕生日 登録 0301 nbs-bot\n' +
            '誕生日 {日付} : 例）誕生日 0418'
        );
    });
};