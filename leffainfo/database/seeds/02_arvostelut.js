exports.seed = function(knex) {

  return knex('ht1_arvostelut').del()
    .then(function () {

      return knex('ht1_arvostelut').insert([
        { elokuvaID: 1, stars: 5, review: 'Loistava elokuva!', added_date: new Date() },
        { elokuvaID: 2, stars: 4, review: 'Erittäin hyvä elokuva.', added_date: new Date() },
        { elokuvaID: 3, stars: 3, review: 'Keskiverto elokuva.', added_date: new Date() }
      ]);
    });
};
