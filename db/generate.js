module.exports = function () {
  const faker = require('faker');
  const _ = require('lodash');
  return {
    people: _.times(100, (n) => ({
      id: n,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    })),
  };
};
