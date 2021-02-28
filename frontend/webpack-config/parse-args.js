const availableEntries = ['public'];

/**
 *
 * @param {any} entryString - Entry string
 * @returns {string[]} parsed array of entries
 */
function parseEntries(entryString) {
  if (Array.isArray(entryString)) {
    if (!entryString.length) return availableEntries;
    entryString.forEach(s => {
      if (!availableEntries.includes(s)) throw new TypeError(`Unknown entry - ${s}`);
    });
    return [...new Set(entryString)];
  }
  if (typeof entryString == 'string') {
    return parseEntries(entryString.split(','));
  }
  return availableEntries;
}

module.exports = { parseEntries };
