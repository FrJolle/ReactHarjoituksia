import React from 'react';

const CourseItem = ({ course }) => (
    <div className="demo2">
        <h1>{course.course}</h1>
        <p>Teacher: {course.teacher}</p>
        <a href={course.material}>Linkki materiaaliin</a>
    </div>
);

const Courses = ({ courses }) => (
    <div>
        {courses.map(c => <CourseItem key={c.id} course={c} />)}
    </div>
);

export { CourseItem, Courses };
