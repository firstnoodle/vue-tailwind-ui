/**
 * Different value types with specified formats and regex
 */
export const DATE = {
    format: "xxxx-xx-xx",
    regex: /^\d{0,4}-?$|^\d{0,4}-[01]$|^\d{0,4}-(0[1-9]|1[0-2])-?$|^\d{0,4}-(0[1-9]|1[0-2])-[0-3]$|^\d{0,4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])$/
};
  
// TODO: regex seems to not work
export const TIME = {
    format: "xx:xx",
    regex: /^(?:[012]|[01][0-9]|2[0-3])(?::(?:[0-5]|[0-5][0-9])?)?$/
};
  
export const DATE_TIME = {
    format: "xxxx-xx-xx xx:xx",
    regex: /^\d{0,4}-?$|^\d{0,4}-[01]$|^\d{0,4}-(0[1-9]|1[0-2])-?$|^\d{0,4}-(0[1-9]|1[0-2])-[0-3]$|^\d{0,4}-(0[1-9]|1[0-2])-([1-2][0-9]|0[1-9]|3[01]) ?$|^\d{0,4}-(0[1-9]|1[0-2])-([1-2][0-9]|0[1-9]|3[01]) [0-2]$|^\d{0,4}-(0[1-9]|1[0-2])-([1-2][0-9]|0[1-9]|3[01]) ([01][0-9]|2[0-3]):?$|^\d{0,4}-(0[1-9]|1[0-2])-([1-2][0-9]|0[1-9]|3[01]) ([01][0-9]|2[0-3]):[0-5][0-9]?$/
};
  
/**
 * Remove separators from string, based on a format
 * fx "2020-01-01 12:00" would return "202001011200"
 * @param {String} string
 * @param {String} type.format (destructured)
 */
const stripStringFromSeparators = (string, { format }) => {
    // fx "xxxx-xx-xx"
    let result = "";
    for (var i = 0; i < format.length; i++) {
        if (i < string.length && format[i] === "x") {
            result += string[i];
        }
    }
    return result;
};

/**
 * Apply a format to a string
 * fx "202001011200" formatted with "xxxx-xx-xx xx:xx" would return "2020-01-01 12:00"
 * @param {String} string
 * @param {String} type.format (destructured)
 */
export const formatString = (string, { format }) => {
    let result = "";
    let separatorsUsed = 0;

    for (let i = 0; i < format.length; i++) {
        const index = i - separatorsUsed;
        if (format[i] === "x") {
            if (index < string.length) {
                result += string[index];
            } else {
                break;
            }
        } else {
            result += format[i];
            separatorsUsed++;
        }
    }
    return result;
};

/**
 * Check if keyboard input value is allowed by type.format
 * @param {String} currentValue
 * @param {Object} type
 * @param {String} key
 */
export const processInputValue = (currentValue, type, {key, keyCode}) => {
    // keyCode !== 32 is a bit of a hack:
    // when space is pressed, "key" is evaluated to true in the if statement below... which we don't want
    if (key >= 0 && key <= 9 && keyCode !== 32) { 
        if (!type.regex.test(currentValue)) {
            return "";
        }
        const strippedValue = stripStringFromSeparators(currentValue, type);
        const newValue = strippedValue + key;
        const newFormattedValue = formatString(newValue, type);

        return type.regex.test(newFormattedValue)
            ? newFormattedValue
            : currentValue;

    } else if (type.format[currentValue.length] === key) {
        return `${currentValue}${key}`;
    }
    return currentValue;
};

/**
 *
 * @param {String} value
 * @param {Object} type
 */
export const inputValid = (value, type) => {
    if(type.regex === undefined) return false;
    return type.regex.test(value)
};
