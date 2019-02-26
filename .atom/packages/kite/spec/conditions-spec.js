'use strict';

const MemoryStore = require('../lib/stores/memory');
const {all, any, fromSetting, once, oncePerWindow} = require('../lib/conditions');

const truthy = () => true;
const falsy = () => false;

describe('conditions', () => {
  describe('all()', () => {
    it('takes an array of conditions and returns true if all of them are true', () => {
      expect(all(truthy, truthy)()).toBeTruthy();
      expect(all(falsy, truthy)()).toBeFalsy();
      expect(all(truthy, falsy)()).toBeFalsy();
      expect(all(falsy, falsy)()).toBeFalsy();
    });
  });

  describe('any()', () => {
    it('takes an array of conditions and returns true if any of them are true', () => {
      expect(any(truthy, truthy)()).toBeTruthy();
      expect(any(falsy, truthy)()).toBeTruthy();
      expect(any(truthy, falsy)()).toBeTruthy();
      expect(all(falsy, falsy)()).toBeFalsy();
    });
  });

  describe('once()', () => {
    beforeEach(() => {
      once.store = new MemoryStore();
    });

    describe('when there nothing in storage', () => {
      it('returns true', () => {
        expect(once('kite.notifications.')({id: 'id'})).toBeTruthy();
      });
    });

    describe('when there is something in storage', () => {
      it('returns true', () => {
        once.store.setItem('kite.notifications.id', true);
        expect(once('kite.notifications.')({id: 'id'})).toBeFalsy();
      });
    });
  });

  describe('oncePerWindow()', () => {
    beforeEach(() => {
      oncePerWindow.store = new MemoryStore();
    });

    describe('when there nothing in storage', () => {
      it('returns true', () => {
        expect(oncePerWindow('kite.notifications.')({id: 'id'})).toBeTruthy();
      });
    });

    describe('when there is something in storage', () => {
      it('returns true', () => {
        oncePerWindow.store.setItem('kite.notifications.id', true);
        expect(oncePerWindow('kite.notifications.')({id: 'id'})).toBeFalsy();
      });
    });
  });

  describe('fromSetting()', () => {
    afterEach(() => {
      atom.config.unset('kite.testSetting');
    });

    it('returns the value of the corresponding setting', () => {
      atom.config.set('kite.testSetting', true);
      expect(fromSetting('kite.testSetting')()).toBeTruthy();

      atom.config.set('kite.testSetting', false);
      expect(fromSetting('kite.testSetting')()).toBeFalsy();

      atom.config.unset('kite.testSetting');
      expect(fromSetting('kite.testSetting')()).toBeFalsy();
    });
    describe('with a value', () => {
      it('returns the value of the corresponding setting', () => {
        atom.config.set('kite.testSetting', 'value');
        expect(fromSetting('kite.testSetting', 'value')()).toBeTruthy();
        expect(fromSetting('kite.testSetting', 'other value')()).toBeFalsy();

        atom.config.unset('kite.testSetting');
        expect(fromSetting('kite.testSetting')()).toBeFalsy();
      });
    });
  });

  // For now we'll rely on window rather than sessions
  xdescribe('oncePerSession()', () => {

  });
});
