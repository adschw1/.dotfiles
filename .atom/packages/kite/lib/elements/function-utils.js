const {renderParameter, highlightCode, wrapAfterParenthesis} = require('./html-utils');
const {detailNotEmpty, detailGet, detailLang, getFunctionDetails} = require('../utils');
const {callSignature} = require('../kite-data-utils');

function renderPatterns(name, data) {
  let patterns = '';
  const detail = getFunctionDetails(data);
  if (detail && detail.signatures && detail.signatures.length) {
    patterns = `
      <section class="patterns">
      <h4>How others used this</h4>
      <div class="section-content">${
        highlightCode(wrapAfterParenthesis(
          detail.signatures
          .map(s => callSignature(s))
          .map(s => `${name}(${s})`)
          .join('\n')))
        }</div>
      </section>`;
  }
  return patterns;
}

function renderLanguageSpecificArguments(value) {
  const {detail} = value;
  const lang = detailLang(detail);

  switch (lang) {
    case 'python':
      return renderKwargs(value);
    default:
      return '';
  }
}

function renderKwargs(data) {
  let kwargs = '';
  const detail = getFunctionDetails(data);
  if (detailNotEmpty(detail, 'kwarg_parameters')) {
    kwargs = `<section class="kwargs collapsible collapse">
        <h4>**${detailGet(detail, 'kwarg').name}</h4>
        <div class="section-content"><dl>
          ${
            detailGet(detail, 'kwarg_parameters')
            .map(p => renderParameter(p))
            .map(p => `<dt>${p}</dt>`)
            .join('')
          }
        </dl></div>
      </section>`;
  }
  return kwargs;
}

module.exports = { renderPatterns, renderLanguageSpecificArguments };
