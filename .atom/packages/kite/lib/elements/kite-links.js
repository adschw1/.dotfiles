'use strict';

const {CompositeDisposable, Emitter} = require('atom');
const LinkScheme = require('../link-scheme');
let Kite;

const {stripLeadingSlash, parseRangeInPath, parsePositionInPath, parseDefinitionInPath} = require('../utils');

class KiteLinks extends HTMLElement {
  static initClass() {
    customElements.define('kite-links', this);
    return this;
  }

  onDidClickMoreLink(listener) {
    return this.emitter.on('did-click-more-link', listener);
  }

  constructor() {
    super();
    this.emitter = new Emitter();
  }

  connectedCallback() {
    this.subscriptions = new CompositeDisposable();
    this.scheme = new LinkScheme('kite-atom-internal', this);

    this.subscriptions.add(this.scheme);
    this.subscriptions.add(this.emitter);
    this.subscriptions.add(this.scheme.onDidClickLink(({url, target}) => {
      if (!Kite) { Kite = require('../kite'); }
      const editor = atom.workspace.getActiveTextEditor();
      const kiteEditor = Kite.getModule('editors').kiteEditorForEditor(editor);
      switch (url.host) {
        case 'open-settings':
          atom.applicationDelegate.openExternal('atom://settings-view/show-package?package=kite');
          return;
        case 'open-copilot-settings':
          atom.applicationDelegate.openExternal('kite://settings');
          return;
        case 'open-copilot-permissions':
          atom.applicationDelegate.openExternal(`kite://settings/permissions${url.path || ''}`);
          return;
      }

      if (!editor || !kiteEditor) { return; }

      switch (url.host) {
        case 'goto': {
          const [filename, line, column] = parseDefinitionInPath(url.path);
          kiteEditor.openDefinition({filename, line, column}).catch(err => {
            atom.notifications.addWarning('Can\'t find the definition', {
              dismissable: true,
            });
          });
          break;
        }
        case 'goto-id': {
          const id = stripLeadingSlash(url.path);
          kiteEditor.openDefinitionForId(id).catch(() => {
            atom.notifications.addWarning(`Can't find a definition for id \`${id}\``, {
              dismissable: true,
            });
          });
          break;
        }
        case 'goto-range': {
          const range = parseRangeInPath(url.path);
          kiteEditor.openDefinitionAtRange(range)
          .catch(err => {
            atom.notifications.addWarning(`Can't find a definition at range \`${range}\``, {
              dismissable: true,
            });
          });
          break;
        }
        case 'goto-position': {
          const position = parsePositionInPath(url.path);
          kiteEditor.openDefinitionAtPosition(position)
          .catch(err => {
            atom.notifications.addWarning(`Can't find a definition at position \`${position}\``, {
              dismissable: true,
            });
          });
          break;
        }
        case 'expand-position': {
          this.emitter.emit('did-click-more-link');
          const position = parsePositionInPath(url.path);
          kiteEditor.expandPosition(position);
          break;
        }
        case 'type':
        case 'expand': {
          this.emitter.emit('did-click-more-link');
          const id = stripLeadingSlash(url.path);
          atom.applicationDelegate.openExternal(`kite://docs/${encodeURI(id)}`);
          break;
        }
      }
    }));
  }

  disconnectedCallback() {
    this.subscriptions && this.subscriptions.dispose();
  }
}

module.exports = KiteLinks.initClass();
