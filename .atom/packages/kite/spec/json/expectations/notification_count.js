'use strict';

const {itForExpectation, NotificationsMock} = require('../utils');

module.exports = (expectation, not) => {
  const block = () => {
    if (not) {
      expect(NotificationsMock.notificationsForLevel(expectation.properties.level).length)
      .not.toEqual(expectation.properties.count);
    } else {
      expect(NotificationsMock.notificationsForLevel(expectation.properties.level).length)
      .toEqual(expectation.properties.count);
    }
  };

  itForExpectation(expectation, block);
};
