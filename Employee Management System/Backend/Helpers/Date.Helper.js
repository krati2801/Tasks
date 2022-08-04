const moment = require('moment')

module.exports = class DateHelper {

    static getDate(str){
        return moment(str, "YYYY-DD-MM", true)
    }

    static ageFromDateOfBirthday(dateOfBirth) {
        return moment().diff(dateOfBirth, 'years')
    }

    static getDateAfterMinutes(minutes) {
        return moment().add(minutes, 'm').toDate()
    }

    static getDateBeforeDays(days) {
        return moment().subtract(days, 'days').toDate()
    }

    static isDateGone(date) {
        return moment().isAfter(moment(date))
    }

    static getDateBeforeHours(date, time, hours) {
        const formate = "MM-DD-YYYY hh:mm a Z"
        return moment(`${date} ${time} +00:00`, formate, true).subtract(hours, "hours").toDate()
    }

    static getTimeDiff(toDate) {
        return moment(toDate).diff(moment())
    }

    static getDateFromMS(ms) {
        return new Date(parseInt(ms))
    }

}