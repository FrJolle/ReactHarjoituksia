import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from './CartContext';
import AuthContext from './AuthContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { dispatch } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3005/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', product });
    setPopupProduct(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <div className="product-card" key={product.id}>
          <Link to={`/product/${product.id}`} className="product-link">
            <img src={product.cover_image_url} alt={product.title} />
            <h2>{product.artist} : {product.title}</h2>
            <p className="price">{product.price} €</p>
          </Link>

          {user && user.role !== 'admin' && (
            <button
              className="add-to-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      ))}


      {showPopup && (
        <div className="popup">
          <p>{popupProduct.title} added to cart!</p>
        </div>
      )}


      {user && user.role === 'admin' && (
        <button
          className="add-product-btn"
          onClick={() => navigate('/add-product')}
        >
          Add New Product
        </button>
      )}
    </div>
  );
};

export default ProductList;
