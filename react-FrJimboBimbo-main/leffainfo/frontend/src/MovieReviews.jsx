import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function MovieReviews() {
  const { id } = useParams(); // Get the movie ID from URL
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newReview, setNewReview] = useState({ elokuvaID: id, stars: 0, review: '' });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://localhost:3001/leffat`);
        const data = await response.json();
        const selectedMovie = data.find(m => m.elokuvaID === Number(id)); // Find the movie by ID
        if (selectedMovie) {
          setMovie(selectedMovie);
        } else {
          console.error('Movie not found');
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3001/arvostelut/${id}`);
        const data = await response.json();
        setReviews(data);
        calculateAverageRating(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchMovies();
    fetchReviews();
  }, [id]);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      setAverageRating(0);
      return;
    }

    const totalStars = reviews.reduce((acc, curr) => acc + curr.stars, 0);
    const average = totalStars / reviews.length;
    setAverageRating(average.toFixed(1));
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? 'filled-star' : 'empty-star'}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/arvostelut/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
      if (response.ok) {
        const updatedReviews = await response.json();
        setReviews(updatedReviews);
        setNewReview({ elokuvaID: id, stars: 0, review: '' });
        calculateAverageRating(updatedReviews);
      }
    } catch (error) {
      console.error('Failed to add new review:', error);
    }
  };

  return (
    <div className="container">
      <Link to="/" className="home-button">Home</Link>
      <header>
        <h1>Movie Reviews</h1>
      </header>

      {movie && (
        <div className="movie-details">
          {movie.kuva_url && (
            <img src={movie.kuva_url} alt={movie.nimi} className="movie-poster" />
          )}
          <div className="movie-info">
            <h2>{movie.nimi}</h2>
            <p><strong>Movie ID:</strong> {movie.elokuvaID}</p> {/* Display movie ID */}
            <p><strong>Director:</strong> {movie.ohjaaja}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Release Year:</strong> {movie.julkaisuvuosi}</p>
            <p>{movie.kuvaus}</p>
          </div>
        </div>
      )}

      {/* Move the review form before the reviews list */}
      <div className="add-review">
        <h2>Add a Review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <label>
            Stars:
            <input
              type="number"
              name="stars"
              value={newReview.stars}
              onChange={handleInputChange}
              min="1"
              max="5"
              className="input-stars"
              required
            />
          </label>
          <label>
            Review:
            <textarea
              name="review"
              value={newReview.review}
              onChange={handleInputChange}
              className="textarea-review"
              placeholder="Write your review here..."
              required
            />
          </label>
          <button type="submit" className="submit-button">Submit Review</button>
        </form>
      </div>

      <div className="average-rating">
        <h2>Average Rating: {averageRating}</h2>
        <div className="stars">
          {renderStars(averageRating)}
        </div>
      </div>

      <h2>Reviews</h2>
      <ul className="review-list">
        {reviews.length > 0 ? reviews.map((review) => (
          <li key={review.reviewId} className="review-item">
            <div className="stars">{renderStars(review.stars)}</div>
            <p className="review-text">{review.review}</p>
          </li>
        )) : <p>No reviews yet. Be the first to review!</p>}
      </ul>
    </div>
  );
}

export default MovieReviews;
