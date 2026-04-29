// ImageCard.jsx

import React, { useState } from 'react';

const ImageCard = ({ image }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div>
            <h3 onClick={() => setShowDetails(!showDetails)}>{image.title}</h3>
            {showDetails && (
                <>
                    <img src={image.imageurl} alt={image.title} style={{ maxWidth: '300px' }} />
                    <p>{image.description}</p>
                </>
            )}
        </div>
    );
};

export default ImageCard;
