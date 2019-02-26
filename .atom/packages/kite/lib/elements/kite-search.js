// 'use strict';

const KiteAPI = require('kite-api');
const {CompositeDisposable, TextEditor} = require('atom');
const {searchPath} = require('../urls');
const {addDelegatedEventListener, DisposableEvent} = require('../utils');
require('./kite-expand');
const metrics = require('../metrics');

const SEARCH_METRIC_TIMEOUT = 1000;

const GETTING_STARTED = [
  'json',
  'requests.get',
  'matplotlib.pyplot.plot',
];

class KiteSearch extends HTMLElement {
  static initClass() {
    atom.commands.add('kite-search', {
      'core:move-up'() {
        this.selectPreviousItem();
      },
      'core:move-down'() {
        this.selectNextItem();
      },
      'core:cancel'() {
        this.collapse();
      },
      // 'core:confirm'() {
      //   this.toggleSelectedItem();
      // },
    });

    customElements.define('kite-search', this);
    return this;
  }

  constructor() {
    super();
    this.setAttribute('tabindex', -1);

    this.innerHTML = `
      <header>
        <h4>Kite search</h4>
        <button class="btn-close"><i class="icon icon-x"></i></button>
      </header>
      <div class="select-list popover-list">
        <ol class="list-group"></ol>
      </div>
      <kite-expand style="display: none;"></kite-expand>
      <div class="history" style="display: none;"></div>
      <div class="expander icon-search"></div>
      <div class="collapser icon-chevron-right"></div>
    `;

    this.subscriptions = new CompositeDisposable();
    this.textEditor = new TextEditor({placeholderText: 'Search identifier…', mini: true});
    this.textEditorView = atom.views.getView(this.textEditor);
    this.expandView = this.querySelector('kite-expand');
    this.historyView = this.querySelector('.history');
    this.expander = this.querySelector('.expander');
    this.collapser = this.querySelector('.collapser');
    this.closeButton = this.querySelector('.btn-close');
    this.list = this.querySelector('ol');

    this.list.parentNode.insertBefore(this.textEditorView, this.list);
    this.expandView.removeAttribute('tabindex');

    this.subscriptions.add(atom.config.observe('kite.searchIconPosition', (pos, oldPos) => {
      this.setAttribute('position', pos);
    }));

    this.subscriptions.add(addDelegatedEventListener(this.list, 'click', 'li[data-id]', e => {
      const {matchedTarget} = e;
      this.selectItem(matchedTarget);
    }));

    this.subscriptions.add(addDelegatedEventListener(this.historyView, 'click', 'li[data-search]', e => {
      const {matchedTarget} = e;
      this.textEditor.setText(matchedTarget.getAttribute('data-search'));
    }));

    this.subscriptions.add(new DisposableEvent(this, 'focus', () => {
      this.focused();
    }));

    this.subscriptions.add(new DisposableEvent(this.expander, 'click', () => {
      this.expand();
    }));

    this.subscriptions.add(new DisposableEvent(this.collapser, 'click', () => {
      this.collapse();
    }));
    this.subscriptions.add(new DisposableEvent(this.closeButton, 'click', () => {
      this.collapse();
    }));

    this.stack = Promise.resolve();

    this.subscriptions.add(this.textEditor.onDidChange(() => {
      this.startRecordMetric();
      const text = this.textEditor.getText().trim();

      if (text !== '') {
        this.doSearch(text);
      } else {
        this.stack = this.stack.then(() => this.clear());
      }
    }));

    this.stack = this.stack.catch(() => {});

    this.hide();
  }

  doSearch(text) {
    const path = searchPath(text);

    this.stack = this.stack.then(() => KiteAPI.requestJSON({path}))
    .then(data => this.renderList(data));
  }

  focused() {
    this.textEditorView.focus();
  }

  focus() {
    this.textEditorView.focus();
  }

  startRecordMetric() {
    if (!this.recording) {
      this.recording = true;
      metrics.featureRequested('active_search');

      setTimeout(() => {
        if (this.expandView && this.expandView.querySelector('.scroll-wrapper *')) {
          metrics.featureFulfilled('active_search');
        }

        this.recording = false;
      }, SEARCH_METRIC_TIMEOUT);
    }
  }

