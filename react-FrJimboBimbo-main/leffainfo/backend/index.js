const express = require('express');
const config = require('./utils/config');
const cors = require('cors');
const moviesRoutes = require('./routes/movies');
const reviewsRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/leffat', moviesRoutes);
app.use('/arvostelut', reviewsRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
