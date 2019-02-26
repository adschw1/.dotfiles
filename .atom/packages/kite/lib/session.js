'use strict';

const {remote: {BrowserWindow}} = require('electron');

const {Emitter} = require('atom');

module.exports = class Session {
  constructor() {
    this.store = localStorage;
    this.emitter = new Emitter();
  }

  onDidOpenSession(listener) {
    return this.emitter.on('did-open-session', listener);
  }

  onDidReopenSession(listener) {
    return this.emitter.on('did-reopen-session', listener);
  }

  onDidCloseSession(listener) {
    return this.emitter.on('did-close-session', listener);
  }

  onDidCloseWindow(listener) {
    return this.emitter.on('did-close-window', listener);
  }

  open() {
    // We're comparing the number of windows (striped of 'Atom' duplicates and tests windows)
    // with the number of session we've stored so far, if it differs that means something
    // went wrong when quitting Atom. In that case we'll trigger the recover function
    // and consider this as a fresh new session
    const windowsCount = BrowserWindow.getAllWindows()
    .filter(w => !['Atom', 'Spec Suite'].includes(w.getTitle()))
    .length;
    let sessionCounter = parseInt(this.store.getItem('kite.sessionCounter') || '0', 10);

    if (windowsCount != sessionCounter + 1) {
      this.recover();
      sessionCounter = 0;
    }

    this.store.setItem('kite.sessionCounter', sessionCounter + 1);

    if (sessionCounter === 0) {
      this.emitter.emit('did-open-session');
    } else {
      this.emitter.emit('did-reopen-session');
    }
  }

  close() {
    if (this.store.getItem('kite.sessionCounter')) {
      const sessionCounter = parseInt(this.store.getItem('kite.sessionCounter'), 10);
      this.store.setItem('kite.sessionCounter', sessionCounter - 1);

      if (sessionCounter === 1) {
        this.purge();
        this.emitter.emit('did-close-session');
      } else {
        this.emitter.emit('did-close-window');
      }
    }
  }

  schedule() {

  }

  recover() {
    this.purge();
  }

  purge() {

  }
};
