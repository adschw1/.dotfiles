'use strict';

const {remote: {BrowserWindow}} = require('electron');
const Session = require('../lib/session');
const MemoryStore = require('../lib/stores/memory');

const getWindow = () => ({getTitle() { return 'title'; }});

describe('Session', () => {
  let windows, session;
  beforeEach(() => {
    windows = [];
    session = new Session();
    session.store = new MemoryStore();
    spyOn(BrowserWindow, 'getAllWindows').andCallFake(() => windows);
  });

  describe('.open()', () => {
    describe('with no other previously opened', () => {
      it('emits a did-open-session event', () => {
        const spy = jasmine.createSpy();
        session.onDidOpenSession(spy);

        windows.push(getWindow());
        session.open();

        expect(spy).toHaveBeenCalled();
      });
    });

    describe('with a previously opened session', () => {
      it('emits a did-reopen-session event', () => {
        const session1 = new Session();
        session1.store = session.store;

        windows.push(getWindow());
        session1.open();

        const spy = jasmine.createSpy();
        session.onDidReopenSession(spy);

        windows.push(getWindow());
        session.open();

        expect(spy).toHaveBeenCalled();
      });

      it('increases the stored count by one', () => {
        windows.push(getWindow());
        session.open();
        expect(session.store.getItem('kite.sessionCounter')).toEqual('1');
      });
    });

    describe('when the windows count does not match the stored value', () => {
      it('emits a did-open-session event and invoke session recovery', () => {
        const session1 = new Session();
        session1.store = session.store;
        session1.open();

        spyOn(session, 'recover');

        const spy = jasmine.createSpy();
        session.onDidOpenSession(spy);

        windows.push(getWindow());
        session.open();

        expect(spy).toHaveBeenCalled();
        expect(session.recover).toHaveBeenCalled();
      });
    });
  });

  describe('.close()', () => {
    describe('when the session is the last one', () => {
      beforeEach(() => {
        windows.push(getWindow());
        session.open();
      });
      it('reduces the stored count by one', () => {
        session.close();
        expect(session.store.getItem('kite.sessionCounter')).toEqual('0');
      });

      it('emits a did-close-session', () => {
        const spy = jasmine.createSpy();
        session.onDidCloseSession(spy);
        session.close();

        expect(spy).toHaveBeenCalled();
      });
    });

    describe('when the session is not the last one', () => {
      beforeEach(() => {
        const session1 = new Session();
        session1.store = session.store;

        windows.push(getWindow());
        session1.open();

        windows.push(getWindow());
        session.open();
      });
      it('reduces the stored count by one', () => {
        session.close();
        expect(session.store.getItem('kite.sessionCounter')).toEqual('1');
      });

      it('emits a did-close-window', () => {
        const spy = jasmine.createSpy();
        session.onDidCloseWindow(spy);
        session.close();

        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('.schedule()', () => {});

  describe('.purge()', () => {});
});
