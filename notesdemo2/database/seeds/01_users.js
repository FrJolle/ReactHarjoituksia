const testPassword = "salasana"

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hashedpassword = bcrypt.hashSync(testPassword, salt);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'tester1', email: 'test@test2.com', password: hashedpassword},
        {id: 2, username: 'tester2', email: 'test@test3.com',password: hashedpassword},
      ]);
    });
};