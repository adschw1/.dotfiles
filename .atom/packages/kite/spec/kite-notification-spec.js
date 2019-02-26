'use strict';

let notificationsPkg, notification, notificationElement,
  kiteNotification, dismissSpy, clickSpy, condSpy, promise;
const KiteNotification = require('../lib/kite-notification');
const {click} = require('./helpers/events');

const findNotification = () => {
  const allNotifications = atom.notifications.getNotifications();
  notification = allNotifications[allNotifications.length - 1];
  notificationElement = atom.views.getView(notification);
  return notificationElement;
};

describe('KiteNotification', () => {
  beforeEach(() => {
    waitsForPromise(() =>
      atom.packages.activatePackage('notifications').then(pkg => {
        notificationsPkg = pkg.mainModule;
      }));
    runs(() => {
      spyOn(atom.notifications, 'addNotification').andCallThrough();
      dismissSpy = jasmine.createSpy();
      clickSpy = jasmine.createSpy().andCallFake(dismiss => dismiss());
      condSpy = jasmine.createSpy().andReturn(true);
    });
  });

  afterEach(() => {
    notificationsPkg.lastNotification = null;
    atom.notifications.clear();
    notification && notification.dismiss();
    notificationElement = null;
    notification = null;
  });

  it('has an id, generated from the title if not provided', () => {
    const n1 = new KiteNotification('info', 'notification with id', {}, {id: 'some-id'});
    const n2 = new KiteNotification('info', 'notification with no id');

    expect(n1.id).toEqual('some-id');
    expect(n2.id).toEqual('notification-with-no-id');
  });

  describe('.execute()', () => {
    describe('with a notification condition', () => {
      beforeEach(() => {
        kiteNotification = new KiteNotification('info', 'title', {
          buttons: [{
            text: 'text',
            onDidClick: clickSpy,
          }],
        }, {
          condition: condSpy,
          onDidDismiss: dismissSpy,
        });
        promise = kiteNotification.execute();
        waitsFor('notification displayed', () => atom.notifications.addNotification.callCount > 0);
      });

      it('evalutates the condition ', () => {
        expect(condSpy).toHaveBeenCalled();
      });

      it('displays the notification using atom API', () => {
        expect(atom.notifications.addNotification).toHaveBeenCalled();
      });

      describe('when the notification is dismissed', () => {
        describe('without picking an action', () => {
          it('resolves the promise', () => {
            kiteNotification.dismiss();

            expect(dismissSpy).toHaveBeenCalledWith(undefined);

            waitsForPromise('notification promise', () => promise);
          });
        });

        describe('by picking an action', () => {
          it('resolves the promise with the picked button', () => {
            waitsFor('notification', () => findNotification());
            runs(() => {
              click(notificationElement.element.querySelector('a.btn'));

              expect(clickSpy).toHaveBeenCalled();
              expect(dismissSpy).toHaveBeenCalledWith('text');

              waitsForPromise('notification promise', () => promise);
            });
          });
        });
      });
    });
  });
});
