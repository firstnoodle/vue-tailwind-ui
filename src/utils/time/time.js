export const TIME_IN_MILLISECONDS = {
    MILLISECOND: 1,
    SECOND: 1000,
    MINUTE: 60000,
    HOUR: 3600000,
    DAY: 86400000,
    WEEK: 604800000,
};

export const unitIsValid = unit => {
    return Object.keys(TIME_IN_MILLISECONDS).indexOf(unit) !== -1;
}

class TIME {

    UNITS = {
        MILLISECOND: "MILLISECOND",
        SECOND: "SECOND",
        MINUTE: "MINUTE",
        HOUR: "HOUR",
        DAY: "DAY",
        WEEK: "WEEK",
        MONTH: "MONTH",
        YEAR: "YEAR",
    };

    UNIT_ACRONYMS = {
        MS: this.UNITS.MILLISECOND,
        S: this.UNITS.SECOND,
        M: this.UNITS.MINUTE,
        H: this.UNITS.HOUR,
        D: this.UNITS.DAY,
        W: this.UNITS.WEEK
    };

    VALUES_IN_MILLISECONDS = {
        [this.UNITS.MILLISECOND]: 1,
        [this.UNITS.SECOND]: 1000,
        [this.UNITS.MINUTE]: 60000,
        [this.UNITS.HOUR]: 3600000,
        [this.UNITS.DAY]: 86400000,
        [this.UNITS.WEEK]: 604800000
    };

    convert(value, from, to) {
        const _from = this.validateUnit(from);
        const _to = this.validateUnit(to);

        if (!_from) console.error(`[TIME.convert] "from" value [${from}] not accepted`);
        if (!_to) console.error(`[TIME.convert] "to" value [${to}] not accepted`);
        if (!_from || !_to) return null;

        const fromMilliseconds = this._convertToMilliseconds(value, _from);
        return fromMilliseconds / this[_to];
    }

    _convertToMilliseconds(value, unit) {
        return value * this[unit];
    }

    validateUnit(unit) {
        let _unit;

        unit = unit.toUpperCase();
        unit = unit in this.UNIT_ACRONYMS ? this.UNIT_ACRONYMS[unit] : unit;

        // Check if unit is in plural and convert to singular
        if (unit[unit.length - 1] === "S") {
            _unit = unit.slice(0, unit.length - 1);
        } else {
            _unit = unit;
        }
        return _unit in this.UNITS ? _unit : null;
    }
}

export default new TIME();
