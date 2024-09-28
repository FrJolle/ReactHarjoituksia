exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        { user_id: 2, product_id: 1, text: 'Great album, a masterpiece!' },
        { user_id: 3, product_id: 2, text: 'Amazing! I love every track.' },
      ]);
    });
};
