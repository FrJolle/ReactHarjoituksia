exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          title: 'Abbey Road',
          artist: 'The Beatles',
          genre: 'Rock',
          release_date: '1969-09-26',
          price: 29.99,
          stock_quantity: 15,
          description: 'The iconic album by The Beatles, featuring hits like "Come Together" and "Here Comes the Sun."',
          cover_image_url: 'https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg'
        },
        {
          title: 'Back to Black',
          artist: 'Amy Winehouse',
          genre: 'Soul',
          release_date: '2006-10-27',
          price: 25.99,
          stock_quantity: 10,
          description: 'Amy Winehouse\'s second studio album, including the popular singles "Rehab" and "Back to Black."',
          cover_image_url: 'https://upload.wikimedia.org/wikipedia/en/6/67/Amy_Winehouse_-_Back_to_Black_%28album%29.png'
        },
        {
          title: 'Thriller',
          artist: 'Michael Jackson',
          genre: 'Pop',
          release_date: '1982-11-30',
          price: 34.99,
          stock_quantity: 20,
          description: 'One of the best-selling albums of all time, featuring hits like "Billie Jean" and "Thriller."',
          cover_image_url: 'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png'
        },
        {
          title: 'The Dark Side of the Moon',
          artist: 'Pink Floyd',
          genre: 'Progressive Rock',
          release_date: '1973-03-01',
          price: 32.99,
          stock_quantity: 12,
          description: 'A legendary album by Pink Floyd, known for its immersive sound and themes of mental health.',
          cover_image_url: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png'
        },
        {
          title: 'Rumours',
          artist: 'Fleetwood Mac',
          genre: 'Rock',
          release_date: '1977-02-04',
          price: 27.99,
          stock_quantity: 18,
          description: 'Fleetwood Mac\'s best-selling album, with iconic tracks like "Go Your Own Way" and "Dreams."',
          cover_image_url: 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'
        },
        {
          title: 'Stranger',
          artist: 'Yung Lean',
          genre: 'Cloud Rap',
          release_date: '2017-11-10',
          price: 27.99,
          stock_quantity: 0,
          description: '"Stranger" by Yung Lean is an atmospheric and introspective album, blending dreamy beats with melancholic lyrics that explore themes of isolation, identity, and emotional vulnerability.',
          cover_image_url: 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG'
        }
      ]);
    });
};
