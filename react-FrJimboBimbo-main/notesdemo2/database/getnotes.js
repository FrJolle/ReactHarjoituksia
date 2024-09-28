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

knex.from('notes').select("*")
    .then((rows) => {
        console.log("starting notes");
        console.log(rows);
    })
    .catch((err) => {
        console.log(err); 
        throw err 
    })
    .finally(() => {
        console.log("close database connection")
        knex.destroy();
    });