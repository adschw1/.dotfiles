'use strict';

module.exports = class MemoryStore {
  constructor() {
    this.content = {};
  }
  setItem(key, content) {
    this.content[key] = String(content);
    return content;
  }
  getItem(key) {
    return this.content[key];
  }
  removeItem(key) {
    delete this.content[key];
  }
};
