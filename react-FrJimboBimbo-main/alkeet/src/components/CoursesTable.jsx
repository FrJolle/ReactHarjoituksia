import React from 'react';
import CourseRow from './CourseRow';

const CoursesTable = ({ courses }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Kurssi</th>
          <th>Opettaja</th>
          <th>Luokka</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => <CourseRow key={course.id} course={course} />)}
      </tbody>
    </table>
  );
}

export default CoursesTable;
