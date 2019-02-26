'use strict';

const {DisposableEvent} = require('../utils');
const metrics = require('../metrics.js');

class KiteOpenLink extends HTMLElement {
  static initClass() {
    customElements.define('kite-open-link', this);
    return this;
  }

  disconnectedCallback() {
    this.subscription && this.subscription.dispose();
    this.innerHTML = '';
  }

  connectedCallback() {
    this.url = this.getAttribute('data-url');

    const content = this.innerHTML !== ''
      ? this.innerHTML
      : '<span>Open in web</span>';

    this.innerHTML = `<a href="#">${content}</a>`;

    const link = this.querySelector('a');
    this.subscription = new DisposableEvent(link, 'click', () => {
      metrics.featureRequested('open_in_web');
      atom.applicationDelegate.openExternal(this.url);
      metrics.featureFulfilled('open_in_web');
    });
  }

  open() {
    atom.applicationDelegate.openExternal(this.url);
  }
}

module.exports = KiteOpenLink.initClass();
