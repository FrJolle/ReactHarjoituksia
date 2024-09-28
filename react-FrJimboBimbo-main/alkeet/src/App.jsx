// App.jsx

import React, { useState } from 'react';
import './App.css';
import CourseInfo from './components/CourseInfo';
import CoursesTable from './components/CoursesTable';
import ImagesDisplay from './components/ImagesDisplay';
import StudentsList from './components/StudentsList';
import SkillsList from './components/SkillsList';
import Friends from './Friends'; 
import LinkForm from './components/LinkForm';
import LinkList from './components/LinkList';
import { courses } from './courseData';
import { imagesData } from './ImageData';

const App = () => {
    const studentsData = [
        {
            name: "Susanna Jaakkola",
            age: 24,
            email: "susannajaa@gmail.com"
        },
        {
            name: "Mikko Mallikas",
            age: 22,
            email: "mikkomal@gmail.com"
        },
    ];

    const [showTehtava1, setShowTehtava1] = useState(true);
    const [showTehtava2, setShowTehtava2] = useState(true);
    const [showFriends, setShowFriends] = useState(true);
    const [links, setLinks] = useState([]);

    const addLink = (linkData) => {
        setLinks(prevLinks => [...prevLinks, linkData]);
    }

    const addLike = (id) => {
        setLinks(prevLinks => {
            return prevLinks.map(link => {
                if (link.id === id) {
                    return { ...link, likes: link.likes + 1 };
                }
                return link;
            });
        });
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>React alkeet demoja</h1>
            </header>

            <button onClick={() => setShowTehtava1(prev => !prev)}>
                {showTehtava1 ? 'Piilota Tehtävä 1' : 'Näytä Tehtävä 1'}
            </button>

            {showTehtava1 && (
                <CourseInfo
                    teacher="Tiina Partanen"
                    course="React"
                    material="http://otredu.github.io"
                />
            )}

            <button onClick={() => setShowTehtava2(prev => !prev)}>
                {showTehtava2 ? 'Piilota Tehtävä 2' : 'Näytä Tehtävä 2'}
            </button>

            {showTehtava2 && <CoursesTable courses={courses} />}
            <ImagesDisplay images={imagesData} />

            <h1>Opiskelijoiden tiedot:</h1>
            <StudentsList students={studentsData} />

            <h2>Lisää taitoja:</h2>
            <SkillsList initialSkills={['Taito 1', 'Taito 2']} />

            <button onClick={() => setShowFriends(prev => !prev)}>
                {showFriends ? 'Piilota Ystävät' : 'Näytä Ystävät'}
            </button>

            {showFriends && <Friends />}

            <h2>Lisää Linkki:</h2>
            <LinkForm addLink={addLink} />
            
            <h2>Linkit:</h2>
            <LinkList links={links} addLike={addLike} />
        </div>
    );
}

export default App;
