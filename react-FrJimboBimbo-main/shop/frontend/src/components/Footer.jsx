import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Vinyl Store. All Rights Reserved.</p>
        <p>
          <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
        </p>
        <p>Contact us: <a href="mailto:support@vinylstore.com">support@vinylstore.com</a></p>
      </div>
    </footer>
  );
};

export default Footer;