  show() {
    //if the panel is already showing, then do nothing
    if (!this.parentNode) {
      const paneContainer = document.querySelector('atom-workspace-axis.vertical  atom-pane-container.panes');
      paneContainer.appendChild(this);
    }
  }

  hide() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }

    this.clear();
    this.collapse();
  }

  collapse() {
    this.textEditor.setText('');
    this.classList.add('collapsed');
  }

  expand() {
    this.classList.remove('collapsed');
    this.textEditorView.focus();
  }

  setApp(app) {
    this.app = app;
  }

  getSearchHistory() {
    return localStorage.getItem('kite.searchHistory')
      ? JSON.parse(localStorage.getItem('kite.searchHistory'))
      : null;
  }

  clear() {
    const searchHistory = this.getSearchHistory();
    this.expandView && (this.expandView.style.display = 'none');
    if (this.list) {
      this.list.parentNode.classList.remove('has-results');
    }
    if (this.historyView) {
      this.historyView.style.display = '';
      this.historyView.innerHTML = `
      <p class="grim">
        Type any identifier above to search docs, examples, signatures, and more.
      </p>
      <h4>${searchHistory && searchHistory.length ? 'Previous searches' : 'Examples to get you started'}</h4>
      <div class="select-list popover-list">
        <ol class="list-group">${
          ((searchHistory && searchHistory.length) ? searchHistory : GETTING_STARTED)
          .map(i => `<li data-search="${i}"><code>${i}</code></li>`)
          .join('')
        }</ol>
      </div>`;
    }
    delete this.selectedItem;
  }

  renderList(data) {
    if (data && data.results) {
      this.list.parentNode.classList.add('has-results');
      this.list.innerHTML = data.results
      .filter(r => r.result.repr && r.result.repr.trim() !== '')
      .map(r =>
        `<li data-id="${r.result.id}"><code>
          ${r.result.repr} ${r.local ? '<small>Local</small>' : ''}
        </code></li>`
      ).join('');
      this.selectNextItem();
      this.list.parentNode.classList.toggle('has-scroll', this.list.scrollHeight > this.list.offsetHeight);
    }
  }

  selectNextItem() {
    if (this.list.childNodes.length === 0) {
      this.clear();
      return;
    }

    if (this.selectedItem && this.selectedItem.nextSibling) {
      this.selectItem(this.selectedItem.nextSibling);
    } else {
      this.selectItem(this.list.firstChild);
    }
  }

  selectPreviousItem() {
    if (this.list.childNodes.length === 0) { return; }

    if (this.selectedItem && this.selectedItem.previousSibling) {
      this.selectItem(this.selectedItem.previousSibling);
    } else {
      this.selectItem(this.list.lastChild);
    }
  }

  selectItem(item) {
    this.selectedItem && this.selectedItem.classList.remove('selected');
    this.selectedItem = item;
    if (this.selectedItem) {
      this.selectedItem.classList.add('selected');
      this.loadItem(this.selectedItem.getAttribute('data-id'));
      this.scrollTo(this.selectedItem);
    }
  }

  loadItem(id) {
    clearTimeout(this.historyTimeout);
    this.historyView.style.display = 'none';
    this.expandView.style.display = '';
    this.expandView.showDataForSymbolId(atom.workspace.getActiveTextEditor(), id, true).then(() => {
      this.historyTimeout = setTimeout(() => {
        this.stackHistory(this.textEditor.getText());
      }, 1000);
    });

  }

  scrollTo(target) {
    const containerBounds = this.list.getBoundingClientRect();
    const scrollTop = this.list.scrollTop;
    const targetTop = target.offsetTop;
    const targetBottom = targetTop + target.offsetHeight;

    if (targetTop < scrollTop) {
      this.list.scrollTop = targetTop;
    } else if (targetBottom > scrollTop + containerBounds.height) {
      this.list.scrollTop = targetBottom - containerBounds.height;
    }
  }

  stackHistory(q) {
    let searchHistory = this.getSearchHistory();
    if (searchHistory && !searchHistory.includes(q)) {
      searchHistory.unshift(q);
      searchHistory = searchHistory.slice(0, 5);
      localStorage.setItem('kite.searchHistory', JSON.stringify(searchHistory));
    } else if (!searchHistory) {
      searchHistory = [q];
      localStorage.setItem('kite.searchHistory', JSON.stringify(searchHistory));
    }
  }
}

module.exports = KiteSearch.initClass();
