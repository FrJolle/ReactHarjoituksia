require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');  // For generating and verifying tokens
const bcrypt = require('bcryptjs');   // For password hashing
const app = express();

// Use environment variables for sensitive information
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Initialize knex (DB connection)
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'mypass123',
    database: process.env.DB_NAME || 'shop',
  }
});

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors());         // Enable CORS for cross-origin requests

// Helper function to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user; // Attach user data to the request
    next(); // Move to the next middleware or route handler
  });
};

// Root route (for testing server)
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

// Route to get all products
app.get('/products', (req, res) => {
  knex('products').select('*')
    .then((rows) => res.json(rows))
    .catch((err) => {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
    });
});

// Route to get details of a single product by ID (including reviews)
app.get('/products/:id', (req, res) => {
  const { id } = req.params;

  knex('products')
    .where({ id })
    .first()
    .then(product => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Fetch reviews for the product, including the user who wrote the review
      knex('reviews')
        .join('users', 'reviews.user_id', '=', 'users.id')
        .where({ product_id: id })
        .select('reviews.*', 'users.username as author') // Select review text and the username of the author
        .then(reviews => {
          product.reviews = reviews; // Attach reviews to product object
          res.json(product);          // Send the product along with reviews
        })
        .catch(err => {
          console.error('Error fetching reviews:', err);
          res.status(500).json({ error: 'Failed to fetch reviews' });
        });
    })
    .catch(err => {
      console.error('Error fetching product details:', err);
      res.status(500).json({ error: 'Failed to fetch product details' });
    });
});

// Route to handle user login with credentials fetched from DB
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  knex('users').where({ username }).first()
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

      return res.json({
        user: { id: user.id, username: user.username, role: user.role },
        token,
      });
    })
    .catch(err => {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Failed to login' });
    });
});

// Route to submit a review for a product (authenticated users only)
app.post('/products/:id/reviews', authenticateToken, (req, res) => {
  const { id } = req.params; // Product ID
  const { review } = req.body; // Review content

  // Ensure the user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const newReview = {
    product_id: id,
    user_id: req.user.id, // Use user_id from the authenticated user
    text: review,
  };

  // Insert the new review into the reviews table
  knex('reviews').insert(newReview)
    .then(() => res.status(201).json({ message: 'Review added successfully' }))
    .catch(err => {
      console.error('Error adding review:', err);
      res.status(500).json({ error: 'Failed to add review' });
    });
});

// Route to add a new product (protected route, only for admins)
app.post('/products', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  const { title, artist, genre, release_date, price, stock_quantity, description, cover_image_url } = req.body;

  knex('products').insert({
    title,
    artist,
    genre,
    release_date,
    price,
    stock_quantity,
    description,
    cover_image_url,
  })
    .then(() => res.status(201).json({ message: 'Product added successfully' }))
    .catch(err => {
      console.error('Error adding product:', err);
      res.status(500).json({ error: 'Failed to add product' });
    });
});

// Route to edit a product (protected route, only for admins)
app.put('/products/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  const { id } = req.params;
  const { title, artist, genre, release_date, price, stock_quantity, description, cover_image_url } = req.body;

  knex('products')
    .where({ id })
    .update({
      title,
      artist,
      genre,
      release_date,
      price,
      stock_quantity,
      description,
      cover_image_url,
    })
    .then(() => res.status(200).json({ message: 'Product updated successfully' }))
    .catch(err => {
      console.error('Error updating product:', err);
      res.status(500).json({ error: 'Failed to update product' });
    });
});

// Route to add a new product (protected route, only for admins)
app.post('/products', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  const { title, artist, genre, release_date, price, stock_quantity, description, cover_image_url } = req.body;

  knex('products').insert({
    title,
    artist,
    genre,
    release_date,
    price,
    stock_quantity,
    description,
    cover_image_url,
  })
    .then(() => res.status(201).json({ message: 'Product added successfully' }))
    .catch(err => {
      console.error('Error adding product:', err);
      res.status(500).json({ error: 'Failed to add product' });
    });
});

// Route to delete a product (protected route, only for admins)
app.delete('/products/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  const { id } = req.params;

  knex('products')
    .where({ id })
    .del()
    .then(() => res.status(200).json({ message: 'Product deleted successfully' }))
    .catch(err => {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: 'Failed to delete product' });
    });
});

// Route to delete a review (protected route, only for admins)
app.delete('/reviews/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  const { id } = req.params;

  knex('reviews')
    .where({ id })
    .del()
    .then(() => res.status(200).json({ message: 'Review deleted successfully' }))
    .catch(err => {
      console.error('Error deleting review:', err);
      res.status(500).json({ error: 'Failed to delete review' });
    });
});


// Start the server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
