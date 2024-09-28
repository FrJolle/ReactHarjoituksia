import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import Login from './components/Login'; 
import Register from './components/Register';
import { CartProvider } from './components/CartContext'; 
import Header from './components/Header';
import Footer from './components/footer'; 
import ProtectedRoute from './components/ProtectedRoute';
import AddProduct from './components/AddProduct'; 
import { AuthProvider } from './components/AuthContext'; 
import EditProduct from './components/EditProduct';

function App() {
  return (
    <AuthProvider> 
      <CartProvider>
        <Router>
          <Header />
          <div className="main-content"> 
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/register" element={<Register />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route path="/add-product" element={<AddProduct />} />
                      <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/add-product" element={<AddProduct />} />

              <Route
                path="/add-product"
                element={<ProtectedRoute roleRequired="admin"><AddProduct /></ProtectedRoute>}
              />
              <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
