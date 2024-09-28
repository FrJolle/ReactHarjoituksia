// s imports
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const config = require('./utils/config');

// Express setup
const app = express();
app.use(express.json());

// Knex setup
const database = knex(config.DATABASE_OPTIONS);
database.on('query', console.log);

// Environment variables
let SECRET = process.env.SECRET;

// Route: Home
app.get('/', (req, res) => {
    res.send('<h1>llll</h1>');
});

// Route: GET /notes
app.get('/notes', (req, res) => {
    database('notes').select('*')
        .then((rows) => {
            console.log("starting notes");
            console.log(rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "error in db connection" });
        });
});

// Route: POST /notes
app.post('/notes', (req, res) => {
    const note = req.body;

    if (!note.content || !note.date || !note.important) {
        return res.status(400).json({ error: "check json-data" });
    }

    const newNote = {
        content: note.content,
        important: note.important,
        date: new Date(note.date),
        user_id: 1
    };

    database('notes').insert(newNote)
        .then(id_arr => {
            newNote.id = id_arr[0];
            res.json(newNote);
        });
});

// Route: DELETE /notes/:id
app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    database('notes').where('id', '=', id).del()
        .then(() => {
            res.status(204).end();
        })
});

// Route: PUT /notes/:id
app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = req.body;

    const updatedNote = {
        content: note.content,
        important: note.important,
        date: new Date(note.date)
    };

    database('notes').update(updatedNote).where('id', '=', id)
        .then(() => {
            res.status(204).end();
        })
});

// Route: POST /register
app.post('/register', (req, res) => {
    const user = req.body;
    const saltRounds = 10;
     
    bcrypt.hash(user.password, saltRounds)
        .then((passwordHash) => {
            const newUser = {
                username: user.username,
                password: passwordHash, 
                email: user.email
            };
            database('users').insert(newUser)
                .then(() => {
                    res.status(204).end();
                });
        });
});

// Route: POST /login
app.post('/login', (req, res) => {
    const user = req.body;

    database('users').select('*').where('username', '=', user.username)
        .then((dbuser) => {
            if (dbuser.length === 0) {
                return res.status(401).json({ error: "invalid username or password" });
            }
            const tempUser = dbuser[0];

            bcrypt.compare(user.password, tempUser.password)
                .then((passwordCorrect) => {
                    if (!passwordCorrect) {
                        return res.status(401).json({ error: "invalid username or password" });
                    } 

                    const userForToken = {
                        username: tempUser.username,
                        id: tempUser.id
                    };

                    const token = jwt.sign(userForToken, config.SECRET);
                    res.status(200).send({
                        token,
                        username: tempUser.username,
                        role: "regularuser"
                    });
                });
        });
});

// Start server
const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
