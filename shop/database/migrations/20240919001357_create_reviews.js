exports.up = function(knex) {
    return knex.schema.createTable('reviews', function(table) {
      table.increments('id'); // Auto-incrementing ID
      table.integer('user_id').unsigned().notNullable(); // Foreign key to users
      table.integer('product_id').unsigned().notNullable(); // Foreign key to products
      table.text('text').notNullable(); // Review text
      table.timestamps(true, true); // Created_at and updated_at timestamps
  
      // Define relationships
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.foreign('product_id').references('products.id').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('reviews');
  };
  