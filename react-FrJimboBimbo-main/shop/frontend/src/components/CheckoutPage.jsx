import React, { useContext, useState } from 'react';
import CartContext from './CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    name: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
    address: '',
  });

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    alert('Payment Successful!');


    clearCart();
    navigate('/confirmation');
  };

  if (cart.length === 0) {
    return (
      <div>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')}>Go Back to Shop</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Checkout</h2>

      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.price} €</p>
        </div>
      ))}


      <h3>Total: {calculateTotal()} €</h3>


      <form onSubmit={handlePayment}>
        <div>
          <label>Name on Card:</label>
          <input
            type="text"
            name="name"
            value={paymentDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Expiration Date:</label>
          <input
            type="text"
            name="expiration"
            value={paymentDetails.expiration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CVV:</label>
          <input
            type="text"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Shipping Address:</label>
          <textarea
            name="address"
            value={paymentDetails.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Make Payment</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
