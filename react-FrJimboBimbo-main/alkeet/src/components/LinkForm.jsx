// LinkForm.jsx

import React, { useState } from 'react';

const LinkForm = ({ addLink }) => {
    const [formData, setFormData] = useState({
        url: '',
        description: ''
    });

    const handleChange = (e, field) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const linkData = {
            ...formData,
            id: Math.random().toString(36).substr(2, 9),
            likes: 0
        };
        addLink(linkData);
        setFormData({ url: '', description: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={formData.url}
                onChange={e => handleChange(e, 'url')}
                placeholder="Linkki"
                required
            />
            <input
                value={formData.description}
                onChange={e => handleChange(e, 'description')}
                placeholder="Kuvaus"
                required
            />
            <button type="submit">Lisää linkki</button>
        </form>
    );
}

export default LinkForm;
