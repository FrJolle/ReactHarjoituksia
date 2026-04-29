const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'mypass123',
        database: 'notesdemo_db'
    }
}

const knex = require('knex')(options);

knex.on('query', console.log);  // SQL-muoto

const more_notes = [
    {content: 'React is really cool', user_id: 2},
    {content: 'Knex is better than sequalize', user_id: 2},
    {content: 'Why are we not using nosql', user_id: 2},
    ]

knex('notes').insert(more_notes)
    .then(() => 
        console.log("more data inserted")
    )
    .catch((err) => { 
        console.log(err); 
        throw err
    })
    .finally(() => {
        knex.destroy();
    });