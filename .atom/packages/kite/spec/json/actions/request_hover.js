'use strict';

const Kite = require('../../../lib/kite');

module.exports = (action) => {
  beforeEach(() => {
    const editor = atom.workspace.getActiveTextEditor();
    const kiteEditor = Kite.getModule('editors').kiteEditorForEditor(editor);

    if (kiteEditor) {
      kiteEditor.hoverGesture.emitter.emit('did-activate', {position: editor.getCursorBufferPosition()});
    }
  });
};
