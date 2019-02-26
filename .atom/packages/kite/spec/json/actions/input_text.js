'use strict';

module.exports = (action) => {
  beforeEach(() => {
    const editor = atom.workspace.getActiveTextEditor();
    if (action.properties.text) {
      if (action.properties.text.length > 1) {
        editor.insertText(action.properties.text.slice(0, -1));
        editor.insertText(action.properties.text.slice(-1));
      } else {
        editor.insertText(action.properties.text);
      }
    }
  });
};
