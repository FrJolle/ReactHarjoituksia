import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import CartContext from './CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();


  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = () => {
    fetch(`http://localhost:3005/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  };


  const handleSubmitReview = async () => {
    if (!user) {
      alert('You need to be logged in to leave a review');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3005/products/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ review, author: user.username }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.message}`);
        return;
      }

      setReview('');
      fetchProduct();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };


  const handleRemoveReview = async (reviewId) => {
    if (!user || user.role !== 'admin') return;
    try {
      const response = await fetch(`http://localhost:3005/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.message}`);
        return;
      }

      fetchProduct();
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    }
  };


  const handleAddToCart = () => {
    const productWithQuantity = {
      ...product,
      quantity: Number(quantity),
    };

    dispatch({ type: 'ADD_TO_CART', product: productWithQuantity });
    alert(`${product.title} (Quantity: ${quantity}) added to cart!`);
  };


  const handlePreorder = () => {
    const preorderProduct = {
      ...product,
      quantity: Number(quantity),
      preorder: true,
    };

    dispatch({ type: 'PREORDER', product: preorderProduct });
    alert(`${product.title} (Quantity: ${quantity}) preordered!`);
  };


  const handleDeleteVinyl = async () => {
    if (!user || user.role !== 'admin') return;
    if (window.confirm('Are you sure you want to delete this vinyl?')) {
      try {
        const response = await fetch(`http://localhost:3005/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          const error = await response.json();
          alert(`Error: ${error.message}`);
          return;
        }

        alert('Vinyl deleted successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error deleting vinyl:', error);
        alert('Failed to delete vinyl');
      }
    }
  };

  return (
    <div className="product-detail">
      <h1>{product?.title}</h1>
      <img src={product?.cover_image_url} alt={product?.title} />
      <p>Artist: {product?.artist}</p>
      <p>Genre: {product?.genre}</p>
      <p>Release Date: {product?.release_date}</p>
      <p>Price: ${product?.price}</p>
      <p>Stock: {product?.stock_quantity > 0 ? product?.stock_quantity : "Out of Stock"}</p>
      <p>{product?.description}</p>

      {user && user.role === 'admin' ? (
        <div className="admin-actions">
          <button onClick={() => navigate(`/edit-product/${product?.id}`)}>Edit Vinyl</button>
          <button onClick={handleDeleteVinyl}>Delete Vinyl</button>
        </div>
      ) : (
        <>
          {product?.stock_quantity > 0 ? (
            <div>

              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                max={product?.stock_quantity}
              />
              <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
          ) : (
            <div>

              <label htmlFor="quantity">Preorder Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
              />
              <button onClick={handlePreorder}>Preorder</button>
            </div>
          )}
        </>
      )}

      <div className="reviews">
        <h3>Customer Reviews</h3>
        {product?.reviews && product.reviews.map((review, index) => (
          <div key={index}>
            <p><strong>{review.author}:</strong> {review.text}</p>
            {user && user.role === 'admin' && (
              <button onClick={() => handleRemoveReview(review.id)}>Remove Review</button>
            )}
          </div>
        ))}
        
        {!user && (
          <p>You must be logged in to leave a review.</p>
        )}

        {user && user.role !== 'admin' && (
          <div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write a review"
            />
            <button onClick={handleSubmitReview}>Submit Review</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
