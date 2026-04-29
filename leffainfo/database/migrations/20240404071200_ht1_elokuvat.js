exports.up = function(knex, Promise) {
  return knex.schema.createTable('ht1_elokuvat', t => {
      t.increments('elokuvaID').primary();
      t.string('nimi').notNullable();
      t.string('genre').notNullable();
      t.string('ohjaaja').notNullable();
      t.text('kuvaus').notNullable();
      t.integer('julkaisuvuosi').notNullable();
      t.string('kuva_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ht1_elokuvat');
};
