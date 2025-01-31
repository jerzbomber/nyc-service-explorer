/**
 * Converts a string to capital case.
 * @param {string} str - The string to convert.
 * @returns {string} The converted string.
 */
const toCapitalCase = (str: string): string =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default toCapitalCase;
