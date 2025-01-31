/**
 * Removes all spaces from a string and capitalizes the first letter of each word.
 * @param {string} input - The string to be transformed.
 * @returns {string} - The transformed string.
 */
const removeSpacesAndCapitalize = (input: string): string => {
  return input
    .replace(/\s+/g, "")
    .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
};

export default removeSpacesAndCapitalize;
