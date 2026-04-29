// LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ submitHandler }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    submitHandler({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Käyttäjänimi: <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        Salasana: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Kirjaudu sisään</button>
    </form>
  );
};

export default LoginForm;
