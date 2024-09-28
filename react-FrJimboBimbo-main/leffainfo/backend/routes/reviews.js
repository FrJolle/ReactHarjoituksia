const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../utils/config').DATABASE_OPTIONS);

router.post('/', (req, res) => {
    const { elokuvaID, stars, review, added_date } = req.body; 
    console.log (req.body);
    knex('ht1_arvostelut').insert({
        elokuvaID,
        stars,
        review,
        added_date: added_date || new Date()
    })
    .then(() => res.status(201).send('Review added'))
    .catch((err) => res.status(500).json({ error: "Database error", message: err.message }));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    knex('ht1_arvostelut').where('elokuvaID', id).select('*')
        .then((reviews) => res.json(reviews))
        .catch((err) => res.status(500).json({ error: "Database error", message: err.message }));
});

module.exports = router;
