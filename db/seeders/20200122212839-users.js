const faker = require("faker");
const argon2 = require("argon2");
const uuid = require("uuid");

const createUser = password => ({
  id: uuid.v4(),
  email: faker.internet.email(),
  password,
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  up: queryInterface =>
    Promise.all(
      Array(10)
        .fill()
        .map(pw => faker.internet.password(pw))
        .map(argon2.hash),
    )
      .then(passwords => passwords.map(createUser))
      .then(users =>
        queryInterface.bulkInsert("Users", users, { logging: false }),
      ),

  down: queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
