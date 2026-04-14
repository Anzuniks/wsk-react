import { useState, useEffect } from 'react';
const useMedia = () => {
    const [mediArray, setMediaArray] = useState([]);

    const getMedia = async () => {
        try {
            const response = await fetch('http://users.metropolia.fi/~andersnu/custom-hooks');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            setMediaArray(json);
        } catch (error) {
            console.error('Error fetching media:', error.message);
        }
    };
    
    
    useEffect(() => {
        getMedia();
    }, []);

    return mediArray;
}

export { useMedia };