'use strict';

const fs = require('fs');
const path = require('path');
const syncLogoSvg = String(fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'kitesync.svg')));
const logoSvg = String(fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'logo-no-text.svg')));
const logoSmallSvg = String(fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'logo-small.svg')));

class KiteLogo extends HTMLElement {
  static initClass() {
    customElements.define('kite-logo', this);
    return this;
  }

  constructor() {
    super();
    if (this.hasAttribute('sync')) {
      this.innerHTML = syncLogoSvg;
    } else if (this.hasAttribute('small')) {
      this.innerHTML = logoSmallSvg;
    } else {
      this.innerHTML = logoSvg;
    }
  }
}

module.exports = KiteLogo.initClass();
