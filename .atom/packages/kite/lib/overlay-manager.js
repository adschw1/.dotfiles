'use strict';

const {Emitter} = require('atom');
const VirtualCursor = require('./virtual-cursor');
const KiteHover = require('./elements/kite-hover');
const DataLoader = require('./data-loader');
const metrics = require('./metrics');

module.exports = {
  emitter: new Emitter(),
  queue: Promise.resolve(),
  hoverDefault: {
    show: 750,
    hide: 100,
  },

  reset() {
    this.queue = Promise.resolve();
    delete this.lastHoverRange;
    delete this.lastExpandRange;
  },

  enqueue(promiseGenerator) {
    this.queue = this.queue
    .then(promiseGenerator)
    .catch(err => {});

    return this.queue;
  },

  onDidShowExpand(listener) {
    return this.emitter.on('did-show-expand', listener);
  },

  onDidShowHover(listener) {
    return this.emitter.on('did-show-hover', listener);
  },

  onDidDismiss(listener) {
    return this.emitter.on('did-dismiss', listener);
  },

  dismiss(from) {
    this.marker && this.marker.destroy();
    this.decoration && this.decoration.destroy();
    delete this.marker;
    delete this.decoration;
    delete this.lastHoverRange;
    delete this.lastExpandRange;
    delete this.expandDisplayed;

    this.emitter.emit('did-dismiss');
  },

  dismissWithDelay() {
    this.abortHoverWithDelay();
    if (this.decoration && this.dismissTimeout == null) {
      this.dismissTimeout = setTimeout(() => {
        this.dismiss();
        delete this.dismissTimeout;
      }, this.hoverDefault.hide);
    }
  },

  abortHoverWithDelay() {
    // this.abortDismissWithDelay();
    clearTimeout(this.hoverTimeout);
  },

  abortDismissWithDelay() {
    if (this.dismissTimeout) { clearTimeout(this.dismissTimeout); }
  },

  showHoverAtPositionWithDelay(editor, position) {
    if (!editor || !position) { return; }

    clearTimeout(this.hoverTimeout);
    this.dismissWithDelay();

    this.hoverTimeout = setTimeout(() => {
      if (!this.expandDisplayed) {
        metrics.featureRequested && metrics.featureRequested('hover');
        this.showHoverAtPosition(editor, position);
      }
    }, this.hoverDefault.show);
  },

  showHoverAtPosition(editor, position) {
    if (!editor || !position) { return Promise.resolve(); }

    const cursor = new VirtualCursor(editor, position);

    return this.enqueue(() => {
      const range = cursor.getCurrentWordBufferRange({
        includeNonWordCharacters: false,
      });

      if ((this.lastHoverRange && this.lastHoverRange.isEqual(range)) ||
          (this.lastExpandRange && this.lastExpandRange.isEqual(range))) {
        return null;
      }

      this.dismiss('hover');

      if (range.isEmpty()) { return null; }

      this.lastHoverRange = range;

      return DataLoader.getHoverDataAtPosition(editor, position).then(data => {
        if (data.symbol && data.symbol.length) {
          metrics.featureFulfilled && metrics.featureFulfilled('hover');
          const hover = new KiteHover();
          hover.setData(data, editor, position);

          this.marker = editor.markBufferRange(range, {
            invalidate: 'touch',
          });
          this.decoration = editor.decorateMarker(this.marker, {
            type: 'overlay',
            position: 'tail',
            item: hover,
          });
          this.emitter.emit('did-show-hover');
        }
      });
    });
  },
};
