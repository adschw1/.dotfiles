const {withKiteRoutes} = require('kite-api/test/helpers/kite');
const {fakeResponse} = require('kite-connector/test/helpers/http');
const {jsonPath, substituteFromContext, buildContext} = require('../utils');

module.exports = (action) => {
  withKiteRoutes([action.properties].map(r => {
    const reg = new RegExp(substituteFromContext(r.match, buildContext()));

    return [
      o => reg.test(o.path),
      o => {
        if (r.response.body) {
          const body = require(jsonPath(r.response.body));
          return fakeResponse(r.response.status, JSON.stringify(body));
        } else {
          return fakeResponse(r.response.status);
        }
      },
    ];

  }));
};
