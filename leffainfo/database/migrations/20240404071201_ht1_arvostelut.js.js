exports.up = function(knex, Promise) {
  return knex.schema.createTable('ht1_arvostelut', t => {
      t.increments('arvosteluID').primary();
      t.integer('elokuvaID').unsigned().references('elokuvaID').inTable('ht1_elokuvat').onDelete('CASCADE').notNullable();
      t.integer('stars').notNullable(); 
      t.text('review').notNullable();  
      t.date('added_date').notNullable();  
      t.timestamps(false, true);  
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ht1_arvostelut');
};
