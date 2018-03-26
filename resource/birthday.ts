import * as fs from 'fs';
import {birthday} from './birthdayInterface';

export default class Birthday {
    public static fetchCelebrated(date: string = '') {
        const searchDate: string = date === '' ? this.createTodayString() : date;
        const birthdayList: Array<birthday> = JSON.parse(fs.readFileSync('data/birthday.json', 'utf8'));
        const result: Array<birthday> = [];
        birthdayList.forEach((birthday: birthday) => {
            if (searchDate === birthday.date) {
                result.push(birthday);
            }
        });
        return result;
    }

    public static register(birthday: birthday) {
        const birthdayList: Array<birthday> = JSON.parse(fs.readFileSync('data/birthday.json', 'utf8'));
        birthdayList.push(birthday);
        return fs.writeFileSync('data/birthday.json', JSON.stringify(birthdayList));
    }

    private static createTodayString(): string {
        const today: Date = new Date();
        return ('00' + (today.getMonth() + 1)).slice(-2) + ('00' + today.getDate()).slice(-2);
    }
}