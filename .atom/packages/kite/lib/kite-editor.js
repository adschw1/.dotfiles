'use strict';

let Kite, DataLoader, OverlayManager, WordHoverGesture, EditorEvents,
  screenPositionForMouseEvent,
  pixelPositionForMouseEvent, CompositeDisposable,
  metrics;

class KiteEditor {
  constructor(editor) {
    this.editor = editor;
    this.buffer = editor.getBuffer();
    this.editorElement = atom.views.getView(editor);
    this.fixesHistory = [];

    this.subscribeToEditor(editor);
  }

  dispose() {
    this.subscriptions && this.subscriptions.dispose();
    delete this.subscriptions;
    delete this.editorElement;
    delete this.editor;
    delete this.buffer;
  }

  subscribeToEditor(editor) {
    if (!CompositeDisposable) {
      ({CompositeDisposable} = require('atom'));
      ({screenPositionForMouseEvent, pixelPositionForMouseEvent} = require('./utils'));
      WordHoverGesture = require('./gestures/word-hover');
      DataLoader = require('./data-loader');
      EditorEvents = require('./editor-events');
    }

    const subs = new CompositeDisposable();

    this.subscriptions = subs;
    this.events = new EditorEvents(editor);
    subs.add(this.events);

    const activeEditor = atom.workspace.getActiveTextEditor();

    // When opening a file and no other editor is open we can enter here before
    // the workspace knows that it's the active editor
    if (!activeEditor || editor === activeEditor) {
      this.events.focus();
    }

    this.hoverGesture = new WordHoverGesture(editor, {
      ignoredSelector: 'atom-overlay, atom-overlay *',
    });
    subs.add(this.hoverGesture);

    subs.add(this.hoverGesture.onDidActivate(({position}) => {
      if (atom.config.get('kite.enableHoverUI')) {
        if (!OverlayManager) { OverlayManager = require('./overlay-manager'); }
        OverlayManager.showHoverAtPositionWithDelay(editor, position);
      }
    }));
    subs.add(this.hoverGesture.onDidDeactivate(() => {
      if (atom.config.get('kite.enableHoverUI')) {
        if (!OverlayManager) { OverlayManager = require('./overlay-manager'); }
        OverlayManager.dismissWithDelay();
      }
    }));

    subs.add(editor.onDidChangeCursorPosition(() => {
      if (!Kite) { Kite = require('./kite'); }
      if (atom.config.get('kite.enableHoverUI')) {
        if (!OverlayManager) { OverlayManager = require('./overlay-manager'); }
        OverlayManager.dismissWithDelay();
      }
    }));
  }

  expandPosition(position) {
    if (!metrics) { metrics = require('./metrics'); }

    DataLoader.getHoverDataAtPosition(this.editor, position).then(data => {
      const [symbol] = data.symbol;

      if (symbol && symbol.id) {
        this.expandId(symbol.id);
      }
    });
  }

  expandId(id) {
    atom.applicationDelegate.openExternal(`kite://docs/${encodeURI(id)}`);
  }

  openDefinitionForId(id) {
    return DataLoader.getValueReportDataForId(id)
    .then((data) => this.openDefinition(data.report.definition));
  }

  openDefinitionAtRange(range) {
    const token = this.tokensList.tokenAtRange(range);
    return this.openTokenDefinition(token);
  }

  openDefinitionAtPosition(position) {
    const token = this.tokensList.tokenAtPosition(position);
    return this.openTokenDefinition(token);
  }

  openDefinition(definition) {
    if (!metrics) { metrics = require('./metrics'); }

    if (definition.filename.trim() === '') { return Promise.resolve(false); }

    return new Promise((resolve, reject) => {
      metrics.featureRequested('definition');
      if (definition) {
        return atom.workspace.open(definition.filename)
        .then(editor => {
          metrics.featureFulfilled('definition');
          editor.setCursorBufferPosition([
            definition.line - 1, definition.column ? definition.column - 1 : 0,
          ], {
            autoscroll: true,
          });
          return true;
        });
      }
      return false;
    });
  }

  screenPositionForMouseEvent(event) {
    return screenPositionForMouseEvent(this.editorElement, event);
  }

  pixelPositionForMouseEvent(event) {
    return pixelPositionForMouseEvent(this.editorElement, event);
  }
}

module.exports = KiteEditor;
