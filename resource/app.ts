import * as hubot from 'hubot';
import {birthday} from './birthdayInterface';
import BirthDay from './birthday';
import {CronJob} from 'cron';
import Axios from 'axios';

const Config = require('config');

module.exports = (robot: hubot.Robot): void => {
    new CronJob('0 0 10 * * *', () => {
        const birthdayMessage = createBirthdayMemberMessage();
        if (birthdayMessage !== '') {
            robot.send({room: "nbs_random"}, `本日は ${birthdayMessage}の誕生日です！お祝いしましょう！:cake:`);
        }

        notificationExpiredTask();
    }).start();

    robot.respond(/誕生日( +)(\d{4})/i, (msg: hubot.Response) => {
        let date = '';
        if (msg.match[2] !== '') {
            date = msg.match[2];
        }

        const birthdayMessage = createBirthdayMemberMessage(date);
        const dateMessage = date === '' ? '本日' : date;
        msg.send(birthdayMessage === '' ? `${dateMessage}が誕生日の方はいません。` : `${dateMessage}は ${birthdayMessage}の誕生日です！:cake:`);
    });

    robot.respond(/誕生日登録 (\d{4}) (.+)/, (msg: hubot.Response) => {
        BirthDay.register({date: msg.match[1], name: msg.match[2]});
        msg.send('登録完了しました！');
    });

    robot.respond(/機能/, (msg: hubot.Response) => {
        msg.send('** 自動実行 **\n' +
            '10:00 誕生日お知らせ\n' +
            '\n ** コマンドリスト **\n' +
            '誕生日登録 {日付} {名前} : 例）誕生日 登録 0301 nbs-bot\n' +
            '誕生日 {日付} : 例）誕生日 0418'
        );
    });

    robot.respond(/期限切れタスク/, (msg: hubot.Response) => {
        notificationExpiredTask();
    });

    function createBirthdayMemberMessage(date: string = '') {
        const birthdayMember: Array<birthday> = BirthDay.fetchCelebrated(date);
        if (birthdayMember.length === 0) {
            return '';
        }

        let nameString: string = '';
        birthdayMember.forEach((birthday: birthday) => {
            nameString += birthday.name + 'さん ';
        });
        return nameString;
    }

    function notificationExpiredTask() {
        Axios.get(Config.expiredTasks).then((data) => {
            Axios.post(Config.expiredTasksLambda, data.data);
        });
    }
};
