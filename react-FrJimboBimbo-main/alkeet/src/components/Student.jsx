import React from 'react';

const Student = ({ student }) => {
  return (
    <div>
      <h2>Name: {student.name}</h2>
      <p>Age: {student.age}</p>
      <p>Email: {student.email}</p>
      <img src="https://via.placeholder.com/150" alt="Opiskelijan kuva" />
    </div>
  );
}

export default Student;