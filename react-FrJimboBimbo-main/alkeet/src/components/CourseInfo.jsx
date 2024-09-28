import React from 'react';

const CourseInfo = ({ course, teacher, material }) => (
    <div className="demo1">
        <h1>{course}</h1>
        <p>Teacher: {teacher}</p>
        <a href={material}>Linkki materiaaliin</a>
    </div>
);

export default CourseInfo;
