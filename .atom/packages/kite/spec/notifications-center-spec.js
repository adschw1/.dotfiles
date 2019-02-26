'use strict';

const os = require('os');
const {withKite} = require('kite-api/test/helpers/kite');

const NotificationsCenter = require('../lib/notifications-center');
const KiteApp = require('../lib/kite-app');
const KiteEditors = require('../lib/editors');

const getNotificationElement = () => {
  const allNotifications = atom.notifications.getNotifications();
  return atom.views.getView(allNotifications[allNotifications.length - 1]);
};

describe('NotificationsCenter', () => {
  let app, notifications, notificationsPkg, workspaceElement, notificationElement, notification, editor;

  beforeEach(() => {
    app = new KiteApp();
    const editors = new KiteEditors();
    app.kite = {
      getModule(mod) {
        if (mod === 'editors') {
          return editors;
        }
      },
    };
    notifications = new NotificationsCenter(app);

    workspaceElement = atom.views.getView(atom.workspace);
    localStorage.setItem('kite.wasInstalled', false);

    waitsForPromise(() =>
      atom.packages.activatePackage('notifications').then(pkg => {
        notificationsPkg = pkg.mainModule;
        notificationsPkg.initializeIfNotInitialized();
      }));
  });

  afterEach(() => {
    notificationsPkg.lastNotification = null;
    atom.notifications.clear();
    notification && notification.dismiss();
    notificationElement = null;
    notification = null;
  });

  describe('when there is a python file open', () => {
    beforeEach(() => {
      waitsForPromise(() =>
        atom.packages.activatePackage('language-python'));
      waitsForPromise(() => atom.workspace.open('sample.py').then(e => {
        editor = e;
        // const kiteEditor =
      }));
    });

    describe('and no notifications have been displayed before', () => {
      withKite({supported: false}, () => {
        beforeEach(() => {
          spyOn(os, 'platform').andReturn('wtfOS');

          waitsForPromise(() => app.connect());
        });
        it('notifies the user', () => {
          notificationElement = getNotificationElement();
          notification = notificationElement.getModel();
          const options = notification.getOptions();

          expect(notificationElement).not.toBeNull();

          expect(notification.getType()).toEqual('error');
          expect(notification.getMessage())
          .toEqual("Kite doesn't support your OS");

          expect(options.buttons).toBeUndefined();
          expect(options.dismissable).toBeTruthy();
          expect(options.description)
          .toEqual('Sorry, the Kite engine only supports macOS and Windows at the moment.');
        });

        describe('when the same state is found after a new check', () => {
          it('does not notify the user', () => {
            atom.notifications.getNotifications()[0].dismiss();
            waitsForPromise(() => app.connect().then(() => {
              expect(atom.notifications.getNotifications().length).toEqual(1);
            }));
          });
        });
      });

      withKite({installed: false}, () => {
        describe('and was never installed before', () => {
          beforeEach(() => {
            waitsForPromise(() => app.connect().then(() => {
              notificationElement = getNotificationElement();
            }));
          });

          it('does not notify the user', () => {
            waitsForPromise(() => app.connect().then(() => {
              expect(workspaceElement.querySelector('atom-notification')).not.toExist();
            }));
          });
        });

        describe('but was installed before', () => {
          beforeEach(() => {
            localStorage.setItem('kite.wasInstalled', true);
          });

          it('does not notify the user', () => {
            waitsForPromise(() => app.connect().then(() => {
              expect(workspaceElement.querySelector('atom-notification')).not.toExist();
            }));
          });
        });
      });

      withKite({reachable: false}, () => {
        beforeEach(() => {
          waitsForPromise(() => app.connect('pollingInterval')
          .then(() => app.connect('pollingInterval'))
          .then(() => {
            notificationElement = getNotificationElement();
            notification = notificationElement.getModel();
          }));
        });

        it('notifies the user', () => {
          const options = notification.getOptions();

          expect(notificationElement).not.toBeNull();

          expect(notification.getType()).toEqual('error');
          expect(notification.getMessage())
          .toEqual('The Kite background service is running but not reachable');

          expect(options.buttons).toBeUndefined();
          expect(options.dismissable).toBeTruthy();
          expect(options.description)
          .toEqual('Try killing Kite from the Activity Monitor.');
        });

        describe('when the same state is found after a new check', () => {
          it('does not notify the user', () => {
            atom.notifications.getNotifications()[0].dismiss();
            waitsForPromise(() => app.connect().then(() => {
              expect(atom.notifications.getNotifications().length).toEqual(1);
            }));
          });
        });
      });
    });
  });

  describe('when there is no python file open', () => {
    beforeEach(() => {
      waitsForPromise(() => atom.workspace.open('variable.json'));
    });

    withKite({installed: false}, () => {
      it('does not notify the user', () => {
        waitsForPromise(() => app.connect().then(() => {
          expect(workspaceElement.querySelector('atom-notification')).not.toExist();
        }));
      });
    });

    withKite({reachable: false}, () => {
      it('does not notify the user', () => {
        waitsForPromise(() => app.connect().then(() => {
          expect(workspaceElement.querySelector('atom-notification')).not.toExist();
        }));
      });
    });

    withKite({reachable: true}, () => {
      it('does not notify the user', () => {
        waitsForPromise(() => app.connect().then(() => {
          expect(workspaceElement.querySelector('atom-notification')).not.toExist();
        }));
      });
    });
  });
});
