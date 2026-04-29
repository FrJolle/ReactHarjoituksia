import React from 'react';
import Student from './Student';

const StudentsList = ({ students }) => {
  return (
    <div>
      {students.map(student => (
        <Student key={student.email} student={student} />
      ))}
    </div>
  );
}

export default StudentsList;