// https://adamwathan.me/renderless-components-in-vuejs/
import Vue from 'vue';
import { Calendar } from "~/utils/time/calendar.js";
import TIME from "~/utils/time/time.js";

const DATE = 'DATE';
const WEEK = 'WEEK';
const MONTH = 'MONTH';
const YEAR = 'YEAR';
const DECADE = 'DECADE';

const VIEW_TYPES = { DATE, WEEK, MONTH, YEAR, DECADE };

export default Vue.component('renderless-calendar', {

    props: {
        value: {
            type: [String, Date],
            required: false,
        },
        options: {
            type: Object,
            required: false
        }
    },

    data() {
        return {
            calendar: null,
            now: new Date(),
            viewData: [],
            viewType: VIEW_TYPES.MONTH,
        }
    },

    created() {
        this.calendar = new Calendar(this.options, this.value);
        this.$emit('change', this.calendar.selectedDate);
        this.changeView(this.viewType);
    },

    watch: {
        value() {
            this.calendar.setSelectedDate(this.value);
            this.updateView();
        }
    },

    methods: {
        /**
         * Change to a specific view, which updates the viewData as well
         * @param {String} type
         * @returns {void}
         */
        changeView(type) {
            // validate type
            if (Object.keys(VIEW_TYPES).indexOf(type) === -1) {
                console.warn(`[changeView] wrong view type: ${type}`);
                return;
            }

            this.viewType = type;

            switch (type) {
                case DATE:
                    // TODO
                    break;
                case WEEK:
                    this.viewData = this.calendar.getDatesInCurrentWeek();
                    break;
                case MONTH:
                    this.viewData = this.calendar.getDatesInCurrentMonth();
                    break;
                case YEAR:
                    this.viewData = this.calendar.getMonthsInCurrentYear();
                    break;
                case DECADE:
                    this.viewData = this.calendar.getYearsInCurrentDecade();
                    break;
            }
        },

        /**
         * Request to move selectedDate a certain
         * @param {String} direction 
         */
        moveRequest(direction) {
            // TODO: create eventListener for calendar
            this.calendar.moveSelectedDate(direction);

            // change back to DateView (if on month or year)
            if (this.viewType !== MONTH) {
                this.changeView(VIEW_TYPES.DATE);
            } else {
                this.updateView();
            }
        },

        /**
         * Move viewDate (or parts of viewDate: date, month, year) by specified amount
         * @param {Number} value
         * @param {String} unit
         * @returns {void}
         */
        moveViewDate(value, unit) {
            const validatedUnit = TIME.validateUnit(unit);

            switch (validatedUnit) {
                case TIME.UNITS.DAY:
                    this.calendar.addDaysToDateCursor(value);
                    break;
                case TIME.UNITS.WEEK:
                    this.calendar.addWeeksToDateCursor(value);
                    break;
                case TIME.UNITS.MONTH:
                    this.calendar.addMonthsToDateCursor(value);
                    break;
                case TIME.UNITS.YEAR:
                    this.calendar.addYearsToDateCursor(value);
                    break;
                default:
                    throw new Error(`[moveViewDate] unknown unit: ${unit}`);
            }

            this.updateView();
        },

        /**
         * Set viewDate (or parts of viewDate: date, month, year) to specific value
         * @param {Number} value
         * @param {String} unit
         * @returns {void}
         */
        setViewDate(value, unit) {
            const validatedUnit = TIME.validateUnit(unit);

            switch (validatedUnit) {
                case TIME.UNITS.DAY:
                    this.calendar.setDateCursorDate(value);
                    break;
                case TIME.UNITS.MONTH:
                    this.calendar.setDateCursorMonth(value);
                    break;
                case TIME.UNITS.YEAR:
                    this.calendar.setDateCursorYear(value);
                    break;
                default:
                    console.error(`[setViewDate] unknown unit: ${unit}`);
                    return;
            }

            this.updateView();
        },

        /**
         * Set viewDate and change view afterwards
         * @param {Number} value
         * @param {String} unit
         * @param {String} view
         * @returns {void}
         */
        setViewDateAndChangeView(value, unit, view) {
            this.setViewDate(value, unit);
            this.changeView(view);
        },

        /**
         * Convenience method to update data for current view
         * @returns {void}
         */
        updateView() {
            this.changeView(this.viewType);
        }
    },

    render() {
        return this.$scopedSlots[this.viewType]({
            calendar: this.calendar,
            selectedDate: this.value,
            viewData: this.viewData,
            viewType: this.viewType,
            viewMonth: this.calendar.getDateCursorMonthName(),
            changeView: this.changeView,
            moveRequest: this.moveRequest,
            moveViewDate: this.moveViewDate,
            setViewDate: this.setViewDate,
            setViewDateAndChangeView: this.setViewDateAndChangeView,
        })
    },
})