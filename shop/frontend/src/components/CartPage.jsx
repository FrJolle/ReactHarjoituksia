import React, { useContext } from 'react';
import CartContext from './CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemove = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const handleCheckout = () => {

    navigate('/checkout');
  };

  const handleQuantityChange = (productId, newQuantity) => {

    dispatch({
      type: 'UPDATE_QUANTITY',
      productId,
      quantity: newQuantity
    });
  };

  if (cart.length === 0) {
    return (
      <div>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.title}</h3>
          <p>Price: {item.price} €</p>
          <label>
            Quantity:
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
            />
          </label>
          <button onClick={() => handleRemove(item.id)}>Remove</button>
        </div>
      ))}


      <div className="cart-total">
        <h3>Total: {calculateTotal()} €</h3>
      </div>


      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear Cart</button>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;
