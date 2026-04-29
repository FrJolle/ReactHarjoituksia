// ImagesDisplay.jsx

import React, { useState } from 'react';

const Image = ({ data }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div>
            <h3 onClick={() => setShowDetails(!showDetails)}>{data.title}</h3>
            {showDetails && (
                <>
                    <img src={data.imageurl} alt={data.title} style={{ maxWidth: '300px' }} />
                    <p>Pääkaupunki:{data.description} Asukasluku:{data.Asukasluku}</p>
                </>
            )}
        </div>
    );
};

const ImagesDisplay = ({ images }) => {
    return (
        <div>
            {images.map(image => (
                <Image key={image.title} data={image} />
            ))}
        </div>
    );
};

export default ImagesDisplay;
