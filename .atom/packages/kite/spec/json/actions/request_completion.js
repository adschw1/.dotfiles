'use strict';

module.exports = (action) => {
  beforeEach(() => {
    const editor = atom.workspace.getActiveTextEditor();
    const view = atom.views.getView(editor);
    const event = new CustomEvent('autocomplete-plus:activate', {bubbles: true, cancelable: true});
    view.dispatchEvent(event);
  });
};
