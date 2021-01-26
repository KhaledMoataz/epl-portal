class DateTimeWrapper {
    constructor(dateTimeString) {
        const dateTimeStr = dateTimeString.substr(0, 16);
        this.date = new Date(dateTimeStr);
        [this.dateSelectFormat, this.timeInputFormat] = dateTimeStr.split('T');
        const hours = this.date.getHours();
        this.timeString = `${hours % 12 || 12}:${DateTimeWrapper.pad(this.date.getMinutes())} ${
            hours < 12 ? 'AM' : 'PM'
        }`;
        this.dateString = `${this.date.getDate()}/${
            this.date.getMonth() + 1
        }/${this.date.getFullYear()}`;
    }

    getTimeInputFormat() {
        return this.timeInputFormat;
    }

    getDateSelectFormat() {
        return this.dateSelectFormat;
    }

    getDateString() {
        return this.dateString;
    }

    getTimeString() {
        return this.timeString;
    }

    static pad(number) {
        const s = `0${number}`;
        return s.substr(s.length - 2);
    }
}

export default DateTimeWrapper;
