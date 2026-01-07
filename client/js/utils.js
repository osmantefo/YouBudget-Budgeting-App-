/**
 * Formats an integer value with commas for thousands separators.
 * @param {number} value - The integer value to format.
 * @returns {string} The formatted value as a string.
 */
export function formatInteger(value) {
    return value.toLocaleString('en-US');
}
