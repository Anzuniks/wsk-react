import { useEffect, useState } from 'react';

const useMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    useEffect(() => {
        const getMedia = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_MEDIA_API + '/media');
                if (!response.ok) {
                    throw new Error('Verkkovirhe haettaessa mediaa');
                }
                const json = await response.json();
                setMediaArray(Array.isArray(json) ? json : []);
            } catch (error) {
                console.error('Virhe getMedia-funktiossa:', error.message);
                setMediaArray([]);
            }
        };

        getMedia();
    }, []);

    return { mediaArray };
};

const useAuthentication = () => {
    const postLogin = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        };

        const response = await fetch(import.meta.env.VITE_AUTH_API + '/auth/login', fetchOptions);
        if (!response.ok) {
            throw new Error('Kirjautuminen epäonnistui');
        }

        return await response.json();
    };

    return { postLogin };
};

const useUser = () => {
    const getUserByToken = async (token) => {
        const fetchOptions = {
            headers: { Authorization: 'Bearer ' + token },
        };

        const response = await fetch(import.meta.env.VITE_AUTH_API + '/users/token', fetchOptions);
        if (!response.ok) {
            throw new Error('Virheellinen token');
        }

        return await response.json();
    };

    const postUser = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        };

        const response = await fetch(import.meta.env.VITE_AUTH_API + '/users', fetchOptions);
        if (!response.ok) {
            throw new Error('Rekisteröityminen epäonnistui');
        }

        return await response.json();
    };

    return { getUserByToken, postUser };
};

export { useMedia, useAuthentication, useUser };