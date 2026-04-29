exports.seed = function(knex) {

  return knex('ht1_elokuvat').del()
    .then(function () {

      return knex('ht1_elokuvat').insert([
        { nimi: 'Elokuvan Nimi 1', ohjaaja: 'Ohjaaja 1', genre: 'Genre', kuvaus: 'Kuvaus elokuvasta 1', julkaisuvuosi: 2001, kuva_url: 'https://www.prokoulu.fi/wp-content/uploads/2023/06/placeholder.png'},
        { nimi: 'Elokuvan Nimi 2', ohjaaja: 'Ohjaaja 2', genre: 'Genre', kuvaus: 'Kuvaus elokuvasta 2', julkaisuvuosi: 2002, kuva_url: 'https://www.prokoulu.fi/wp-content/uploads/2023/06/placeholder.png'},
        { nimi: 'Elokuvan Nimi 3', ohjaaja: 'Ohjaaja 3', genre: 'Genre', kuvaus: 'Kuvaus elokuvasta 3', julkaisuvuosi: 2003, kuva_url: 'https://www.prokoulu.fi/wp-content/uploads/2023/06/placeholder.png'}
      ]);
    });
};