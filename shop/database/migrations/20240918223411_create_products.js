exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
      table.increments('id').primary(); // Primary key
      table.string('title').notNullable(); // Vinyl title
      table.string('artist').notNullable(); // Artist name
      table.string('genre').notNullable(); // Genre of the vinyl
      table.date('release_date'); // Release date of the vinyl
      table.decimal('price', 10, 2).notNullable(); // Price with two decimal points
      table.integer('stock_quantity').notNullable().defaultTo(0); // Number of items in stock
      table.text('description'); // Detailed description
      table.string('cover_image_url'); // URL of the cover image
      table.timestamps(true, true); // Created at and updated at timestamps
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('products');
  };
  