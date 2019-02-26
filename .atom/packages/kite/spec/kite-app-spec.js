'use strict';

const KiteAPI = require('kite-api');
const {withKite} = require('kite-api/test/helpers/kite');

const KiteApp = require('../lib/kite-app');

describe('KiteApp', () => {
  let changeSpy, readySpy, app;

  beforeEach(() => {
    app = new KiteApp();
  });

  describe('.connect()', () => {
    beforeEach(() => {
      changeSpy = jasmine.createSpy();
      readySpy = jasmine.createSpy();

      app.onDidChangeState(changeSpy);
      app.onKiteReady(readySpy);
    });

    withKite({installed: false}, () => {
      it('returns a promise that is resolved with UNINSTALLED state', () => {
        waitsForPromise(() => app.connect().then(state => {
          expect(state).toEqual(KiteAPI.STATES.UNINSTALLED);
          expect(changeSpy)
          .toHaveBeenCalledWith(KiteAPI.STATES.UNINSTALLED);

          expect(readySpy).not.toHaveBeenCalled();
        }));
      });
    });

    withKite({running: false}, () => {
      it('returns a promise that is resolved with INSTALLED state', () => {
        waitsForPromise(() => app.connect().then(state => {
          expect(state).toEqual(KiteAPI.STATES.INSTALLED);
          expect(changeSpy)
          .toHaveBeenCalledWith(KiteAPI.STATES.INSTALLED);

          expect(readySpy).not.toHaveBeenCalled();
        }));
      });
    });

    withKite({reachable: false}, () => {
      it('returns a promise that is resolved with RUNNING state', () => {
        waitsForPromise(() => app.connect().then(state => {
          expect(state).toEqual(KiteAPI.STATES.RUNNING);
          expect(changeSpy)
          .toHaveBeenCalledWith(KiteAPI.STATES.RUNNING);

          expect(readySpy).not.toHaveBeenCalled();
        }));
      });
    });

    withKite({reachable: true}, () => {
      it('returns a promise that is resolved with READY state', () => {
        waitsForPromise(() => app.connect().then(state => {
          expect(state).toEqual(KiteAPI.STATES.READY);
          expect(changeSpy)
          .toHaveBeenCalledWith(KiteAPI.STATES.READY);

          expect(readySpy).toHaveBeenCalled();
        }));
      });

      it('nevers trigger the kite ready event twice', () => {
        waitsForPromise(() => app.connect());
        waitsForPromise(() => app.connect());
        waitsForPromise(() => app.connect());
        runs(() => {
          expect(readySpy.callCount).toEqual(1);
        });
      });
    });
  });

  describe('.install()', () => {
    beforeEach(() => {
      spyOn(KiteAPI, 'downloadKiteRelease').andCallFake(() => Promise.resolve());
    });

    it('calls the KiteAPI.downloadKiteRelease method', () => {
      app.install();

      expect(KiteAPI.downloadKiteRelease).toHaveBeenCalled();
    });
  });

  describe('.start()', () => {
    beforeEach(() => {
      spyOn(KiteAPI, 'runKiteAndWait').andCallFake(() => Promise.resolve());
    });

    it('calls the KiteAPI.runKiteAndWait method', () => {
      app.start();

      expect(KiteAPI.runKiteAndWait).toHaveBeenCalledWith(30, 2500);
    });
  });

  describe('.login()', () => {
    it('opens the kite copilot', () => {
      spyOn(atom.applicationDelegate, 'openExternal');

      app.login();

      expect(atom.applicationDelegate.openExternal)
      .toHaveBeenCalledWith('kite://home');
    });
  });
});
