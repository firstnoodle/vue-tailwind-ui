import { TIME_IN_MILLISECONDS, unitIsValid } from './time.js';

/**
 * dateDelta
 * dateIsAfter
 * dateIsBefore
 * dateIsBetween
 * dateIsValid
 * datesAreEqual
 * getDecade
 * getWeeknumber
 * moveDate
 * parseDate
 * printDate
 */

/**
 * Get the difference between two dates in a specified format
 * @param {String|Date} date1
 * @param {String|Date} date2
 * @param {String} unit
 * @returns {Number}
 */
export const dateDelta = (date1, date2, unit) => {
    if(date1 === null || date1 === undefined || date2 === null || date2 === undefined) return null;

    date1 = parseDate(date1);
    date2 = parseDate(date2);

    if (!dateIsValid(date1) || !dateIsValid(date2) || !unitIsValid(unit)) {
        return null;
    }

    const deltaMilliseconds = date1.getTime() - date2.getTime();

    return deltaMilliseconds / TIME_IN_MILLISECONDS[unit];
};

/**
 * Check if a (subject)date is after a given (target)date
 * @param {String|Date} subjectDate
 * @param {String|Date} targetDate
 * @returns {Boolean}
 */
export const dateIsAfter = (subjectDate, targetDate) => {
    if(subjectDate === null || subjectDate === undefined || targetDate === null || targetDate === undefined) return null;

    subjectDate = parseDate(subjectDate);
    targetDate = parseDate(targetDate);

    return subjectDate.getTime() > targetDate.getTime();
};

/**
 * Check if a (subject)date is before a given (target)date
 * @param {String|Date} subjectDate
 * @param {String|Date} targetDate
 * @returns {Boolean}
 */
export const dateIsBefore = (subjectDate, targetDate) => {
    if(subjectDate === null || subjectDate === undefined || targetDate === null || targetDate === undefined) return null;

    subjectDate = parseDate(subjectDate);
    targetDate = parseDate(targetDate);
    
    return subjectDate.getTime() < targetDate.getTime();
};

/**
 * Check if a (subject)date is between a given (start)date and (end)date
 * @param {String|Date} subjectDate
 * @param {String|Date} targetDate
 * @returns {Boolean}
 */
export const dateIsBetween = (subjectDate, startDate, endDate) => {
    if(
        subjectDate === null || 
        subjectDate === undefined || 
        startDate === null || 
        startDate === undefined ||
        endDate === null || 
        endDate === undefined
        ) return null;

    return dateIsAfter(subjectDate, startDate) && dateIsBefore(subjectDate, endDate);
};

/**
 * Check wether a date string is valid
 * @param {String} dateString
 */
export const dateIsValid = date => {
    if(date === null || date === undefined) return false;

    date = parseDate(date);
    return date.getTime() === date.getTime();
};

/**
 * Check if two dates are the same
 * @param {Date} date1
 * @param {Date} date2
 * @returns {Boolean}
 */
export const datesAreEqual = (date1, date2) => {
    if(date1 === null || date1 === undefined || date2 === null || date2 === undefined) return false;
    return (
        date1.getUTCFullYear() === date2.getUTCFullYear() &&
        date1.getUTCMonth() === date2.getUTCMonth() &&
        date1.getUTCDate() === date2.getUTCDate()
    );
};

/**
 * Get decade that a given date belongs to
 * @param {Date} date
 * @returns {Integer}
 */
export const getDecade = date => {
    return Math.floor(date.getUTCFullYear() / 10) * 10;
};

/**
 * Get week number of year that a given date belongs to
 * @param {Date} date
 * @returns {Integer}
 */
export const getWeekNumber = date => {
    // Copy date so don't modify original
    date = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNumber = Math.ceil(((date - yearStart) / TIME_IN_MILLISECONDS.DAY + 1) / 7);
    return weekNumber;
};

/**
 * Add / subtract value from date
 * @param {Date|String} date
 * @param {Integer|Float} value
 * @returns {Date}
 */
export const moveDate = (date, value, unit) => {
    date = parseDate(date);

    if (!dateIsValid(date) || !unitIsValid(unit)) {
        return null;
    }

    let unixTime = date.getTime();
    unixTime += value * TIME_IN_MILLISECONDS[unit];
    date.setTime(unixTime);

    return date;
};

/**
 * @param {String|Date} date
 */
export const parseDate = date => {
    if(date === null || date === undefined) return;
    if (typeof date === 'string') {
        const d = new Date(date);
        return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    }
    return date;
};

/**
 * Small conveniency function to print dates to the console
 * @param {Date} date
 * @returns {void}
 */
export const printDate = date => {
    console.log(date.toISOString().substr(0, 16).replace('T', ' '));
};

/**
 * Stringify date
 * @param {String|Date} date 
 */
export const stringifyDate = date => {
    date = parseDate(date);
    if (!dateIsValid(date)) return null;

    return date.toISOString().substr(0, 10);
};

/**
 * Stringify datetime
 * @param {String|Date} date 
 */
export const stringifyDatetime = date => {
    date = parseDate(date);
    if (!dateIsValid(date)) return null;

    return date.toISOString().substr(0, 16).replace('T', ' ');
};
