"use strict";

const Store = require('electron-store');
const TOML = require('@iarna/toml');

const keyRecent = 'recent-opened';
const maxDocNum = 10;

const store = new Store({
  fileExtension: 'toml',
  serialize: TOML.stringify,
  deserialize: TOML.parse,
})

/**
 * @returns {Array}
 */
const getRecentDocuments = () => store.get(keyRecent, []);
exports.getRecentDocuments = getRecentDocuments;

const clearRecentDocuments = () => store.delete(keyRecent);
exports.clearRecentDocuments = clearRecentDocuments;

const addRecentDocuments = (doc) => {
  const recents = getRecentDocuments();

  if (recents.indexOf(doc) >= 0) {
    store.set(keyRecent, [
      doc,
      ...recents.filter(val => val !== doc),
    ]);
  } else {
    store.set(keyRecent, [
      doc,
      ...recents.slice(0, maxDocNum - 1),
    ]);
  }
}
exports.addRecentDocuments = addRecentDocuments;
