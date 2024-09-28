const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('knex')(require('../utils/config').DATABASE_OPTIONS);

// Rekisteröintireitti
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await knex('users').insert({ username, password: hashedPassword });
        res.status(201).send('User registered');
    } catch (err) {
        res.status(500).json({ error: 'Database error', message: err.message });
    }
});

// Kirjautumisreitti
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await knex('users').where({ username }).first();
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Database error', message: err.message });
    }
});

module.exports = router;
