import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MovieReviews from './MovieReviews';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState(1888);
  const [filterEndDate, setFilterEndDate] = useState(2024);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [filterStartDate, filterEndDate, selectedGenre]);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:3001/leffat');
      const data = await response.json();
      setMovies(data);
      setFilteredMovies(data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    if (name === 'startDate') {
      setFilterStartDate(Number(value));
    } else if (name === 'endDate') {
      setFilterEndDate(Number(value));
    } else if (name === 'genre') {
      setSelectedGenre(value);
    }
  };

  const filterMovies = () => {
    const filtered = movies.filter(movie => {
      const releaseYear = Number(movie.julkaisuvuosi);
      return (
        releaseYear >= filterStartDate &&
        releaseYear <= filterEndDate &&
        (selectedGenre === '' || movie.genre.toLowerCase().includes(selectedGenre.toLowerCase()))
      );
    });
    setFilteredMovies(filtered);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="container">
            <header>
              <h1>Movies List</h1>
            </header>

            <div className="section">
              <div className="filter-container">
                <label>Start Year:</label>
                <input type="number" name="startDate" value={filterStartDate} onChange={handleFilterChange} />
                <label>End Year:</label>
                <input type="number" name="endDate" value={filterEndDate} onChange={handleFilterChange} />
                <label>Genre:</label>
                <input type="text" name="genre" value={selectedGenre} onChange={handleFilterChange} />
              </div>

              <ul className="movie-list">
                {filteredMovies.map(movie => (
                  <li key={movie.elokuvaID} className="movie-item">
                    <Link to={`/reviews/${movie.elokuvaID}`}>
                      <img src={movie.kuva_url} alt={movie.nimi} style={{ width: '100px', borderRadius: '10px' }} />
                      <h3>{movie.nimi} ({movie.julkaisuvuosi})</h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <footer>
              <p>&copy; 2024 Movie Reviews</p>
            </footer>
          </div>
        } />

        <Route path="/reviews/:id" element={<MovieReviews />} />

        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
