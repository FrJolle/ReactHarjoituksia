import React, { useContext, useState } from 'react';
import CartContext from './CartContext';

const ProductCard = ({ product }) => {
  const { dispatch } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);


  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product });
    showPopupNotification();
  };


  const showPopupNotification = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="product-card" onClick={() => window.location.href = `/product/${product.id}`}>
      <img src={product.cover_image_url} alt={product.title} />
      <h2>{product.artist} : {product.title}</h2>
      <p className="price">{product.price} €</p>

      <button
        className="add-to-cart-btn"
        onClick={(e) => {
          e.stopPropagation();
          addToCart();
        }}
      >
        Ostoskoriin
      </button>


      {showPopup && (
        <div className="popup">
          <p>{product.title} added to cart!</p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
