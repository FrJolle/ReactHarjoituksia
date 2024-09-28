// LinkList.jsx

import React from 'react';

const LinkList = ({ links, addLike }) => {
    return (
        <div>
            <ul>
                {links.map(link => (
                    <li key={link.id}>
                        <a href={link.url}>{link.description}</a>
                        <button onClick={() => addLike(link.id)}>Tykkää</button> {link.likes}
                    </li>
                ))}
            </ul>
            <p>Total Likes: {links.reduce((acc, link) => acc + link.likes, 0)}</p>
        </div>
    );
}

export default LinkList;
