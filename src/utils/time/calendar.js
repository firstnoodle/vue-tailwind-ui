import { datesAreEqual, dateIsValid, getDecade, moveDate, parseDate } from '~/utils/time/dates.js';
import { loopRange } from '~/utils/array';

/**
 * Values for a classic calendar date grid
 */
const COLUMN_COUNT = 7;
const ROW_COUNT = 6;
const CELL_COUNT = COLUMN_COUNT * ROW_COUNT;

export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

/**
 * Premade disable-function to disable weekend (saturday and sunday)
 * @param {Date} date
 * @returns {Boolean}
 */
export const disableWeekend = (date) => {
    const d = parseDate(date);
    const day = d.getUTCDay();
    return day === 0 || day === 6;
};

/**
 * Premade disable-function to disable workdays (monday - friday)
 * @param {Date} date
 * @returns {Boolean}
 */
export const disableWorkDays = (date) => {
    const d = parseDate(date);
    const day = d.getUTCDay();
    const weekDays = [1, 2, 3, 4, 5];
    return weekDays.indexOf(day) !== -1;
};

/**
 * Premade disable-function to disable specific weekDay
 * Accepts both an integer 0-6 or a string fx 'monday'
 * @param {Interger | String} weekDay
 * @returns {Function}
 */
export const disableWeekday = (weekDay) => {
    let parsedDay;
    if (typeof weekDay === 'string') {
        parsedDay = getWeekDayIndex(weekDay);
    } else {
        parsedDay = weekDay;
    }
    return (date) => {
        const d = parseDate(date);
        const day = d.getUTCDay();
        return day === parsedDay;
    };
};

/**
 * Get index of weekday - fx 3 for 'wednesday'
 * @param {Interger | String} weekDayString
 * @returns {Function}
 */
export const getWeekDayIndex = (weekDayString) => {
    if (WEEKDAYS.indexOf(weekDayString.toLowerCase()) === -1) {
        console.log(`Calendjs @ getWeekdayIndex: invalid weekday [${weekDayString}]`);
        return null;
    }
    return WEEKDAYS.indexOf(weekDayString);
};

/**
 * Calendar class
 *
 * @param {Object} options
 * @param {Date|Null} date
 */
export class Calendar {
    constructor(options, date = null) {
        this.options = options;

        // so we can highlight toadys date, month, and year
        const d = new Date();
        this.today = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

        // the selected date - will default to today if none is passed
        this.selectedDate = null;

        // dateCursor determines what we are viewing
        // it has nothing to do with the selectedDate or today
        this.dateCursor = null;

        if (date && dateIsValid(date)) this.setSelectedDate(date);
        else this.setSelectedDate(this.today);
    }

    /**
     * Add {n} days to the dateCursor
     * @param {Integer} years
     */
    addDaysToDateCursor(days) {
        this.dateCursor.setUTCDate(this.dateCursor.getUTCDate() + days);
    }

    /**
     * Add {n} weeks to the dateCursor
     * @param {Integer} weeks
     */
    addWeeksToDateCursor(weeks) {
        this.addDaysToDateCursor(weeks * 7);
    }

    /**
     * Add {n} months to the dateCursor
     * @param {Integer} years
     */
    addMonthsToDateCursor(months) {
        const currentMonth = this.dateCursor.getUTCMonth();
        const requestedMonth = loopRange(currentMonth + months, MONTHS.length);

        // TODO: revisit this - it doesn't seem to be the right solution..
        // change year ?
        const deltaMonths = currentMonth - requestedMonth;
        if (Math.abs(deltaMonths) > 1) {
            if (deltaMonths >= 0) {
                this.addYearsToDateCursor(1);
            } else {
                this.addYearsToDateCursor(-1);
            }
        }
        this.dateCursor.setUTCMonth(requestedMonth);
    }

    /**
     * Add {n} years to the dateCursor
     * @param {Integer} years
     */
    addYearsToDateCursor(years) {
        this.dateCursor.setYear(this.dateCursor.getUTCFullYear() + years);
    }

