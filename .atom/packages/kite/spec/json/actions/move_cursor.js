'use strict';

module.exports = (action) => {
  beforeEach(() => {
    const editor = atom.workspace.getActiveTextEditor();
    if (action.properties.offset) {
      const pos = editor.getBuffer().positionForCharacterIndex(action.properties.offset);
      editor.setCursorBufferPosition(pos);
    }
  });
};
