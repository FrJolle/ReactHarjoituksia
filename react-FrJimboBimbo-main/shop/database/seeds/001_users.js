const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Inserts seed entries
  return knex('users').insert([
    { id: 1, username: 'admin', password: hashedPassword, role: 'admin' },
    { id: 2, username: 'john_doe', password: hashedPassword, role: 'user' },
    { id: 3, username: 'jane_doe', password: hashedPassword, role: 'user' },
  ]);
};
