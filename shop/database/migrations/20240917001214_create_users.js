exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id'); // Auto-incrementing ID
      table.string('username').notNullable().unique(); // Unique username
      table.string('password').notNullable(); // User's password (hashed)
      table.enum('role', ['user', 'admin']).defaultTo('user'); // Role (user/admin)
      table.timestamps(true, true); // Created_at and updated_at timestamps
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  