exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('users', t=> {
      t.increments('id').primary()
      t.string('username').notNullable().unique()
      t.string('email').notNullable().unique()
      t.string('password').notNullable()
      t.timestamps(false, true)
    })
    .createTable('notes', t => {
        t.increments('id').primary()
        t.string('content').notNullable()
        t.datetime('date').notNullable()
        t.boolean('important').notNullable()
        t.integer('user_id').unsigned().references('id').inTable('users').notNull()
        .onDelete('cascade')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('notes')
    .dropTableIfExists('users')
  };
  