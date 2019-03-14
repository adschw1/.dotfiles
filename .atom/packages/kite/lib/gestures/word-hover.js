'use strict';

const {CompositeDisposable} = require('atom');
const MouseEventGesture = require('./mouse-event');
const {DisposableEvent, isWithinTextOfLine} = require('../utils');

module.exports = class HoverGesture extends MouseEventGesture {
  constructor(editor, options) {
    super(editor, options);

    this.registerEvents();
  }

  dispose() {
    super.dispose();
    this.subscriptions.dispose();
  }

  registerEvents() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(new DisposableEvent(document, 'mouseout', (e) => {
      const from = e.relatedTarget || e.toElement;
      if (!from || from.nodeName == 'HTML') {
        this.deactivate();
      }
    }));

    this.subscriptions.add(new DisposableEvent(this.editorElement, 'mousemove', (e) => {
      if (!this.matchesModifiers(e)) {
        this.deactivate();
        return;
      }

      if (e.target.matches(this.options.ignoredSelector)) { return; }

      const textRange = this.wordRangeForMouseEvent(event);

      if (textRange && this.lastRange && !this.lastRange.isEqual(textRange) && !textRange.isEmpty()) {
        if (isWithinTextOfLine(this.editorElement, event)) {
          this.activate({
            position: this.screenPositionForMouseEvent(event),
            range: textRange,
          });
        }
      } else if (!textRange || textRange.isEmpty()) {
        this.deactivate();
      }

      this.lastRange = textRange;
    }));
  }
};