    /**
     * Add {n} days to the dateCursor
     * @param {Integer} years
     */
    getDatesInCurrentMonth() {
        let cursor = new Date(Date.UTC(this.dateCursor.getUTCFullYear(), this.dateCursor.getUTCMonth(), 1));

        // find and set calendar grid start date
        const startDate = !(cursor.getUTCDay() - this.options.weekStart)
            ? 7
            : loopRange(cursor.getUTCDay() - this.options.weekStart, WEEKDAYS.length);

        cursor.setUTCDate(cursor.getUTCDate() - startDate);

        let dates = [];
        // populate grid
        for (let row = 0; row < CELL_COUNT; row++) {
            dates.push({
                label: cursor.getUTCDate(),
                date: cursor.toUTCString(),
                disabled: this.options.disabledDate ? this.options.disabledDate(cursor) : false,
                inactive: cursor.getUTCMonth() !== this.dateCursor.getUTCMonth(),
                selected: datesAreEqual(cursor, this.selectedDate),
                current: datesAreEqual(cursor, this.today),
            });
            cursor.setUTCDate(cursor.getUTCDate() + 1);
        }
        return dates;
    }

    /**
     * Get dates in week that the dateCursor is in
     * @returns {Array} of 7 dates
     */
    getDatesInCurrentWeek() {
        // TODO
        let cursor = new Date(Date.UTC(this.dateCursor.getUTCFullYear(), this.dateCursor.getUTCMonth(), this.dateCursor.getUTCDate()));
        const offset = loopRange(cursor.getUTCDay() - this.options.weekStart, WEEKDAYS.length);
        cursor = moveDate(cursor, -offset, 'DAY');

        let dates = [];
        // populate grid
        for (let i = 0; i < 7; i++) {
            dates.push({
                label: cursor.getUTCDate(),
                date: cursor.toUTCString(),
                disabled: this.options.disabledDate ? this.options.disabledDate(cursor) : false,
                inactive: cursor.getUTCMonth() !== this.dateCursor.getUTCMonth(),
                selected: datesAreEqual(cursor, this.selectedDate),
                current: datesAreEqual(cursor, this.today),
            });
            cursor.setUTCDate(cursor.getUTCDate() + 1);
        }
        return dates;
    }

    /**
     * Get months in the year that the dateCursor is in
     * @returns {Array} of 12 months
     */
    getMonthsInCurrentYear() {
        const monthList = [];
        for (let [index, month] of MONTHS.entries()) {
            monthList.push({
                label: month,
                current: index === this.today.getUTCMonth() && this.dateCursor.getUTCFullYear() === this.today.getUTCFullYear(),
            });
        }
        return monthList;
    }

    getDateCursorMonthName() {
        return MONTHS[this.dateCursor.getUTCMonth()];
    }

    /**
     * Get years in the decade that the dateCursor is in
     * @returns {Array} of 10 years
     */
    getYearsInCurrentDecade() {
        const decade = getDecade(this.dateCursor);
        let yearGrid = [];
        for (const digit of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
            const year = decade + digit;
            yearGrid.push({
                label: year,
                current: this.today.getUTCFullYear() === year,
            });
        }
        return yearGrid;
    }

    /**
     * Try to move selectedDate in specific direction
     * @returns {void}
     */
    moveSelectedDate(direction) {
        let tempDate = new Date(Date.UTC(this.selectedDate.getUTCFullYear(), this.selectedDate.getUTCMonth(), this.selectedDate.getUTCDate()));
        switch (direction) {
            case 'up':
                tempDate = moveDate(tempDate, -7, 'DAY');
                break;
            case 'down':
                tempDate = moveDate(tempDate, 7, 'DAY');
                break;
            case 'left':
                tempDate = moveDate(tempDate, -1, 'DAY');
                break;
            case 'right':
                tempDate = moveDate(tempDate, 1, 'DAY');
                break;
            default:
                throw new Error(`Direction [${direction}] not accepted`);
        }

        if (this.options.disabledDate && this.options.disabledDate(tempDate)) {
            return;
        }

        this.setSelectedDate(tempDate);
    }

    /**
     * Set selected date
     * this automatically sets the dateCursor to the same value
     * @returns {void}
     */
    setSelectedDate(date) {
        if (!dateIsValid(date)) {
            this.selectedDate = null;
            return;
        }
        this.selectedDate = parseDate(date);
        this.dateCursor = new Date(
            Date.UTC(
                this.selectedDate.getUTCFullYear(),
                this.selectedDate.getUTCMonth(),
                this.selectedDate.getUTCDate()
            )
        );
    }

    /**
     * Set date of the dateCursor
     * @returns {void}
     */
    setDateCursorDate(date) {
        this.dateCursor.setUTCDate(date);
    }

    /**
     * Set month of the dateCursor
     * @returns {void}
     */
    setDateCursorMonth(month) {
        this.dateCursor.setUTCMonth(month);
    }

    /**
     * Set year of the dateCursor
     * @returns {void}
     */
    setDateCursorYear(year) {
        this.dateCursor.setYear(year);
    }
}
