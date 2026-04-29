import React from 'react';

const CourseRow = ({ course }) => {
  return (
    <tr>
      <td>{course.name}</td>
      <td>{course.teacher}</td>
      <td>{course.class}</td>
    </tr>
  );
}

export default CourseRow;
