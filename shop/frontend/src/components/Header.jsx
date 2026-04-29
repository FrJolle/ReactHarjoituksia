import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from './CartContext';
import AuthContext from './AuthContext';

const Header = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);


  const handleLogout = () => {
    setLoggingOut(true);
    logout();
    navigate('/');
  };


  useEffect(() => {

    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3005/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);


  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query) || product.artist.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };


  const handleSelectProduct = (productId) => {
    setSearchQuery('');
    setFilteredProducts([]);
    navigate(`/product/${productId}`);
  };

  return (
    <header className="header">
      <div className="header-content">

        <Link to="/" className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/12in-Vinyl-LP-Record-Angle.jpg/800px-12in-Vinyl-LP-Record-Angle.jpg"
            alt="Logo"
            className="logo-img"
          />
        </Link>
        <span>Vinyl Store</span>


        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for vinyls..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />

          {searchQuery && filteredProducts.length > 0 && (
            <ul className="search-dropdown">
              {filteredProducts.map(product => (
                <li
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="search-item"
                >
                  {product.artist} - {product.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav className="nav">

          <Link to="/cart" className="cart-link">
            Cart ({totalItemsInCart})
          </Link>


          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button className="logout-btn" onClick={handleLogout} disabled={loggingOut}>
                {loggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="auth-link">
                Register
              </Link>
              <Link to="/login" className="auth-link">
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
