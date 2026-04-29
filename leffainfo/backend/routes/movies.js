const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../utils/config').DATABASE_OPTIONS);

router.post('/', (req, res) => {
    const newMovie = req.body;
    knex('ht1_elokuvat').insert(newMovie)
        .then(() => res.status(201).send('Movie added'))
        .catch((err) => res.status(500).json({ error: "Database error", message: err.message }));
});

router.get('/', (req, res) => {
    knex('ht1_elokuvat').select('*')
        .then((movies) => res.json(movies))
        .catch((err) => res.status(500).json({ error: "Database error", message: err.message }));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    knex('ht1_elokuvat').where({ elokuvaID: id }).del()
        .then(result => {
            if (result) res.status(200).send(`Movie with ID ${id} successfully deleted`);
            else res.status(404).send('Movie not found');
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
