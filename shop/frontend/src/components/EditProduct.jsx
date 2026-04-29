import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: '',
    artist: '',
    genre: '',
    release_date: '',
    price: '',
    stock_quantity: '',
    description: '',
    cover_image_url: ''
  });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = () => {
    fetch(`http://localhost:3005/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.role !== 'admin') {
      alert('Only admins can edit products');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3005/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.message}`);
        return;
      }

      alert('Product updated successfully!');
      navigate(`/products/${id}`);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  return (
    <div className="edit-product">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Artist</label>
          <input
            type="text"
            name="artist"
            value={product.artist}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            value={product.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Release Date</label>
          <input
            type="date"
            name="release_date"
            value={product.release_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Stock Quantity</label>
          <input
            type="number"
            name="stock_quantity"
            value={product.stock_quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Cover Image URL</label>
          <input
            type="text"
            name="cover_image_url"
            value={product.cover_image_url}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
