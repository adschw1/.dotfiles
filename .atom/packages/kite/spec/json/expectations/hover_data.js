'use strict';

const KiteHover = require('../../../lib/elements/kite-hover');
const OverlayManager = require('../../../lib/overlay-manager');
const {/*waitsFor, substituteFromContext, buildContext,*/ itForExpectation} = require('../utils');

beforeEach(() => {
  OverlayManager.reset();
  OverlayManager.hoverDefault.hide = 0;
  OverlayManager.hoverDefault.show = 0;
  spyOn(KiteHover.prototype, 'setData').andCallThrough();
});

module.exports = (expectation, not) => {
  beforeEach(() => {
    waitsFor('hover UI receives data', () =>
      KiteHover.prototype.setData.calls.length > 0);
  });

  itForExpectation(expectation, () => {
    if (expectation.properties) {
      const data = KiteHover.prototype.setData.mostRecentCall.args[0];

      if (expectation.properties.name) {
        expect(data.symbol[0].name).toEqual(expectation.properties.name);
      }

      if (expectation.properties.kind) {
        expect(data.symbol[0].value[0].kind).toEqual(expectation.properties.kind);
      }

    }
  });
};
