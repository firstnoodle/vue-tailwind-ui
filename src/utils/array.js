/**
 * Modulo function that works with negative numbers as well
 * So fx passing -3 to a 0-9 range (length=10) would yield 7
 * @param {Integer} index
 * @param {Integer} length
 * @returns {Integer}
 */
export const loopRange = (index, length) => ((index % length) + length) % length;