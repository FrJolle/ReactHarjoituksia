import React, { useState } from 'react';

const SkillsList = ({ initialSkills }) => {
    const [skills, setSkills] = useState(initialSkills);
    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                placeholder="Lisää uusi taito"
            />
            <button onClick={handleAddSkill}>Lisää taito</button>
            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    );
};

export default SkillsList;
