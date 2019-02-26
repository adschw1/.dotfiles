'use strict';

const {Range} = require('atom');

module.exports = (action) => {
  beforeEach(() => {
    const editor = atom.workspace.getActiveTextEditor();
    const start = editor.buffer.positionForCharacterIndex(action.properties.to_offset);
    const end = editor.buffer.positionForCharacterIndex(action.properties.from_offset);
    const range = new Range(start, end);
    editor.buffer.delete(range);
    editor.setCursorBufferPosition(start);
    const view = atom.views.getView(editor);
    const event = new CustomEvent('autocomplete-plus:activate', {bubbles: true, cancelable: true});
    view.dispatchEvent(event);
  });
};
