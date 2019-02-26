'use strict';

const path = require('path');
const KiteAPI = require('kite-api');
const {withKite, withKiteRoutes} = require('kite-api/test/helpers/kite');
const {fakeResponse} = require('kite-api/test/helpers/http');
const KiteEditors = require('../lib/editors');
const {languagesPath} = require('../lib/urls');
const {sleep} = require('./spec-helpers');

describe('editors module', () => {
  let module, editor, unsupportedEditor;

  beforeEach(() => {
    module = new KiteEditors();

    spyOn(KiteAPI, 'request').andCallThrough();
  });

  withKite({logged: true}, () => {
    withKiteRoutes([
      [
        o => o.path === languagesPath(),
        o => fakeResponse(200, '["python"]'),
      ],
    ]);
    beforeEach(() => {
      waitsForPromise(() => atom.packages.activatePackage('kite'));
    });

    describe('on initialize', () => {
      it('makes a request to get the supported languages', () => {
        waitsForPromise(() => module.init());

        runs(() => {
          expect(KiteAPI.request).toHaveBeenCalledWith({path: languagesPath()});
          expect(module.getSupportedLanguages()).toEqual(['python']);
        });
      });
      describe('with no editors open', () => {
        beforeEach(() => {
          waitsForPromise(() => module.init());
        });

        it('registers to new editors event and create kite editors for supported files', () => {
          waitsForPromise(() => atom.workspace.open('sample.py').then(e => {
            editor = e;
          }));

          runs(() => {
            expect(module.kiteEditorForEditor(editor)).not.toBeUndefined();
          });

          waitsForPromise(() => atom.workspace.open('hello.json').then(e => {
            unsupportedEditor = e;
          }));

          runs(() => {
            expect(module.kiteEditorForEditor(unsupportedEditor)).toBeUndefined();
          });
        });
      });

      describe('with editors open', () => {
        beforeEach(() => {
          waitsForPromise(() => atom.workspace.open('sample.py').then(e => { editor = e; }));
          waitsForPromise(() => atom.workspace.open('hello.json').then(e => { unsupportedEditor = e; }));
          waitsForPromise(() => module.init());
        });

        it('creates kite editors for supported files', () => {
          expect(module.kiteEditorForEditor(editor)).not.toBeUndefined();
          expect(module.kiteEditorForEditor(unsupportedEditor)).toBeUndefined();
        });
      });

      describe('with supported editors', () => {
        beforeEach(() => {
          waitsForPromise(() => atom.workspace.open('sample.py').then(e => { editor = e; }));
          waitsForPromise(() => module.init());
        });

        it('sends a focus event for an active supported file', () => {
          advanceClock(10);
          sleep(50);
          runs(() => {
            const buffer = editor.getBuffer();
            const cursorOffset = buffer.characterIndexForPosition(editor.getCursorBufferPosition());

            expect(KiteAPI.request).toHaveBeenCalledWith({
              path: '/clientapi/editor/event',
              method: 'POST',
            }, JSON.stringify({
              source: 'atom',
              action: 'focus',
              filename: editor.getPath(),
              text: editor.getText(),
              selections: [{
                start: cursorOffset,
                end: cursorOffset,
              }],
            }));
          });
        });

        describe('when the editor is destroyed', () => {
          beforeEach(() => {
            editor.destroy();
          });

          it('unsubscribe from the editor events', () => {
            expect(module.kiteEditorForEditor(editor)).toBeUndefined();
          });
        });
      });

      describe('opening a file without path', () => {
        beforeEach(() => {
          waitsForPromise(() => module.init());
          waitsForPromise(() => atom.workspace.open());
        });

        describe('when the file is saved', () => {
          let editor;
          describe('as a supported file', () => {
            beforeEach(() => {
              editor = atom.workspace.getActiveTextEditor();
              spyOn(editor, 'getPath')
              .andReturn(path.join(__dirname, 'file.py'));
              editor.emitter.emit('did-change-path', editor.getPath());
              advanceClock(200);
              sleep(100);
              runs(() => {
                advanceClock(200);
              });
            });

            it('subscribes to the editor events', () => {
              expect(module.hasEditorSubscription(editor)).toBeTruthy();
            });

            describe('changing it again to an unsupported file type', () => {
              beforeEach(() => {
                editor = atom.workspace.getActiveTextEditor();
                editor.getPath.andReturn(path.join(__dirname, 'file.json'));
                editor.emitter.emit('did-change-path', editor.getPath());
                advanceClock(200);
                sleep(100);
                runs(() => {
                  advanceClock(200);
                });
              });

              it('unsubscribes from the editor events', () => {
                expect(module.hasEditorSubscription(editor)).toBeFalsy();
              });
            });
          });

          describe('as an unsupported file', () => {
            beforeEach(() => {
              editor = atom.workspace.getActiveTextEditor();
              spyOn(editor, 'getPath')
              .andReturn(path.join(__dirname, 'file.json'));
              editor.emitter.emit('did-change-path', editor.getPath());
            });

            it('does not subscribe to the editor events', () => {
              expect(module.hasEditorSubscription(editor)).toBeFalsy();
            });
          });
        });
      });
    });

    describe('.hasSupportedFileOpen()', () => {
      beforeEach(() => {
        waitsForPromise(() => module.init());
      });

      describe('when a suported file is open', () => {
        it('returns true', () => {
          expect(module.hasSupportedFileOpen()).toBeFalsy();
          waitsForPromise(() => atom.workspace.open('sample.py').then(e => { editor = e; }));
          runs(() => {
            expect(module.hasSupportedFileOpen()).toBeTruthy();
          });
        });
      });
    });

    describe('.hasActiveSupportedFile()', () => {
      beforeEach(() => {
        waitsForPromise(() => module.init());
      });

      describe('when a suported file is open', () => {
        it('returns true', () => {
          expect(module.hasActiveSupportedFile()).toBeFalsy();
          waitsForPromise(() => atom.workspace.open('sample.py').then(e => { editor = e; }));
          runs(() => {
            expect(module.hasActiveSupportedFile()).toBeTruthy();
          });
          waitsForPromise(() => atom.workspace.open('hello.json').then(e => { editor = e; }));
          runs(() => {
            expect(module.hasActiveSupportedFile()).toBeFalsy();
          });
        });
      });
    });


    describe('on dispose', () => {
      beforeEach(() => {
        waitsForPromise(() => atom.workspace.open('sample.py').then(e => { editor = e; }));
        waitsForPromise(() => atom.workspace.open('hello.json').then(e => { unsupportedEditor = e; }));
        waitsForPromise(() => module.init());
      });

      it('unsubscribes from all registered editors', () => {
        module.dispose();

        expect(module.kiteEditorForEditor(editor)).toBeUndefined();
        expect(module.kiteEditorForEditor(unsupportedEditor)).toBeUndefined();
      });
    });
  });
});
