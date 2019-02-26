'use strict';

const MemoryStore = require('./stores/memory');

const all = (...fs) => a => fs.every(f => f(a));
const any = (...fs) => a => fs.some(f => f(a));

const fromSetting = (key, value) => a =>
  value
    ? atom.config.get(key) === value
    : atom.config.get(key);

const once = (s) => a => !once.store.getItem(`${s || ''}${a.id}`);
const oncePerWindow = (s) => a => !oncePerWindow.store.getItem(`${s || ''}${a.id}`);

once.store = localStorage;
oncePerWindow.store = new MemoryStore();

module.exports = {
  all,
  any,
  fromSetting,
  once,
  oncePerWindow,
};
